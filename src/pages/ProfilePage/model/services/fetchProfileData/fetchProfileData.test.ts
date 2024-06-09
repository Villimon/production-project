import axios from 'axios';
import { Country } from 'entitites/Country';
import { Currency } from 'entitites/Currency';
import { userActions } from 'entitites/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchProfileData } from './fetchProfileData';

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
};

describe('fetchProfileData', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk('1');

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual('error');
    });
});
