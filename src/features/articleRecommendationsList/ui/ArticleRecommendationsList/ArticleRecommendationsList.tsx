import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleList } from '@/entitites/Article';
import { Text } from '@/shared/ui/deprecated/Text';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface ArticleRecommendationsListProps {
    className?: string
}

export const ArticleRecommendationsList: FC<ArticleRecommendationsListProps> = memo(({ className }) => {
    const { t } = useTranslation('article');
    const { data: articles, isLoading } = useArticleRecommendationsList(3);

    if (isLoading || !articles) {
        // Добавить скелетон
        return null;
    }

    return (
        <VStack
            data-testid="ArticleRecommendationsList"
            gap="8"
            className={classNames('', {}, [className])}
        >
            <Text title={t('Рукомендуем')} />
            <ArticleList articles={articles} target="_blank" />
        </VStack>
    );
});
