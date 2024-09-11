import { FC, memo } from 'react';
import { ArticleViewSelector } from '@/widgets/ArticleViewSelector';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ViewSelectorContainerProps {
    className?: string
}
export const ViewSelectorContainer: FC<ViewSelectorContainerProps> = memo(
    ({ className }) => {
        const { onChangeView, view } = useArticleFilters();

        return (
            <ArticleViewSelector
                className={className}
                view={view}
                onViewClick={onChangeView}
            />
        );
    },
);
