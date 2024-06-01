import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entitites/Country';
import { Currency } from 'entitites/Currency';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm', () => {
    const data = {
        first: 'Олег',
        lastname: 'Сидоров',
        age: 25,
        currency: Currency.EUR,
        country: Country.Kazakhstan,
        city: 'Воронеж',
        username: 'admin',
    };
    test('should return form', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                form: data,
            },
        };
        expect(getProfileForm(state as StateSchema)).toEqual(data);
    });

    test('work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
