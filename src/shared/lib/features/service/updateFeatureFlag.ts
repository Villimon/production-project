import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { updateFeatureFlagsMutation } from '../api/featureFlagApi';
import { getFeatureFlags } from '../lib/setGetFeatures';

interface UpdateFeatureFlag {
    userId: string
    newFeatures: Partial<FeatureFlags>
}

export const updateFeatureFlag = createAsyncThunk<
    void,
    UpdateFeatureFlag,
    ThunkConfig<string>
>('', async ({ userId, newFeatures }, { rejectWithValue, dispatch }) => {
    try {
        await dispatch(
            updateFeatureFlagsMutation({
                userId,
                features: {
                    ...getFeatureFlags(),
                    ...newFeatures,
                },
            }),
        );

        window.location.reload();
        return undefined;
    } catch (error) {
        console.log(error);
        return rejectWithValue('');
    }
});
