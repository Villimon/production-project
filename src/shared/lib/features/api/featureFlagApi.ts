import { rtkApi } from '@/shared/api/rtkApi';
import { FeatureFlags } from '@/shared/types/featureFlags';

interface UpdateFeatureFlag {
    userId: string
    features: Partial<FeatureFlags>
}

const featureFlagApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        updateFeatureFlag: build.mutation<void, UpdateFeatureFlag>({
            query: ({ userId, features }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    features,
                },
            }),
        }),
    }),
});

// Если ходим использовать без хуков
export const updateFeatureFlagsMutation = featureFlagApi.endpoints.updateFeatureFlag.initiate;
