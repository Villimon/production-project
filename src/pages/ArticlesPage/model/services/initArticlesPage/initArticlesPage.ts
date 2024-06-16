import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlePageInited } from '../../selectors/articlePageSelectors';
import { articlePageActions } from '../../slice/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('articlePage/initArticlesPage', async (_, { getState, dispatch }) => {
    const inited = getArticlePageInited(getState());
    if (!inited) {
        dispatch(articlePageActions.initState());
        dispatch(
            fetchArticlesList({
                page: 1,
            }),
        );
    }
});
