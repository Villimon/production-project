const path = require('path')
const fs = require('fs')

const dir = path.resolve(__dirname, '..', 'node_modules/.cache')

fs.rm(dir, { recursive: true, force: true }, (err) => {
    if (err) {
        throw err
    }
    console.log(`${dir} is deleted!`)
})
