import { ArticleDetails } from 'entitites/Article';
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
import { Text } from 'shared/ui/Text/Text';
import { getArticleCommentsIsLoading } from '../model/selectors/comments';
import { addCommentFormArticle } from '../model/services/addCommentFormArticle/addCommentFormArticle';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
    articleDetailsCommentsReducer,
    getArticleComments,
} from '../model/slice/articleDetailsCommentsSlice';
import cls from './ArticlesDetailsPage.module.scss';

interface ArticlesDetailsPageProps {
    className?: string;
}

const reducer: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticlesDetailsPage: FC<ArticlesDetailsPageProps> = memo(
    ({ className }) => {
        const { id } = useParams<{ id: string }>();
        const { t } = useTranslation('article');
        const dispatch = useAppDispatch();
        // Чтобы получить массив комментариев
        const comments = useSelector(getArticleComments.selectAll);
        const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

        useEffect(() => {
            if (__PROJECT__ !== 'storybook') {
                dispatch(fetchCommentsByArticleId(id));
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
                <div className={classNames('', {}, [className])}>
                    {t('Статья не найдена')}
                </div>
            );
        }

        return (
            <DynamicModuleLoader reducers={reducer} removeAfterUnmount>
                <div className={classNames('', {}, [className])}>
                    <ArticleDetails id={id} />
                    <Text
                        className={cls.commentTitle}
                        title={t('Комментарии')}
                    />
                    <AddCommentForm onSendComment={onSendComment} />
                    <CommentList
                        isLoading={commentsIsLoading}
                        comments={comments}
                    />
                </div>
            </DynamicModuleLoader>
        );
    },
);

export default ArticlesDetailsPage;
