import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { ArticleView } from '../../model/consts/consts';
import cls from './ArticleListItem.module.scss';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';

interface ArticleListItemProps {
    className?: string
    view: ArticleView
}
export const ArticleListItemSkeleton: FC<ArticleListItemProps> = memo(
    ({ className, view }) => {
        const mainClass = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.ArticleListItemRedesigned,
            off: () => cls.ArticleListItem,
        });

        const Skeleton = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => SkeletonRedesigned,
            off: () => SkeletonDeprecated,
        });

        const Card = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => CardRedesigned,
            off: () => CardDeprecated,
        });

        if (view === ArticleView.BIG) {
            const cardContent = (
                <>
                    <div className={cls.header}>
                        <Skeleton height={30} width={30} border="50%" />
                        <Skeleton
                            className={cls.username}
                            width={150}
                            height={16}
                        />
                        <Skeleton
                            width={150}
                            height={16}
                            className={cls.date}
                        />
                    </div>
                    <Skeleton width={250} height={24} className={cls.title} />
                    <Skeleton height={200} className={cls.img} />
                    <div className={cls.footer}>
                        <Skeleton width={200} height={36} />
                    </div>
                </>
            );

            return (
                <ToggleFeatures
                    name="isAppRedesigned"
                    on={(
                        <CardRedesigned border="round" className={cls.card}>
                            {cardContent}
                        </CardRedesigned>
                    )}
                    off={(
                        <CardDeprecated className={cls.card}>
                            {cardContent}
                        </CardDeprecated>
                    )}
                />
            );
        }

        const cardContent = (
            <>
                <ToggleFeatures
                    name="isAppRedesigned"
                    on={(
                        <Skeleton
                            className={cls.img}
                            width="100%"
                            height={150}
                            border="32px"
                        />
                    )}
                    off={(
                        <div className={cls.imageWrapper}>
                            <Skeleton
                                className={cls.img}
                                width={200}
                                height={200}
                            />
                        </div>
                    )}
                />
                <div className={cls.infoWrapper}>
                    <Skeleton width={130} height={16} />
                </div>
                <Skeleton width={150} height={16} className={cls.infoWrapper} />
            </>
        );

        return (
            <div className={classNames(mainClass, {}, [className, cls[view]])}>
                <ToggleFeatures
                    name="isAppRedesigned"
                    on={(
                        <CardRedesigned border="round" className={cls.card}>
                            {cardContent}
                        </CardRedesigned>
                    )}
                    off={(
                        <CardDeprecated className={cls.card}>
                            {cardContent}
                        </CardDeprecated>
                    )}
                />
            </div>
        );
    },
);
