// astexplorer.net

import { Node, Project, SyntaxKind } from 'ts-morph';

const project = new Project({});

const removeFeatureName = process.argv[2]; // isArticleEnable
const featureState = process.argv[3]; // off/on

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
            && child.getText() === 'toggleFeatures'
        ) {
            isToggleFeatures = true;
        }
    });
    return isToggleFeatures;
}

files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        // Находим все функции
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
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
        }
    });
});

project.save();
