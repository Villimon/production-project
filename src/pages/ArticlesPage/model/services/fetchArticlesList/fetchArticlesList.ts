import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entitites/Article';

export const fetchArticlesList = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>('articlePage/fetchArticlesList', async (_, { extra, rejectWithValue }) => {
    try {
        const response = await extra.api.get<Article[]>('/articles', {
            params: {
                // Чтобы получать полный объект user по его id
                _expand: 'user',
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
});
