import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from '@/entitites/Article';
import { getUserData } from '@/entitites/User';

export const getCanEditArticle = createSelector(
    getArticleDetailsData,
    getUserData,
    (article, user) => {
        if (!article || !user) {
            return false;
        }

        return article.user.id === user.id;
    },
);
