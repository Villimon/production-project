import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Comment } from '@/entitites/Comment';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { CommentCard } from '../CommentCard/CommentCard';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface CommentListProps {
    className?: string
    comments?: Comment[]
    isLoading?: boolean
}
export const CommentList: FC<CommentListProps> = memo(
    ({ className, comments, isLoading }) => {
        const { t } = useTranslation();

        if (isLoading) {
            return (
                <VStack
                    gap="16"
                    max
                    className={classNames('', {}, [className])}
                >
                    <CommentCard isLoading />
                    <CommentCard isLoading />
                    <CommentCard isLoading />
                </VStack>
            );
        }

        return (
            <VStack gap="16" max className={classNames('', {}, [className])}>
                {comments?.length ? (
                    comments.map((comment) => (
                        <CommentCard
                            key={comment.id}
                            isLoading={isLoading}
                            comment={comment}
                        />
                    ))
                ) : (
                    <ToggleFeatures
                        name="isAppRedesigned"
                        on={<Text text={t('Комментарии отсутствуют')} />}
                        off={(
                            <TextDeprecated
                                text={t('Комментарии отсутствуют')}
                            />
                        )}
                    />
                )}
            </VStack>
        );
    },
);
