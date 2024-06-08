import { Comment } from 'entitites/Comment';
import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text } from 'shared/ui/Text/Text';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
    className?: string;
    comment: Comment;
    isLoading?: boolean;
}
export const CommentCard: FC<CommentCardProps> = memo(
    ({ className, comment, isLoading }) => {
        if (isLoading) {
            return (
                <div className={classNames(cls.CommentCard, {}, [className])}>
                    <div className={cls.header}>
                        <Skeleton width={30} height={30} border="50%" />

                        <Skeleton
                            className={cls.username}
                            height={16}
                            width={100}
                        />
                    </div>
                    <Skeleton className={cls.text} height={50} width="100%" />
                </div>
            );
        }

        return (
            <div className={classNames(cls.CommentCard, {}, [className])}>
                <div className={cls.header}>
                    {comment.user.avatar ? (
                        <Avatar size={30} src={comment.user.avatar} />
                    ) : null}
                    <Text
                        className={cls.username}
                        title={comment.user.username}
                    />
                </div>
                <Text className={cls.text} text={comment.text} />
            </div>
        );
    },
);
