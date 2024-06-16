import { Comment } from 'entitites/Comment';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentList.module.scss';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}
export const CommentList: FC<CommentListProps> = memo(
    ({ className, comments, isLoading }) => {
        const { t } = useTranslation();

        if (isLoading) {
            return (
                <div className={classNames(cls.CommentList, {}, [className])}>
                    <CommentCard isLoading />
                    <CommentCard isLoading />
                    <CommentCard isLoading />
                </div>
            );
        }

        return (
            <div className={classNames(cls.CommentList, {}, [className])}>
                {comments?.length ? (
                    comments.map((comment) => (
                        <CommentCard
                            key={comment.id}
                            isLoading={isLoading}
                            className={cls.comment}
                            comment={comment}
                        />
                    ))
                ) : (
                    <Text text={t('Комментарии отсутствуют')} />
                )}
            </div>
        );
    },
);
