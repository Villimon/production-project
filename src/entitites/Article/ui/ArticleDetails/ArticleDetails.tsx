import {
    FC, memo, useCallback, useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton';
import {
    Text, TextAlign, TextSize, TextTheme,
} from '@/shared/ui/Text';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import cls from './ArticleDetails.module.scss';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleBlockType } from '../../model/consts/consts';
import {
    getArticleDetailsIsLoading,
    getArticleDetailsError,
    getArticleDetailsData,
} from '../../model/selectors/getArticleDetailsData/getArticleDetailsData';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleBlock } from '../../model/types/article';

interface ArticleDetailsProps {
    className?: string
    id?: string
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
                    <HStack justify="center" max>
                        <Avatar
                            size={200}
                            src={article?.img}
                            className={cls.avatar}
                        />
                    </HStack>
                    <VStack gap="4" max>
                        <Text
                            size={TextSize.L}
                            className={cls.title}
                            title={article?.title}
                            text={article?.subtitle}
                        />
                        <HStack gap="8">
                            <Icon Svg={EyeIcon} className={cls.icon} />
                            <Text text={String(article?.views)} />
                        </HStack>
                        <HStack gap="8">
                            <Icon Svg={CalendarIcon} className={cls.icon} />
                            <Text text={article?.createdAt} />
                        </HStack>
                    </VStack>

                    {article?.blocks.map(renderBlock)}
                </>
            );
        }

        return (
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
                <VStack
                    gap="16"
                    max
                    className={classNames(cls.ArticleDetails, {}, [className])}
                >
                    {content}
                </VStack>
            </DynamicModuleLoader>
        );
    },
);
