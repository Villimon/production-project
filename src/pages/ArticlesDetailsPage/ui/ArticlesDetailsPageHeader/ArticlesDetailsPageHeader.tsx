import { getArticleDetailsData } from 'entitites/Article';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { getCanEditArticle } from '../../model/selectors/article';
import cls from './ArticlesDetailsPageHeader.module.scss';

interface ArticlesDetailsPageHeaderProps {
    className?: string;
}
export const ArticlesDetailsPageHeader: FC<ArticlesDetailsPageHeaderProps> = memo(({ className }) => {
    const { t } = useTranslation('article');
    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackToList = () => {
        navigate(RoutePath.articles);
    };

    const onEditArticle = () => {
        navigate(`${RoutePath.articles_details}${article?.id}/edit`);
    };
    return (
        <div
            className={classNames(cls.ArticlesDetailsPageHeader, {}, [
                className,
            ])}
        >
            <Button onClick={onBackToList}>{t('Назад к списку')}</Button>
            {canEdit && (
                <Button className={cls.editBtn} onClick={onEditArticle}>
                    {t('Редактировать')}
                </Button>
            )}
        </div>
    );
});
