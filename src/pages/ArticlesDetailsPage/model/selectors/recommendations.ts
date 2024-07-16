import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlePageRecomIsLoading = (state: StateSchema) => state.articleDetailsPage?.recommendations?.isLoading;
export const getArticlePageRecomError = (state: StateSchema) => state.articleDetailsPage?.recommendations?.error;
