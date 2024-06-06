import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from 'entitites/Article/model/selectors/getArticleDetailsData/getArticleDetailsData';
import { fetchArticleById } from 'entitites/Article/model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from 'entitites/Article/model/slice/articleDetailsSlice';
import {
    FC, memo, useCallback, useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import {
    ArticleBlock,
    ArticleBlockType,
} from 'entitites/Article/model/types/article';
import cls from './ArticleDetails.module.scss';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails: FC<ArticleDetailsProps> = memo(
    ({ className, id }) => {
        const { t } = useTranslation();
        const dispatch = useAppDispatch();
        const isLoading = useSelector(getArticleDetailsIsLoading);
        const article = useSelector(getArticleDetailsData);
        const error = useSelector(getArticleDetailsError);

        const renderBlock = useCallback((block: ArticleBlock) => {
            switch (block.type) {
            case ArticleBlockType.CODE:
                return (
                    <ArticleCodeBlockComponent
                        key={block.id}
                        block={block}
                        className={cls.block}
                    />
                );
            case ArticleBlockType.IMAGE:
                return (
                    <ArticleImageBlockComponent
                        key={block.id}
                        block={block}
                        className={cls.block}
                    />
                );
            case ArticleBlockType.TEXT:
                return (
                    <ArticleTextBlockComponent
                        key={block.id}
                        block={block}
                        className={cls.block}
                    />
                );

            default:
                return null;
            }
        }, []);

        useEffect(() => {
            if (__PROJECT__ !== 'storybook') {
                dispatch(fetchArticleById(id));
            }
        }, [dispatch, id]);

        let content;

        if (isLoading) {
            content = (
                // eslint-disable-next-line
                <>
                    <Skeleton
                        className={cls.avatar}
                        height={200}
                        width={200}
                        border="50%"
                    />
                    <Skeleton className={cls.title} height={32} width={300} />
                    <Skeleton
                        className={cls.skeleton}
                        height={24}
                        width={600}
                    />
                    <Skeleton
                        className={cls.skeleton}
                        height={200}
                        width="100%"
                    />
                    <Skeleton
                        className={cls.skeleton}
                        height={200}
                        width="100%"
                    />
                </>
            );
        } else if (error) {
            content = (
                <Text
                    aligh={TextAlign.CENTER}
                    text={t('Произошла ошибка при загрузки статьи')}
                    theme={TextTheme.ERROR}
                />
            );
        } else {
            content = (
                // eslint-disable-next-line
                <>
                    <div className={cls.avatarWrapper}>
                        <Avatar
                            size={200}
                            src={article?.img}
                            className={cls.avatar}
                        />
                    </div>
                    <Text
                        size={TextSize.L}
                        className={cls.title}
                        title={article?.title}
                        text={article?.subtitle}
                    />
                    <div className={cls.articleInfo}>
                        <Icon Svg={EyeIcon} className={cls.icon} />
                        <Text text={String(article?.views)} />
                    </div>
                    <div className={cls.articleInfo}>
                        <Icon Svg={CalendarIcon} className={cls.icon} />
                        <Text text={article?.createdAt} />
                    </div>
                    {article?.blocks.map(renderBlock)}
                </>
            );
        }

        return (
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
                <div
                    className={classNames(cls.ArticleDetails, {}, [className])}
                >
                    {content}
                </div>
            </DynamicModuleLoader>
        );
    },
);
