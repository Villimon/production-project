let profileId = '';

describe('Пользователь заходит на страницу пользователя', () => {
    beforeEach(() => {
        cy.login().then((data) => {
            cy.visit(`profile/${data.id}`);
            profileId = data.id;
        });
    });

    afterEach(() => {
        // Чтобы перед каждым тестои возвращаться обратно к исходному профилю
        cy.resetProfile(profileId);
    });

    it('И профиль успешно загружается', () => {
        cy.getByTestId('ProfileCard.first').should('have.value', 'test');
    });

    it('И редактирует его', () => {
        const newName = 'new';
        const newLastname = 'lastname';
        cy.updateProfile(newName, newLastname);
        cy.getByTestId('ProfileCard.first').should('have.value', newName);
        cy.getByTestId('ProfileCard.lastname').should(
            'have.value',
            newLastname
        );
    });
});
