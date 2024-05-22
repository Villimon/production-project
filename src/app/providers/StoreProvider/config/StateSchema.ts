import { CounterSchema } from 'entitites/Counter';
import { UserSchema } from 'entitites/User';
import { LoginSchema } from 'features/AuthByUsername';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    loginForm: LoginSchema;
}
