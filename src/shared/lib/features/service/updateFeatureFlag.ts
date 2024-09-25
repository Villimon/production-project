import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { updateFeatureFlagsMutation } from '../api/featureFlagApi';
import { getFeatureAllFlags } from '../lib/setGetFeatures';

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
                    ...getFeatureAllFlags(),
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
