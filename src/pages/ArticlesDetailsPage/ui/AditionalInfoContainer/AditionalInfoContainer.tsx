import { FC, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AditionalInfoContainer.module.scss';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { Card } from '@/shared/ui/redesigned/Card';
import { getArticleDetailsData } from '@/entitites/Article';
import { getRouteArticlesEdit } from '@/shared/constants/router';

interface AditionalInfoContainerProps {
    className?: string
}
export const AditionalInfoContainer: FC<AditionalInfoContainerProps> = memo(
    ({ className }) => {
        const article = useSelector(getArticleDetailsData);
        const navigate = useNavigate();

        const onEditArticle = useCallback(() => {
            navigate(getRouteArticlesEdit(article?.id || ''));
        }, [navigate, article]);

        if (!article) {
            return null;
        }

        return (
            <Card
                padding="24"
                border="round"
                className={classNames(cls.AditionalInfoContainer, {}, [
                    className,
                ])}
            >
                <ArticleAdditionalInfo
                    author={article.user}
                    createdAt={article.createdAt}
                    views={article.views}
                    onEdit={onEditArticle}
                />
            </Card>
        );
    },
);
