import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleSortField } from '@/entitites/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types';
import { Select, SelectOptions } from '@/shared/ui/deprecated/Select';
import cls from './ArticleSortSelector.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleSortSelectorProps {
    className?: string
    sort: ArticleSortField
    order: SortOrder
    onChangeOrder: (newOrder: SortOrder) => void
    onChangeSort: (newSort: ArticleSortField) => void
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
            <ToggleFeatures
                name="isAppRedesigned"
                on={(
                    <section
                        className={classNames(cls.ArticleSortSelector, {}, [
                            className,
                        ])}
                    >
                        <VStack gap="8">
                            <Text text={t('Сортировать по:')} />
                            <ListBox
                                items={sortFieldOptions}
                                value={sort}
                                onChange={onChangeSort}
                            />
                            <ListBox
                                items={orderOptions}
                                value={order}
                                onChange={onChangeOrder}
                            />
                        </VStack>
                    </section>
                )}
                off={(
                    <section
                        className={classNames(cls.ArticleSortSelector, {}, [
                            className,
                        ])}
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
                )}
            />
        );
    },
);
