import { FC, memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface FilterContainerProps {
    className?: string
}
export const FilterContainer: FC<FilterContainerProps> = memo(
    ({ className }) => {
        const {
            onChangeOrder,
            onChangeSearch,
            onChangeSort,
            onChangeType,
            order,
            search,
            sort,
            type,
        } = useArticleFilters();

        return (
            <ArticlesFilters
                onChangeOrder={onChangeOrder}
                onChangeSearch={onChangeSearch}
                onChangeSort={onChangeSort}
                onChangeType={onChangeType}
                order={order}
                search={search}
                sort={sort}
                type={type}
                className={className}
            />
        );
    },
);
