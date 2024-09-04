import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../types/jsonSettings';
import { getUserData } from '../selectors/getUserData/getUserData';
import { getJsonSettings } from '../selectors/jsonSettings';
import { setJsonSettingsMutations } from '../../api/userApi';

export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    JsonSettings,
    ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    const userData = getUserData(getState());
    const currentSettings = getJsonSettings(getState());

    if (!userData) {
        return rejectWithValue('Нет пользователя');
    }

    try {
        const response = await dispatch(
            setJsonSettingsMutations({
                userId: userData.id,
                jsonSettings: {
                    ...currentSettings,
                    ...newJsonSettings,
                },
            }),
        ).unwrap();

        if (!response.jsonSettings) {
            return rejectWithValue('Нет jsonSettings');
        }

        return response.jsonSettings;
    } catch (error) {
        console.log(error);
        return rejectWithValue('');
    }
});
