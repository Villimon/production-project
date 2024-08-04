import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { articleDetailsReducer } from '@/entitites/Article/model/slice/articleDetailsSlice';
import { profileReducer } from '@/features/editablePofileCard';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addCommentFormReducer } from '@/features/addCommentForm';
import { loginReducer } from '@/features/AuthByUsername';
import { articleDetailsPageReducer } from '@/pages/ArticlesDetailsPage';

const defaultAsyncReducer: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => (StoryComponent: Story) => (
    <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducer, ...asyncReducers }}
    >
        <StoryComponent />
    </StoreProvider>
);
