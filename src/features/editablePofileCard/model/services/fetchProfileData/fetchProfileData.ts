import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entitites/Profile';

export const fetchProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<string>
>('profile/fetchProfileData', async (profileId, { extra, rejectWithValue }) => {
    try {
        const response = await extra.api.get<Profile>(`/profile/${profileId}`);
        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue('error');
    }
});
