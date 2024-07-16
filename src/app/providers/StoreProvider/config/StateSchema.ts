import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from '@/entitites/Article';
import { CounterSchema } from '@/entitites/Counter';
import { UserSchema } from '@/entitites/User';
import { AddCommentFormSchema } from '@/features/addCommentForm';
import { LoginSchema } from '@/features/AuthByUsername';
import { ProfileSchema } from '@/features/editablePofileCard';
import { ArticleDetailsPageSchema } from '@/pages/ArticlesDetailsPage';
import { ArticlePageSchema } from '@/pages/ArticlesPage';
import { rtkApi } from '@/shared/api/rtkApi';
import { UISchema } from '@/widgets/Page';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    ui: UISchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    addCommentForm?: AddCommentFormSchema;
    articlePage?: ArticlePageSchema;
    articleDetailsPage?: ArticleDetailsPageSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
