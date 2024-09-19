import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entitites/Article';
import { Card } from '@/shared/ui/redesigned/Card';

interface DetailsContainerProps {
    className?: string
}
// Обертка для ArticlesDetails чтобы компонент был чище
export const DetailsContainer: FC<DetailsContainerProps> = memo(
    ({ className }) => {
        const { id } = useParams<{ id: string }>();

        return (
            <Card fullWidth border="round" className={className} padding="24">
                <ArticleDetails id={id} />
            </Card>
        );
    },
);
