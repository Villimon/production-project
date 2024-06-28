// Выход на верхний уровень вложенности

const path = require('path');

module.exports = (...segments) =>
    path.resolve(__dirname, '..', '..', ...segments);
