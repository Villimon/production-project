import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import cls from './ArticleListItemRedesigned.module.scss';
import { getRouteArticlesDetails } from '@/shared/constants/router';
import { AppImage } from '@/shared/ui/redesigned/AppImage/AppImage';
import { ArticleTextBlock } from '../../../model/types/article';
import { ArticleView, ArticleBlockType } from '../../../model/consts/consts';
import { ArticleListItemProps } from '../ArticleListItem';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

export const ArticleListItemRedesigned: FC<ArticleListItemProps> = memo(
    ({
        className, article, view, target,
    }) => {
        const { t } = useTranslation();

        const userInfo = (
            <>
                <Avatar size={32} src={article.user.avatar} />
                <Text bold text={article.user.username} />
            </>
        );

        const views = (
            <HStack gap="8">
                <Icon Svg={EyeIcon} />
                <Text text={String(article.views)} className={cls.views} />
            </HStack>
        );

        if (view === ArticleView.BIG) {
            const textBlock = article.blocks.find(
                (i) => i.type === ArticleBlockType.TEXT,
            ) as ArticleTextBlock;

            return (
                <Card
                    padding="24"
                    fullWidth
                    data-testid="ArticleListItem"
                    className={classNames(cls.ArticleListItem, {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <VStack max gap="16">
                        <HStack gap="8" max>
                            {userInfo}
                            <Text text={article.createdAt} />
                        </HStack>
                        <Text title={article.title} bold />
                        <Text title={article.subtitle} size="s" />
                        <AppImage
                            fallback={<Skeleton width="100%" height={250} />}
                            src={article.img}
                            alt={article.title}
                            className={cls.img}
                        />
                        {textBlock?.paragraphs && (
                            <Text
                                className={cls.textBlock}
                                text={textBlock.paragraphs.slice(0.2).join(' ')}
                            />
                            // TODO надобность компонента ?
                            // <ArticleTextBlockComponent
                            // className={cls.textBlock}
                            // block={textBlock}
                            // />
                        )}
                        <HStack max justify="between">
                            <AppLink
                                target={target}
                                to={getRouteArticlesDetails(article.id)}
                            >
                                <Button>{t('Читать далее')}</Button>
                            </AppLink>
                            {views}
                        </HStack>
                    </VStack>
                </Card>
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
                <Card border="round" className={cls.card}>
                    <AppImage
                        fallback={<Skeleton width={200} height={200} />}
                        src={article.img}
                        className={cls.img}
                        alt={article.title}
                    />
                    <VStack className={cls.infoWrapper} gap="4">
                        <Text text={article.title} className={cls.title} />
                        <VStack gap="4" max className={cls.footer}>
                            <HStack justify="between" max>
                                <Text
                                    text={article.createdAt}
                                    className={cls.date}
                                />
                                {views}
                            </HStack>
                            <HStack gap="4">{userInfo}</HStack>
                        </VStack>
                    </VStack>
                </Card>
            </AppLink>
        );
    },
);
