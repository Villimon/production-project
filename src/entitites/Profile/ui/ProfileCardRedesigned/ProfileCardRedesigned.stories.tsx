import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Country } from '@/entitites/Country';
import { Currency } from '@/entitites/Currency';
import avatar from '@/shared/assets/tests/storybook.jpg';
import { ProfileCardRedesigned } from './ProfileCardRedesigned';

export default {
    title: 'entities/ProfileCardRedesigned',
    component: ProfileCardRedesigned,
    args: {
        children: 'Text',
    },
} as ComponentMeta<typeof ProfileCardRedesigned>;

const Template: ComponentStory<typeof ProfileCardRedesigned> = (args) => (
    <ProfileCardRedesigned {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    data: {
        first: 'Олег',
        lastname: 'Сидоров',
        age: 25,
        currency: Currency.EUR,
        country: Country.Kazakhstan,
        city: 'Воронеж',
        username: 'admin',
        avatar,
    },
};

export const WithError = Template.bind({});
WithError.args = {
    error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
