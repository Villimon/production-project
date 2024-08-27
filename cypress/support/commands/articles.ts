import { Article } from '@/entitites/Article';

const defaultArticle = {
    title: 'Javascript news СВЕЖАЯ',
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    views: 1022,
    createdAt: '26.04.2022',
    userId: '1',
    type: ['IT'],
    blocks: [],
};

export const createArticle = (article?: Article) => cy
    .request({
        method: 'POST',
        url: 'http://localhost:8000/articles',
        headers: { Authorization: 'qwe' },
        body: article ?? defaultArticle,
    })
    .then((resp) => resp.body);

export const deleteArticle = (articleId: string) => cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
    headers: { Authorization: 'qwe' },
});

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: Article): Chainable<Article>;
            deleteArticle(articleId: string): Chainable<void>;
        }
    }
}
