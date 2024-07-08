import axios from 'axios';
import { Country } from 'entitites/Country';
import { Currency } from 'entitites/Currency';
import { ValidateProfileErrors } from '../../consts/consts';
import { validateProfileData } from './validateProfileData';

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

describe('validateProfileData', () => {
    test('success', () => {
        const result = validateProfileData(data);
        expect(result).toEqual([]);
    });

    test('whitout firstname and lastname', () => {
        const result = validateProfileData({
            ...data,
            first: '',
            lastname: '',
        });
        expect(result).toEqual([ValidateProfileErrors.INCORRECT_USER_DATA]);
    });

    test('incorrect age', () => {
        const result = validateProfileData({
            ...data,
            age: undefined,
        });
        expect(result).toEqual([ValidateProfileErrors.INCORRECT_AGE]);
    });

    test('incorrect country', () => {
        const result = validateProfileData({
            ...data,
            country: undefined,
        });
        expect(result).toEqual([ValidateProfileErrors.INCORRECT_COUNTRY]);
    });

    test('incorrect all', () => {
        const result = validateProfileData({});
        expect(result).toEqual([
            ValidateProfileErrors.INCORRECT_USER_DATA,
            ValidateProfileErrors.INCORRECT_AGE,
            ValidateProfileErrors.INCORRECT_COUNTRY,
        ]);
    });
});
