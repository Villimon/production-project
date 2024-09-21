import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    LOCAL_STORAGE_LAST_DESIGN_KEY,
    USER_LOCAL_STORAGE_KEY,
} from '@/shared/constants/localstorage';
import { User, UserSchema } from '../types/user';
import { setFeatureFlag } from '@/shared/lib/features';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';
import { initAuthData } from '../services/initAuthData';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
            setFeatureFlag(action.payload.features);
            localStorage.setItem(USER_LOCAL_STORAGE_KEY, action.payload.id);
            localStorage.setItem(
                LOCAL_STORAGE_LAST_DESIGN_KEY,
                action.payload.features?.isAppRedesigned ? 'new' : 'old',
            );
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            saveJsonSettings.fulfilled,
            (state, { payload }: PayloadAction<JsonSettings>) => {
                if (state.authData) {
                    state.authData.jsonSettings = payload;
                }
            },
        );
        builder.addCase(
            initAuthData.fulfilled,
            (state, { payload }: PayloadAction<User>) => {
                state.authData = payload;
                setFeatureFlag(payload.features);
                state._inited = true;
            },
        );
        builder.addCase(initAuthData.rejected, (state) => {
            state._inited = true;
        });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
