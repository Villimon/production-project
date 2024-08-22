import { selectByTestId } from 'cypress/helpers/selectByTestId';

describe('Роутинг', () => {
    describe('Пользователь НЕ авторизован', () => {
        it('Переход на главную страницу', () => {
            cy.visit('/');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Переход с страницы профиля на главную', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Переход на несоществующий маршрут', () => {
            cy.visit('/sadasd');
            cy.get(selectByTestId('NotFoundPage')).should('exist');
        });
    });

    describe('Пользователь авторизован', () => {
        beforeEach(() => {
            cy.login();
        });

        it('Переход с страницы профиля на главную', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('ProfilePage')).should('exist');
        });
        it('Переход на страницу со списком статей', () => {
            cy.visit('/articles');
            cy.get(selectByTestId('ArticlesPage')).should('exist');
        });
    });
});
