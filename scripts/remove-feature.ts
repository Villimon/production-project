// astexplorer.net

import {
    JsxAttribute, Node, Project, SyntaxKind,
} from 'ts-morph';

const project = new Project({});

const removeFeatureName = process.argv[2]; // isArticleEnable
const featureState = process.argv[3]; // off/on

const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

if (!removeFeatureName) {
    throw new Error('Укажите название фичи-флага');
}

if (!featureState) {
    throw new Error('Укажите состояние фичи (on/off)');
}

if (featureState !== 'on' && featureState !== 'off') {
    throw new Error('Некорректное значение состояние фичи (on/off)');
}

// Файлы с исходным кодом с которыми мы будем работать
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// Получаем все файлы
const files = project.getSourceFiles();

function isToggleFunction(node: Node) {
    let isToggleFeatures = false;

    // Перебираем у этих функций их детей
    node.forEachChild((child) => {
        // Находим Identifier с названием нашей функции
        if (
            child.isKind(SyntaxKind.Identifier)
            && child.getText() === toggleFunctionName
        ) {
            isToggleFeatures = true;
        }
    });
    return isToggleFeatures;
}

function isToggleComponent(node: Node) {
    // Сами компоненты <Counter/>
    const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

    return identifier?.getText() === toggleComponentName;
}

const replaceToggleFunction = (node: Node) => {
    // Наш объект что мы передаем: name, on, off
    const objectOptions = node.getFirstDescendantByKind(
        SyntaxKind.ObjectLiteralExpression,
    );

    if (!objectOptions) return;

    // Получаем ключ:значение по ключу
    const onFunctionProperty = objectOptions.getProperty('on'); // on: () => <Counter />
    const offFunctionProperty = objectOptions.getProperty('off');
    const featureNameProperty = objectOptions.getProperty('name');

    // Значения
    const onFunction = onFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
    ); // () => <Counter />
    const offFunction = offFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
    );
    const featureName = featureNameProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1);

    if (featureName !== removeFeatureName) return;

    if (featureState === 'on') {
        // Оставляем только значение функции
        node.replaceWithText(onFunction?.getBody().getText() || ''); // <Counter />

        /*
        Было: const counter = toggleFeatures({
            name: 'isArticleCounterEnable',
            on: () => <>asdasd</>,
            off: () => <Counter />,
        })

        Cтало: const counter = <Counter />
        */
    }

    if (featureState === 'off') {
        node.replaceWithText(offFunction?.getBody().getText() || '');
    }
};

const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string) => jsxAttributes.find((node) => node.getName() === name);

const getReplaceComponent = (attribute?: JsxAttribute) => {
    const value = attribute
        ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
        ?.getExpression()
        ?.getText();

    if (value?.startsWith('(')) {
        return value.slice(1, -1);
    }
    return value;
};

const replaceComponent = (node: Node) => {
    const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

    const onAttribute = getAttributeNodeByName(attributes, 'on');
    const offAttribute = getAttributeNodeByName(attributes, 'off');

    const featureAttributeName = getAttributeNodeByName(attributes, 'name');
    const featureName = featureAttributeName
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1);

    if (featureName !== removeFeatureName) return;

    // Компоненты что лежат в пропсах в on и off
    const offValue = getReplaceComponent(offAttribute);
    const onValue = getReplaceComponent(onAttribute);

    if (featureState === 'on' && onValue) {
        node.replaceWithText(onValue);
    }

    if (featureState === 'off' && offValue) {
        node.replaceWithText(offValue);
    }
};

files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        // Находим все функции
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            return replaceToggleFunction(node);
        }

        // Для JSX Elements
        if (
            node.isKind(SyntaxKind.JsxSelfClosingElement)
            && isToggleComponent(node)
        ) {
            return replaceComponent(node);
        }
    });
});

project.save();
