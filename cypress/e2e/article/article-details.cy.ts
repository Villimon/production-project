let articleCurrentId = '';

describe('Пользователь заходит на страницу статьи', () => {
    beforeEach(() => {
        cy.login();
        cy.createArticle().then((article) => {
            articleCurrentId = article.id;
            cy.visit(`articles/${article.id}`);
        });
    });

    afterEach(() => {
        cy.deleteArticle(articleCurrentId);
    });

    it('И видит содержимое статьи', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
    });

    it('И видит список рекомендаций', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist');
    });

    it('И оставляет комментарий', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
        cy.getByTestId('AddCommentForm').scrollIntoView();
        cy.addComment('text');
        cy.getByTestId('CommentCard.Content').should('have.length', 1);
    });

    it('И ставит оценку', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(5, 'feedback');
        cy.get('[data-selected=true').should('have.length', 5);
    });

    it('И ставит оценку (пример на моках)', () => {
        // Замокали запрос, чтобы не делать настоящий, данные получим с данного файла
        cy.intercept('GET', '**/articles/*', {
            fixture: 'article-details.json',
        });
        cy.getByTestId('ArticleDetails.Info').should('exist');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(5, 'feedback');
        cy.get('[data-selected=true').should('have.length', 5);
    });
});
