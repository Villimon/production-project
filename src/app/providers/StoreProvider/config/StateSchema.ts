import { CounterSchema } from 'entitites/Counter';
import { UserSchema } from 'entitites/User';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
}
