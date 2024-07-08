import axios from 'axios';
import { Country } from 'entitites/Country';
import { Currency } from 'entitites/Currency';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { ValidateProfileErrors } from '../../consts/consts';
import { updateProfileData } from './updateProfileData';

jest.mock('axios');

// Чтобы была типизация axios
const mockedAxios = jest.mocked(axios, true);

const data = {
    first: 'Олег',
    lastname: 'Сидоров',
    age: 25,
    currency: Currency.EUR,
    country: Country.Kazakhstan,
    city: 'Воронеж',
    username: 'admin',
    id: '1',
};

describe('updateProfileData', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([ValidateProfileErrors.SERVER_ERROR]);
    });

    test('validate error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: { ...data, first: '' },
            },
        });

        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileErrors.INCORRECT_USER_DATA,
        ]);
    });
});
