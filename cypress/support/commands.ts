import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';
import * as articlesCommands from './commands/articles';
import * as commentsCommands from './commands/comments';
import * as ratingCommands from './commands/rating';

Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articlesCommands);
Cypress.Commands.addAll(commentsCommands);
Cypress.Commands.addAll(ratingCommands);

Cypress.Commands.overwrite('intercept', () => {
    // мод, которым мы можем управлять на разныз стадиях, для удобства тестирования
    // const FIXTURE_MODE = procces.env.FIXTURE_MODE
    // if(FIXTURE_MODE === 'READ'){
    // в таком случае мы новые фикстуры не записываем, а только считываем из файлов
    // Делается это для того, чтобы на каком-нибудь пуше, проходила быстрая проверка тестов и мы не напргали сервер
    // }
    // if (FIXTURE_MODE === 'WRITE') {
    // Создаем имя фикстуры как-нибудь и передаем ее в функцию по ее созданию
    // Функцию создаст в папке файл .json
    // createFixture(fixtureName)
    // А здесь, когда будет создаваться релизная ветка(например), будет прогоняться уже на реальных данных, с запросом на сервер
    // }
});

export {};
