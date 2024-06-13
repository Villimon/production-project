import { Article, ArticleView } from 'entitites/Article';
import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
}
export const ArticleList: FC<ArticleListProps> = memo(
    ({
        className, articles, isLoading, view = ArticleView.SMALL,
    }) => {
        const renderArticle = (article: Article) => (
            <ArticleListItem
                className={cls.card}
                article={article}
                view={view}
                key={article.id}
            />
        );

        return (
            <div
                className={classNames(cls.ArticleList, {}, [
                    className,
                    cls[view],
                ])}
            >
                {articles.length > 0 ? articles.map(renderArticle) : null}
                {isLoading && (
                    <>
                        {new Array(view === ArticleView.BIG ? 3 : 9)
                            .fill(0)
                            .map((item, index) => (
                                <ArticleListItemSkeleton
                                    className={cls.card}
                                    view={view}
                                    key={index}
                                />
                            ))}
                    </>
                )}
            </div>
        );
    },
);
