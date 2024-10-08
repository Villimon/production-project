import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getArticleDetailsData } from '@/entitites/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/deprecated/Button';
import { getCanEditArticle } from '../../model/selectors/article';
import {
    getRouteArticles,
    getRouteArticlesEdit,
} from '@/shared/constants/router';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticlesDetailsPageHeaderProps {
    className?: string
}
export const ArticlesDetailsPageHeader: FC<ArticlesDetailsPageHeaderProps> = memo(({ className }) => {
    const { t } = useTranslation('article');
    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackToList = () => {
        navigate(getRouteArticles());
    };

    const onEditArticle = () => {
        navigate(getRouteArticlesEdit(article?.id || ''));
    };
    return (
        <HStack
            justify="between"
            max
            className={classNames('', {}, [className])}
        >
            <Button onClick={onBackToList}>{t('Назад к списку')}</Button>
            {canEdit && (
                <Button onClick={onEditArticle}>
                    {t('Редактировать')}
                </Button>
            )}
        </HStack>
    );
});
