import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/deprecated/Text';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { Card } from '@/shared/ui/deprecated/Card';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button } from '@/shared/ui/deprecated/Button';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import cls from './ArticleListItemDeprecated.module.scss';
import { getRouteArticlesDetails } from '@/shared/constants/router';
import { AppImage } from '@/shared/ui/redesigned/AppImage/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { ArticleListItemProps } from '../ArticleListItem';
import { ArticleView, ArticleBlockType } from '../../../model/consts/consts';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleTextBlock } from '../../../model/types/article';

export const ArticleListItemDeprecated: FC<ArticleListItemProps> = memo(
    ({
        className, article, view, target,
    }) => {
        const { t } = useTranslation();

        const types = (
            <Text text={article.type.join(', ')} className={cls.types} />
        );

        const views = (
            <>
                <Text text={String(article.views)} className={cls.views} />
                <Icon Svg={EyeIcon} />
            </>
        );

        if (view === ArticleView.BIG) {
            const textBlock = article.blocks.find(
                (i) => i.type === ArticleBlockType.TEXT,
            ) as ArticleTextBlock;

            return (
                <article
                    data-testid="ArticleListItem"
                    className={classNames(cls.ArticleListItem, {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <Card className={cls.card}>
                        <div className={cls.header}>
                            <Avatar size={30} src={article.user.avatar} />
                            <Text
                                text={article.user.username}
                                className={cls.username}
                            />
                            <Text
                                text={article.createdAt}
                                className={cls.date}
                            />
                        </div>
                        <Text title={article.title} className={cls.title} />
                        {types}
                        <AppImage
                            fallback={<Skeleton width="100%" height={250} />}
                            src={article.img}
                            alt={article.title}
                            className={cls.img}
                        />
                        {textBlock && (
                            <ArticleTextBlockComponent
                                className={cls.textBlock}
                                block={textBlock}
                            />
                        )}
                        <div className={cls.footer}>
                            <AppLink
                                target={target}
                                to={getRouteArticlesDetails(article.id)}
                            >
                                <Button>{t('Читать далее')}</Button>
                            </AppLink>

                            {views}
                        </div>
                    </Card>
                </article>
            );
        }

        return (
            <AppLink
                data-testid="ArticleListItem"
                target={target}
                to={getRouteArticlesDetails(article.id)}
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Card className={cls.card}>
                    <div className={cls.imageWrapper}>
                        <AppImage
                            fallback={<Skeleton width={200} height={200} />}
                            src={article.img}
                            className={cls.img}
                            alt={article.title}
                        />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <div className={cls.infoWrapper}>
                        {types}
                        {views}
                    </div>
                    <Text text={article.title} className={cls.title} />
                </Card>
            </AppLink>
        );
    },
);
