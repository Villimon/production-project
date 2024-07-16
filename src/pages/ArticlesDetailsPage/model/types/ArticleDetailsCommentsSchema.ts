import { EntityState } from '@reduxjs/toolkit';
import { Comment } from '@/entitites/Comment';

// Чтобы работала нормализация наследуемся от EntityState
export interface ArticleDetailsCommentsSchema extends EntityState<Comment> {
    error?: string;
    isLoading?: boolean;
    data?: Comment[];
}
