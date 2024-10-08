import {
    FC, memo, useCallback, useEffect,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlePageReducer } from '../../model/slice/articlePageSlice';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import cls from './ArticlesPage.module.scss';
import { useArticleItemById } from '../../model/selectors/articlePageSelectors';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { ToggleFeatures } from '@/shared/lib/features';
import { SticyContentLayout } from '@/shared/layouts/SticyContentLayout';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FilterContainer } from '../FilterContainer/FilterContainer';

const reducer: ReducersList = {
    articlePage: articlePageReducer,
};

interface ArticlesPageProps {
    className?: string
}

// На странице не должно быть никаких селекторов, запросов, все это должно выноситься в фичи
// Но так как мы изначально начали делать тут и весь стейт у нас тут, то мы будем делать внутри это директории
const ArticlesPage: FC<ArticlesPageProps> = memo(({ className }) => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const articleItem = useArticleItemById('2');

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(initArticlesPage(searchParams));
        }
    }, [dispatch, searchParams]);

    const content = (
        <ToggleFeatures
            name="isAppRedesigned"
            on={(
                <SticyContentLayout
                    content={(
                        <Page
                            data-testid="ArticlesPage"
                            onScrollEnd={onLoadNextPart}
                            className={classNames('', {}, [className])}
                        >
                            <ArticleInfiniteList />
                            <ArticlePageGreeting />
                        </Page>
                    )}
                    left={<ViewSelectorContainer />}
                    right={<FilterContainer />}
                />
            )}
            off={(
                <Page
                    data-testid="ArticlesPage"
                    onScrollEnd={onLoadNextPart}
                    className={classNames('', {}, [className])}
                >
                    <ArticlesPageFilters />
                    <ArticleInfiniteList className={cls.list} />
                    <ArticlePageGreeting />
                </Page>
            )}
        />
    );

    return (
        <DynamicModuleLoader reducers={reducer} removeAfterUnmount={false}>
            {content}
        </DynamicModuleLoader>
    );
});

export default ArticlesPage;
