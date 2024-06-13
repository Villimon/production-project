import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entitites/Article';

export interface ArticlePageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;
    view: ArticleView;
    page: number;
    limit?: number;
    hasMore: boolean;
}
