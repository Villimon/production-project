import { rtkApi } from '@/shared/api/rtkApi';
import { Rating } from '@/entitites/RatingCard';

interface GetProfileRating {
    userId: string
    profileId: string
}

interface RateProfile extends GetProfileRating {
    rate: number
    feedback?: string
}

// Если страница подгружается асинхронно, то тогда это не попадает в общий бандл
const profileRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProfileRating: build.query<Rating[], GetProfileRating>({
            query: ({ profileId, userId }) => ({
                url: '/profile-ratings',
                params: {
                    profileId,
                    userId,
                },
            }),
        }),
        rateProfile: build.mutation<void, RateProfile>({
            query: (arg) => ({
                url: '/profile-ratings',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
});

export const useGetProfileRating = profileRatingApi.useGetProfileRatingQuery;
export const useRateProfile = profileRatingApi.useRateProfileMutation;
