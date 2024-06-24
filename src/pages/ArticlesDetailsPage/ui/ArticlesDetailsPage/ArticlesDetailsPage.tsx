import { ArticleDetails, ArticleList } from 'entitites/Article';
import { CommentList } from 'entitites/Comment';
import { AddCommentForm } from 'features/addCommentForm';
import {
    FC, memo, useCallback, useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { VStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { getArticlePageRecomIsLoading } from '../../model/selectors/recommendations';
import { addCommentFormArticle } from '../../model/services/addCommentFormArticle/addCommentFormArticle';
import { fetchArticleRecommendation } from '../../model/services/fetchArticleRecommendation/fetchArticleRecommendation';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsPageReducer } from '../../model/slice';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { getArticleRecom } from '../../model/slice/articleDetailsPageRecomSlice';
import { ArticlesDetailsPageHeader } from '../ArticlesDetailsPageHeader/ArticlesDetailsPageHeader';
import cls from './ArticlesDetailsPage.module.scss';

interface ArticlesDetailsPageProps {
    className?: string;
}

const reducer: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticlesDetailsPage: FC<ArticlesDetailsPageProps> = memo(
    ({ className }) => {
        const { id } = useParams<{ id: string }>();
        const { t } = useTranslation('article');
        const dispatch = useAppDispatch();
        // Чтобы получить массив комментариев
        const comments = useSelector(getArticleComments.selectAll);
        const recommendations = useSelector(getArticleRecom.selectAll);
        const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
        const recommendationsIsLoading = useSelector(
            getArticlePageRecomIsLoading,
        );

        useEffect(() => {
            if (__PROJECT__ !== 'storybook') {
                dispatch(fetchCommentsByArticleId(id));
                dispatch(fetchArticleRecommendation());
            }
        }, [dispatch, id]);

        const onSendComment = useCallback(
            (text: string) => {
                dispatch(addCommentFormArticle(text));
            },
            [dispatch],
        );

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
                        <Text
                            className={cls.commentTitle}
                            title={t('Рукомендуем')}
                        />
                        <ArticleList
                            articles={recommendations}
                            isLoading={recommendationsIsLoading}
                            className={cls.recommendations}
                            target="_blank"
                        />
                        <Text
                            className={cls.commentTitle}
                            title={t('Комментарии')}
                        />
                        <AddCommentForm onSendComment={onSendComment} />
                        <CommentList
                            isLoading={commentsIsLoading}
                            comments={comments}
                        />
                    </VStack>
                </Page>
            </DynamicModuleLoader>
        );
    },
);

export default ArticlesDetailsPage;
