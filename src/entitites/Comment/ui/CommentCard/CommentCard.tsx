import { FC, memo } from 'react';
import { Comment } from '@/entitites/Comment';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/constants/router';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';

interface CommentCardProps {
    className?: string
    comment?: Comment
    isLoading?: boolean
}
export const CommentCard: FC<CommentCardProps> = memo(
    ({ className, comment, isLoading }) => {
        const Skeleton = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => SkeletonRedesigned,
            off: () => SkeletonDeprecated,
        });

        if (isLoading) {
            return (
                <VStack
                    gap="8"
                    max
                    className={classNames(
                        toggleFeatures({
                            name: 'isAppRedesigned',
                            on: () => cls.CommentCardRedesigned,
                            off: () => cls.CommentCard,
                        }),
                        {},
                        [className],
                    )}
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
            <ToggleFeatures
                name="isAppRedesigned"
                on={(
                    <Card fullWidth padding="24" border="partial">
                        <VStack
                            data-testid="CommentCard.Content"
                            gap="8"
                            max
                            className={classNames(
                                cls.CommentCardRedesigned,
                                {},
                                [className],
                            )}
                        >
                            <AppLink to={getRouteProfile(comment.user.id)}>
                                <HStack max gap="8">
                                    {comment.user.avatar ? (
                                        <Avatar
                                            size={30}
                                            src={comment.user.avatar}
                                        />
                                    ) : null}
                                    <Text bold text={comment.user.username} />
                                </HStack>
                            </AppLink>
                            <Text className={cls.text} text={comment.text} />
                        </VStack>
                    </Card>
                )}
                off={(
                    <VStack
                        data-testid="CommentCard.Content"
                        gap="8"
                        max
                        className={classNames(cls.CommentCard, {}, [className])}
                    >
                        <AppLink
                            to={getRouteProfile(comment.user.id)}
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
                )}
            />
        );
    },
);
