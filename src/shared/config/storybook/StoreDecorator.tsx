import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
// eslint-disable-next-line project-my-plugin/layer-imports
import { articleDetailsReducer } from '@/entitites/Article/model/slice/articleDetailsSlice';
// eslint-disable-next-line project-my-plugin/layer-imports
import { profileReducer } from '@/features/editablePofileCard';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
// eslint-disable-next-line project-my-plugin/layer-imports
import { addCommentFormReducer } from '@/features/addCommentForm';
// eslint-disable-next-line project-my-plugin/layer-imports
import { loginReducer } from '@/features/AuthByUsername';
// eslint-disable-next-line project-my-plugin/layer-imports
import { articleDetailsPageReducer } from '@/pages/ArticlesDetailsPage';
// TODO чтобы убрать эти комментарии надо делать урок 91

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
