import { Article } from 'entitites/Article';
import { rtkApi } from 'shared/api/rtkApi';

// Если страница подгружается асинхронно, то тогда это не попадает в общий бандл
const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query<Article[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
});

export const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;
