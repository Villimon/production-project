import { FC, HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/consts';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}
export const ArticleList: FC<ArticleListProps> = memo(
    ({
        className, articles, isLoading, target, view = ArticleView.SMALL,
    }) => {
        const { t } = useTranslation('article');
        const renderArticle = (article: Article) => (
            <ArticleListItem
                target={target}
                className={cls.card}
                article={article}
                view={view}
                key={article.id}
            />
        );

        if (!isLoading && !articles.length) {
            return (
                <div
                    className={classNames(cls.ArticleList, {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <Text size={TextSize.L} text={t('Статьи не найдены')} />
                </div>
            );
        }

        return (
            <section
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
            </section>
        );
    },
);
