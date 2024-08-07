import { Project } from 'ts-morph';
import path from 'path';

const project = new Project({});

// Файлы с исходным кодом с которыми мы будем работать
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// Получаем все файлы
const files = project.getSourceFiles();
// Путь до папки
const sharedUiDirectory = project.getDirectory(
    path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui'),
);
// Все наши папки с shared ui
const componentsDirs = sharedUiDirectory?.getDirectories();

componentsDirs?.forEach((directory) => {
    // Путь до index.ts
    const indexFilePath = `${directory.getPath()}/index.ts`;
    // Проверка есть ли такой файл
    const indexFile = directory.getSourceFile(indexFilePath);

    if (!indexFile) {
        const sourceCode = `export * from './${directory.getBaseName()}';`;
        const file = directory.createSourceFile(indexFilePath, sourceCode);

        file.save();
    }
});

function isAbsolute(value: string) {
    const layers = [
        'app',
        'entitites',
        'features',
        'pages',
        'shared',
        'widgets',
    ];
    return layers.some((layer) => value.startsWith(layer));
}

files.forEach((sourceFile) => {
    // Нода испортов с ast дерева
    const importDeclarations = sourceFile.getImportDeclarations();
    importDeclarations.forEach((importDeclaration) => {
        // Наши пути импортов, то от куда идет импорт
        const value = importDeclaration.getModuleSpecifierValue();
        const valueWithoutAlias = value.replace('@/', '');

        const segment = valueWithoutAlias.split('/');
        const isSharedLayer = segment[0] === 'shared';
        const isUiSlice = segment[1] === 'ui';

        if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
            const result = valueWithoutAlias.split('/').slice(0, 3).join('/');
            // Меняем значение
            importDeclaration.setModuleSpecifier(`@/${result}`);
        }
    });
});

project.save();
