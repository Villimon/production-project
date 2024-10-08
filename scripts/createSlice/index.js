const createTemplate = require('./templates/createTemplate')

// Аргументы берутся из вводимой строки
// pages, features
const layer = process.argv[2]
const sliceName = process.argv[3]

// entitites не создает
const layers = ['features', 'entitites', 'pages', 'widgets']

if (!layer || !layers.includes(layer)) {
    throw new Error(`Укажите слой ${layers.join(' или ')}`)
}

if (!sliceName) {
    throw new Error('Укажите название слайса')
}

createTemplate(layer, sliceName)
