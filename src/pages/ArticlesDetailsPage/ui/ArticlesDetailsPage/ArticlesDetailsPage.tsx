import { ArticleDetails } from 'entitites/Article';
import { ArticleRecommendationsList } from 'features/articleRecommendationsList';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from 'shared/ui/Stack';
import { Page } from 'widgets/Page';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticlesDetailsPageHeader } from '../ArticlesDetailsPageHeader/ArticlesDetailsPageHeader';

interface ArticlesDetailsPageProps {
    className?: string;
}

const reducer: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

// Страница должна состоять из фичей
const ArticlesDetailsPage: FC<ArticlesDetailsPageProps> = memo(
    ({ className }) => {
        const { id } = useParams<{ id: string }>();
        const { t } = useTranslation('article');

        if (!id) {
            return (
                <Page className={classNames('', {}, [className])}>
                    {t('Статья не найдена')}
                </Page>
            );
        }

        return (
            <DynamicModuleLoader reducers={reducer} removeAfterUnmount>
                <Page className={classNames('', {}, [className])}>
                    <VStack gap="16" max>
                        <ArticlesDetailsPageHeader />
                        <ArticleDetails id={id} />
                        <ArticleRecommendationsList />
                        <ArticleDetailsComments id={id} />
                    </VStack>
                </Page>
            </DynamicModuleLoader>
        );
    },
);

export default ArticlesDetailsPage;
