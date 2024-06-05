import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from 'entitites/Article/model/selectors/getArticleDetailsData/getArticleDetailsData';
import { fetchArticleById } from 'entitites/Article/model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from 'entitites/Article/model/slice/articleDetailsSlice';
import { FC, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Loader } from 'shared/ui/Loader/Loader';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import cls from './ArticleDetails.module.scss';

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

        useEffect(() => {
            dispatch(fetchArticleById(id));
        }, [dispatch, id]);

        let content;

        if (isLoading) {
            content = (
                <div>
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
                </div>
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
            <div>ArticleDetails</div>;
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
    }
);
