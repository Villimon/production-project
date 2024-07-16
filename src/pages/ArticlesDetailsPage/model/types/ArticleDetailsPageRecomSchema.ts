import { EntityState } from '@reduxjs/toolkit';
import { Article } from '@/entitites/Article';

// Чтобы работала нормализация наследуемся от EntityState
export interface ArticleDetailsPageRecomSchema extends EntityState<Article> {
    error?: string;
    isLoading?: boolean;
}
