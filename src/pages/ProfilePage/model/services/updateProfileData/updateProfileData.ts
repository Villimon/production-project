import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { Profile } from '../../types/profile';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
>(
    'profile/updateProfileData',
    async (_, { extra, rejectWithValue, getState }) => {
        try {
            const formData = getProfileForm(getState());

            const response = await extra.api.put<Profile>('/profile', formData);
            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('error');
        }
    },
);
