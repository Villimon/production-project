import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetails } from '@/entitites/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticlesDetailsPageHeader } from '../ArticlesDetailsPageHeader/ArticlesDetailsPageHeader';
import { ArticleRating } from '@/features/articleRating';
import {
    ToggleFeatures,
    getFeatureFlag,
    toggleFeatures,
} from '@/shared/lib/features';
import { Counter } from '@/entitites/Counter';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { SticyContentLayout } from '@/shared/layouts/SticyContentLayout';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AditionalInfoContainer } from '../AditionalInfoContainer/AditionalInfoContainer';

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

        const articleRatingCard = toggleFeatures({
            name: 'isArticleRatingEnable',
            on: () => console.log('Новая функция'),
            off: () => console.log('Старая функция'),
        });

        return (
            <DynamicModuleLoader reducers={reducer} removeAfterUnmount>
                <ToggleFeatures
                    name="isAppRedesigned"
                    on={(
                        <SticyContentLayout
                            content={(
                                <Page
                                    className={classNames('', {}, [className])}
                                >
                                    <VStack gap="16" max>
                                        <DetailsContainer />
                                        <ArticleRating articleId={id} />
                                        <ArticleRecommendationsList />
                                        <ArticleDetailsComments id={id} />
                                    </VStack>
                                </Page>
                            )}
                            right={<AditionalInfoContainer />}
                        />
                    )}
                    off={(
                        <Page className={classNames('', {}, [className])}>
                            <VStack gap="16" max>
                                <ArticlesDetailsPageHeader />
                                <ArticleDetails id={id} />
                                <ToggleFeatures
                                    name="isArticleRatingEnable"
                                    on={<ArticleRating articleId={id} />}
                                    off={<Counter />}
                                />
                                {isArticleRatingEnable && (
                                    <ArticleRating articleId={id} />
                                )}
                                <ArticleRecommendationsList />
                                <ArticleDetailsComments id={id} />
                            </VStack>
                        </Page>
                    )}
                />
            </DynamicModuleLoader>
        );
    },
);

export default ArticlesDetailsPage;
