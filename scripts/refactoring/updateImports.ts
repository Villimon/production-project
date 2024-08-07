// astexplorer.net

import { Project } from 'ts-morph';

const project = new Project({});

// Файлы с исходным кодом с которыми мы будем работать
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// Получаем все файлы
const files = project.getSourceFiles();

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

        if (isAbsolute(value)) {
            // Меняем значение
            importDeclaration.setModuleSpecifier(`@/${value}`);
        }
    });
});

project.save();
