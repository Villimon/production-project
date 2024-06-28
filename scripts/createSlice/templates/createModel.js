// Создание папки model и ее структуры

const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const reduxSliceTemplate = require('./reduxSliceTimplate');
const schemaTypeTemplate = require('./schemaTypeTemplate');

module.exports = async (layer, sliceName) => {
    // путь до папки model
    const resolveModelPath = (...segments) =>
        resolveRoot('src', layer, sliceName, 'model', ...segments);

    const createModelStructure = async () => {
        try {
            await fs.mkdir(resolveModelPath());
            await fs.mkdir(resolveModelPath('types'));
            await fs.mkdir(resolveModelPath('slices'));
            await fs.mkdir(resolveModelPath('services'));
            await fs.mkdir(resolveModelPath('selectors'));
        } catch (error) {
            console.log(`Не удалось создать model сегмент для ${sliceName}`);
        }
    };

    const createReduxSlice = async () => {
        try {
            await fs.writeFile(
                resolveModelPath('slices', `${sliceName}Slice.ts`),
                reduxSliceTemplate(sliceName)
            );
        } catch (e) {
            console.log('Не удалось создать редакс слайс', e);
        }
    };

    const createSchemaType = async () => {
        try {
            await fs.writeFile(
                resolveModelPath('types', `${sliceName}Schema.ts`),
                schemaTypeTemplate(sliceName)
            );
        } catch (error) {
            console.log('Не удалось создать тип схемы стейта');
        }
    };

    await createModelStructure();
    await createReduxSlice();
    await createSchemaType();
};
