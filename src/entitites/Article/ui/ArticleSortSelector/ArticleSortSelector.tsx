import { ArticleSortField } from 'entitites/Article/model/types/article';
import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { SortOrder } from 'shared/types';
import { Select, SelectOptions } from 'shared/ui/Select/Select';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}
export const ArticleSortSelector: FC<ArticleSortSelectorProps> = memo(
    ({
        className, onChangeOrder, onChangeSort, order, sort,
    }) => {
        const { t } = useTranslation('article');

        const orderOptions = useMemo<SelectOptions<SortOrder>[]>(
            () => [
                {
                    value: 'asc',
                    content: t('возрастанию'),
                },
                {
                    value: 'desc',
                    content: t('убыванию'),
                },
            ],
            [t],
        );

        const sortFieldOptions = useMemo<SelectOptions<ArticleSortField>[]>(
            () => [
                {
                    value: ArticleSortField.CREATED,
                    content: t('дате создания'),
                },
                {
                    value: ArticleSortField.TITLE,
                    content: t('названию'),
                },
                {
                    value: ArticleSortField.VIEWS,
                    content: t('просмотрам'),
                },
            ],
            [t],
        );

        return (
            <section
                className={classNames(cls.ArticleSortSelector, {}, [className])}
            >
                <Select
                    options={sortFieldOptions}
                    label={t('Сортировать ПО')}
                    value={sort}
                    onChange={onChangeSort}
                />
                <Select
                    className={cls.order}
                    options={orderOptions}
                    label={t('по')}
                    value={order}
                    onChange={onChangeOrder}
                />
            </section>
        );
    },
);
