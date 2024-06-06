import { ArticleDetails } from 'entitites/Article';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';

interface ArticlesDetailsPageProps {
    className?: string;
}

const ArticlesDetailsPage: FC<ArticlesDetailsPageProps> = memo(
    ({ className }) => {
        const { id } = useParams<{ id: string }>();
        const { t } = useTranslation('article');

        if (!id) {
            return (
                <div className={classNames('', {}, [className])}>
                    {t('Статья не найдена')}
                </div>
            );
        }

        return (
            <div className={classNames('', {}, [className])}>
                <ArticleDetails id={id} />
            </div>
        );
    },
);

export default ArticlesDetailsPage;
