import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entitites/Article';

export const fetchArticleRecommendation = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>(
    'articleDetailsPageRecom/fetchArticleRecommendation',
    async (args, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _limit: 4,
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('error');
        }
    },
);
