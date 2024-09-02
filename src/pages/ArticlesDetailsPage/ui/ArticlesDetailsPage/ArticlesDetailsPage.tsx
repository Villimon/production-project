import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetails } from '@/entitites/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticlesDetailsPageHeader } from '../ArticlesDetailsPageHeader/ArticlesDetailsPageHeader';
import { ArticleRating } from '@/features/articleRating';
import { getFeatureFlag } from '@/shared/lib/features';
import { Counter } from '@/entitites/Counter';

interface ArticlesDetailsPageProps {
    className?: string
}

const reducer: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

// Страница должна состоять из фичей
const ArticlesDetailsPage: FC<ArticlesDetailsPageProps> = memo(
    ({ className }) => {
        const { id } = useParams<{ id: string }>();
        const isArticleRatingEnable = getFeatureFlag('isArticleRatingEnable');
        const isArticleCounterEnable = getFeatureFlag('isArticleCounterEnable');

        if (!id) {
            return null;
        }

        return (
            <DynamicModuleLoader reducers={reducer} removeAfterUnmount>
                <Page className={classNames('', {}, [className])}>
                    <VStack gap="16" max>
                        <ArticlesDetailsPageHeader />
                        <ArticleDetails id={id} />
                        {isArticleCounterEnable && <Counter />}
                        {isArticleRatingEnable && (
                            <ArticleRating articleId={id} />
                        )}
                        <ArticleRecommendationsList />
                        <ArticleDetailsComments id={id} />
                    </VStack>
                </Page>
            </DynamicModuleLoader>
        );
    },
);

export default ArticlesDetailsPage;
