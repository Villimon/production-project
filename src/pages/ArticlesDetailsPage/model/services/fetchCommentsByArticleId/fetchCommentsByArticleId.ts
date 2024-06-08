import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entitites/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
>(
    'articleDetailsComments/fetchCommentsByArticleId',
    async (articleId, { extra, rejectWithValue }) => {
        try {
            if (!articleId) {
                throw rejectWithValue('error');
            }

            const response = await extra.api.get<Comment[]>('/comments', {
                params: {
                    // id статьи по которой хотим получить комменты
                    articleId,
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
    },
);
