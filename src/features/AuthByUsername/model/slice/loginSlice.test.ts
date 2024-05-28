import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('getLogginUsername', () => {
    test('test set username', () => {
        const state: DeepPartial<LoginSchema> = {
            username: 'user',
        };
        expect(
            loginReducer(state as LoginSchema, loginActions.setUsername('user')),
        ).toEqual({ username: 'user' });
    });

    test('test set password', () => {
        const state: DeepPartial<LoginSchema> = {
            password: '123',
        };
        expect(
            loginReducer(state as LoginSchema, loginActions.setPassword('123')),
        ).toEqual({ password: '123' });
    });
});
