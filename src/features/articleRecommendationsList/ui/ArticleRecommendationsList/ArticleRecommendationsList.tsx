import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleList } from '@/entitites/Article';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

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
            <ToggleFeatures
                name="isAppRedesigned"
                on={<Text title={t('Рекомендуем')} />}
                off={<TextDeprecated title={t('Рекомендуем')} />}
            />

            <ArticleList articles={articles} target="_blank" />
        </VStack>
    );
});
