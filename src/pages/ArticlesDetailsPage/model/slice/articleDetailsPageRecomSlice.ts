import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article } from '@/entitites/Article';
import { fetchArticleRecommendation } from '../services/fetchArticleRecommendation/fetchArticleRecommendation';
import { ArticleDetailsPageRecomSchema } from '../types/ArticleDetailsPageRecomSchema';

const recomAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

// Селектор с помощью которого мы получаем комментарии
export const getArticleRecom = recomAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.recommendations
        || recomAdapter.getInitialState(),
);

const articleDetailsPageRecomSlice = createSlice({
    name: 'articleDetailsPageRecom',
    initialState: recomAdapter.getInitialState<ArticleDetailsPageRecomSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommendation.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleRecommendation.fulfilled, (state, action) => {
                state.isLoading = false;
                // Чтобы залить данные в стейт
                recomAdapter.setAll(state, action.payload);
            })
            .addCase(fetchArticleRecommendation.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: articleDetailsPageRecomReducer } = articleDetailsPageRecomSlice;
