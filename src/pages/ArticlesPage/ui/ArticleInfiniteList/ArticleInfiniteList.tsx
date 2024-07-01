import { ArticleList } from 'entitites/Article';
import {
    getArticlePageError,
    getArticlePageIsLoading,
    getArticlePageView,
} from '../../model/selectors/articlePageSelectors';
import { getArticle } from '../../model/slice/articlePageSlice';
import { FC, memo } from 'react';
import { useSelector } from 'react-redux';

interface ArticleInfiniteListProps {
    className?: string;
}
export const ArticleInfiniteList: FC<ArticleInfiniteListProps> = memo(
    ({ className }) => {
        const articles = useSelector(getArticle.selectAll);
        const isLoading = useSelector(getArticlePageIsLoading);
        const error = useSelector(getArticlePageError);
        const view = useSelector(getArticlePageView);

        return (
            <ArticleList
                isLoading={isLoading}
                view={view}
                articles={articles}
                className={className}
            />
        );
    },
);
