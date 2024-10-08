import {
    FC, memo, Suspense, useCallback, useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AddCommentForm } from '@/features/addCommentForm';
import { CommentList } from '@/entitites/Comment';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { addCommentFormArticle } from '../../model/services/addCommentFormArticle/addCommentFormArticle';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleDetailsCommentsProps {
    className?: string
    id?: string
}
export const ArticleDetailsComments: FC<ArticleDetailsCommentsProps> = memo(
    ({ className, id }) => {
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

        return (
            <VStack max gap="16" className={classNames('', {}, [className])}>
                <ToggleFeatures
                    name="isAppRedesigned"
                    on={<Text title={t('Комментарии')} />}
                    off={<TextDeprecated title={t('Комментарии')} />}
                />

                <Suspense fallback={<Loader />}>
                    <AddCommentForm onSendComment={onSendComment} />
                </Suspense>
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </VStack>
        );
    },
);
