const firstCharUpperCase = require('../firstCharUpperCase');

module.exports = (componentName) => {
    return `.${firstCharUpperCase(componentName)} {
        
    }`;
};
