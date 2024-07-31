import { rtkApi } from '@/shared/api/rtkApi';
import { Rating } from '@/entitites/RatingCard';

interface GetArticleRating {
    userId: string
    articleId: string
}

interface RateArticle extends GetArticleRating {
    rate: number
    feedback?: string
}

// Если страница подгружается асинхронно, то тогда это не попадает в общий бандл
const artickeRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<Rating[], GetArticleRating>({
            query: ({ articleId, userId }) => ({
                url: '/article-ratings',
                params: {
                    articleId,
                    userId,
                },
            }),
        }),
        rateArticle: build.mutation<void, RateArticle>({
            query: (arg) => ({
                url: '/article-ratings',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
});

export const useGetArticleRating = artickeRatingApi.useGetArticleRatingQuery;
export const useRateArticle = artickeRatingApi.useRateArticleMutation;
