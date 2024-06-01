import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { Currency } from 'entitites/Currency';
import { Country } from 'entitites/Country';
import avatar from 'shared/assets/tests/storybook.jpg';
import ProfilePage from './ProfilePage';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => (
    <ProfilePage {...args} />
);

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
    StoreDecorator({
        profile: {
            form: {
                first: 'Олег',
                lastname: 'Сидоров',
                age: 25,
                currency: Currency.EUR,
                country: Country.Kazakhstan,
                city: 'Воронеж',
                username: 'admin',
                avatar,
            },
        },
    }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            form: {
                first: 'Олег',
                lastname: 'Сидоров',
                age: 25,
                currency: Currency.EUR,
                country: Country.Kazakhstan,
                city: 'Воронеж',
                username: 'admin',
                avatar,
            },
        },
    }),
];
