import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { profileReducer } from 'pages/ProfilePage';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReeducer: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
};

export const StoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => (StoryComponent: Story) => (
    <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReeducer, ...asyncReducers }}
    >
        <StoryComponent />
    </StoreProvider>
);
