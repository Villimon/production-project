import {
    ArticleSortField,
    ArticleSortSelector,
    ArticleView,
} from 'entitites/Article';
import { ArticleType } from 'entitites/Article/model/types/article';
import { ArticleTypeTabs } from 'entitites/Article/ui/ArticleTypeTabs/ArticleTypeTabs';
import {
    FC, memo, useCallback, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from 'shared/types';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { ArticleViewSelector } from 'widgets/ArticleViewSelector';
import { articlePageActions } from '../../model/slice/articlePageSlice';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import {
    getArticlePageOrder,
    getArticlePageSearch,
    getArticlePageSort,
    getArticlePageType,
    getArticlePageView,
} from '../../model/selectors/articlePageSelectors';
import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
    className?: string;
}
export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = memo(
    ({ className }) => {
        const { t } = useTranslation('article');
        const view = useSelector(getArticlePageView);
        const sort = useSelector(getArticlePageSort);
        const order = useSelector(getArticlePageOrder);
        const search = useSelector(getArticlePageSearch);
        const type = useSelector(getArticlePageType);
        const dispatch = useAppDispatch();

        const fetchData = useCallback(() => {
            dispatch(fetchArticlesList({ replace: true }));
        }, [dispatch]);

        const debouncedfetchData = useDebounce(fetchData, 500);

        const onChangeView = useCallback(
            (view: ArticleView) => {
                dispatch(articlePageActions.setView(view));
            },
            [dispatch],
        );

        const onChangeOrder = useCallback(
            (order: SortOrder) => {
                dispatch(articlePageActions.setOrder(order));
                dispatch(articlePageActions.setPage(1));
                debouncedfetchData();
            },
            [dispatch, debouncedfetchData],
        );

        const onChangeType = useCallback(
            (value: ArticleType) => {
                dispatch(articlePageActions.setType(value));
                dispatch(articlePageActions.setPage(1));
                fetchData();
            },
            [dispatch, fetchData],
        );

        const onChangeSort = useCallback(
            (sort: ArticleSortField) => {
                dispatch(articlePageActions.setSort(sort));
                dispatch(articlePageActions.setPage(1));
                debouncedfetchData();
            },
            [dispatch, debouncedfetchData],
        );

        const onChangeSearch = useCallback(
            (search: string) => {
                dispatch(articlePageActions.setSearch(search));
                dispatch(articlePageActions.setPage(1));
                debouncedfetchData();
            },
            [dispatch, debouncedfetchData],
        );

        return (
            <div
                className={classNames(cls.ArticlesPageFilters, {}, [className])}
            >
                <div className={cls.sortWrapper}>
                    <ArticleSortSelector
                        order={order}
                        sort={sort}
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                    />
                    <ArticleViewSelector
                        view={view}
                        onViewClick={onChangeView}
                    />
                </div>
                <Card className={cls.search}>
                    <Input
                        value={search}
                        onChange={onChangeSearch}
                        placeholder={t('Поиск')}
                    />
                </Card>
                <ArticleTypeTabs
                    className={cls.tabs}
                    value={type}
                    onChangeType={onChangeType}
                />
            </div>
        );
    },
);
