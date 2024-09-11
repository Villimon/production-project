import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleSortField, ArticleType } from '@/entitites/Article';
import { SortOrder } from '@/shared/types';
import cls from './ArticlesFilters.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ArticlesFiltersProps {
    className?: string
    sort: ArticleSortField
    order: SortOrder
    type: ArticleType
    search: string
    onChangeSearch: (value: string) => void
    onChangeOrder: (newOrder: SortOrder) => void
    onChangeSort: (newSort: ArticleSortField) => void
    onChangeType: (type: ArticleType) => void
}

export const ArticlesFilters: FC<ArticlesFiltersProps> = memo(
    ({
        className,
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
        onChangeType,
        order,
        search,
        sort,
        type,
    }) => {
        const { t } = useTranslation('article');

        return (
            <Card
                padding="24"
                className={classNames(cls.ArticlesFilters, {}, [className])}
            >
                <VStack gap="32">
                    <Input
                        value={search}
                        onChange={onChangeSearch}
                        placeholder={t('Поиск')}
                        addonLeft={<Icon Svg={SearchIcon} />}
                    />
                    <ArticleTypeTabs value={type} onChangeType={onChangeType} />
                    <ArticleSortSelector
                        order={order}
                        sort={sort}
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                    />
                </VStack>
            </Card>
        );
    },
);
