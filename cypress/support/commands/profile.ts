export const resetProfile = (profileId: string) => {
    return cy.request({
        method: 'PUT',
        url: `http://localhost:8000/profile/${profileId}`,
        headers: { Authorization: 'qwe' },
        body: {
            id: '4',
            first: 'test',
            lastname: 'user',
            age: 465,
            currency: 'RUB',
            country: 'Russia',
            city: 'Moscow',
            username: 'testuser',
            avatar: 'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
        },
    });
};

export const updateProfile = (first: string, lastname: string) => {
    cy.getByTestId('ProfilePageHeader.EditButton').click();
    cy.getByTestId('ProfileCard.first').clear().type(first);
    cy.getByTestId('ProfileCard.lastname').clear().type(lastname);
    cy.getByTestId('ProfilePageHeader.SaveButton').click();
};

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(first: string, lastname: string): Chainable<void>;
            resetProfile(profileId: string): Chainable<void>;
        }
    }
}
