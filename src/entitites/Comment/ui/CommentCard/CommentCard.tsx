import { Comment } from 'entitites/Comment';
import { FC, memo } from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { VStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}
export const CommentCard: FC<CommentCardProps> = memo(
    ({ className, comment, isLoading }) => {
        if (isLoading) {
            return (
                <VStack
                    gap="8"
                    max
                    className={classNames(cls.CommentCard, {}, [className])}
                >
                    <div className={cls.header}>
                        <Skeleton width={30} height={30} border="50%" />

                        <Skeleton
                            className={cls.username}
                            height={16}
                            width={100}
                        />
                    </div>
                    <Skeleton className={cls.text} height={50} width="100%" />
                </VStack>
            );
        }

        if (!comment) {
            return null;
        }

        return (
            <VStack
                gap="8"
                max
                className={classNames(cls.CommentCard, {}, [className])}
            >
                <AppLink
                    to={`${RoutePath.profile}${comment.user.id}`}
                    className={cls.header}
                >
                    {comment.user.avatar ? (
                        <Avatar size={30} src={comment.user.avatar} />
                    ) : null}
                    <Text
                        className={cls.username}
                        title={comment.user.username}
                    />
                </AppLink>
                <Text className={cls.text} text={comment.text} />
            </VStack>
        );
    },
);
