import { Article, ArticleView } from 'entitites/Article';
import { FC, HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import {
    ArticleBlockType,
    ArticleTextBlock,
} from 'entitites/Article/model/types/article';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}
export const ArticleListItem: FC<ArticleListItemProps> = memo(
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
                <div
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
                        <img
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
                                to={RoutePath.articles_details + article.id}
                            >
                                <Button>{t('Читать далее')}</Button>
                            </AppLink>

                            {views}
                        </div>
                    </Card>
                </div>
            );
        }

        return (
            <AppLink
                target={target}
                to={RoutePath.articles_details + article.id}
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Card className={cls.card}>
                    <div className={cls.imageWrapper}>
                        <img
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
