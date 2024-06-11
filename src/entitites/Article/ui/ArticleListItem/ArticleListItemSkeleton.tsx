import { ArticleView } from 'entitites/Article';
import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
    className?: string;
    view: ArticleView;
}
export const ArticleListItemSkeleton: FC<ArticleListItemProps> = memo(
    ({ className, view }) => {
        if (view === ArticleView.BIG) {
            return (
                <div
                    className={classNames(cls.ArticleListItem, {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <Card className={cls.card}>
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

                        <Skeleton
                            width={250}
                            height={24}
                            className={cls.title}
                        />

                        <Skeleton height={200} className={cls.img} />

                        <div className={cls.footer}>
                            <Skeleton width={200} height={36} />
                        </div>
                    </Card>
                </div>
            );
        }

        return (
            <div
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Card className={cls.card}>
                    <div className={cls.imageWrapper}>
                        <Skeleton
                            className={cls.img}
                            width={200}
                            height={200}
                        />
                    </div>
                    <div className={cls.infoWrapper}>
                        <Skeleton width={130} height={16} />
                    </div>
                    <Skeleton
                        width={150}
                        height={16}
                        className={cls.infoWrapper}
                    />
                </Card>
            </div>
        );
    }
);
