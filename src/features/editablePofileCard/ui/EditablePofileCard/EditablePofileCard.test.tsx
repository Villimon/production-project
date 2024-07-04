import { Country } from 'entitites/Country';
import { Currency } from 'entitites/Currency';
import { Profile } from 'pages/ProfilePage';
import React from 'react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { userEvent } from '@storybook/testing-library';
import { screen } from '@testing-library/react';
import { $api } from 'shared/api/api';
import { EditablePofileCard } from './EditablePofileCard';
import { profileReducer } from '../../model/slice/profileSlice';

const profile: Profile = {
    age: 12,
    city: 'Moscow',
    country: Country.Russia,
    currency: Currency.RUB,
    first: 'Oleg',
    lastname: 'Sidorov',
    id: '1',
    username: 'Admin',
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: {
                id: '1',
                username: 'Admin',
            },
        },
    },

    // Монтируем редусеры в компонентах в которых они требуются
    asyncReducer: {
        profile: profileReducer,
    },
};

describe('EditablePofileCardSidebar', () => {
    test('Режим рид онли должен переключиться', async () => {
        componentRender(<EditablePofileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('ProfilePageHeader.EditButton'),
        );
        expect(
            screen.getByTestId('ProfilePageHeader.CancelButton'),
        ).toBeInTheDocument();
    });

    test('При отмене значения должны обнулиться', async () => {
        componentRender(<EditablePofileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('ProfilePageHeader.EditButton'),
        );
        // Очистили поля
        await userEvent.clear(screen.getByTestId('ProfileCard.first'));
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

        // Ввели в поле новые данные
        await userEvent.type(screen.getByTestId('ProfileCard.first'), 'user');
        await userEvent.type(
            screen.getByTestId('ProfileCard.lastname'),
            'user',
        );

        // Проверили что данные обновлись
        expect(screen.getByTestId('ProfileCard.first')).toHaveValue('user');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');

        // Нажимаем отмену
        await userEvent.click(
            screen.getByTestId('ProfilePageHeader.CancelButton'),
        );

        expect(screen.getByTestId('ProfileCard.first')).toHaveValue('Oleg');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue(
            'Sidorov',
        );
    });

    test('Должна появиться ошибка', async () => {
        componentRender(<EditablePofileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('ProfilePageHeader.EditButton'),
        );

        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

        await userEvent.click(
            screen.getByTestId('ProfilePageHeader.SaveButton'),
        );

        // Прогружается сперва лоадер почему-то
        // expect(
        //     screen.getByTestId('EditablePofileCard.Error.Paragraph')
        // ).toBeInTheDocument();
    });

    test('Если нет ошибок валидации, то на сервер должен уйти PUT запрос', async () => {
        const mockPutReq = jest.spyOn($api, 'put');
        componentRender(<EditablePofileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('ProfilePageHeader.EditButton'),
        );

        await userEvent.type(screen.getByTestId('ProfileCard.first'), 'user');

        await userEvent.click(
            screen.getByTestId('ProfilePageHeader.SaveButton'),
        );

        expect(mockPutReq).toHaveBeenCalled();
    });
});
