import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entitites/RatingCard';
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi';
import { getUserData } from '@/entitites/User';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

export interface ArticleRatingProps {
    className?: string
    articleId: string
}

const ArticleRating: FC<ArticleRatingProps> = memo(
    ({ className, articleId }) => {
        const { t } = useTranslation('article');
        const userData = useSelector(getUserData);
        const { data, isLoading } = useGetArticleRating({
            articleId,
            userId: userData?.id || '',
        });

        const [rateArticleMutation] = useRateArticle();

        const rating = data?.[0];

        const handleRateArticle = useCallback(
            (star: number, feedback?: string) => {
                try {
                    rateArticleMutation({
                        userId: userData?.id ?? '',
                        articleId,
                        rate: star,
                        feedback,
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            [userData?.id, articleId, rateArticleMutation],
        );

        const onCancle = useCallback(
            (star: number) => {
                handleRateArticle(star);
            },
            [handleRateArticle],
        );

        const onAccept = useCallback(
            (star: number, feedback?: string) => {
                handleRateArticle(star, feedback);
            },
            [handleRateArticle],
        );

        if (isLoading) {
            return <Skeleton width="100%" height={120} />;
        }
        return (
            <RatingCard
                onAccept={onAccept}
                onCancle={onCancle}
                rate={rating?.rate}
                className={className}
                feedbackTitle={t('Оставьте свой отзыв о статье')}
                title={t('Оцените статью')}
                hasFeedback
            />
        );
    },
);

export default ArticleRating;
