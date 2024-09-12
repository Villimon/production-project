import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Country } from '@/entitites/Country';
import { Currency } from '@/entitites/Currency';
import avatar from '@/shared/assets/tests/storybook.jpg';
import { ProfileCardDeprecated } from './ProfileCardDeprecated';

export default {
    title: 'entities/ProfileCardDeprecated',
    component: ProfileCardDeprecated,
    args: {
        children: 'Text',
    },
} as ComponentMeta<typeof ProfileCardDeprecated>;

const Template: ComponentStory<typeof ProfileCardDeprecated> = (args) => (
    <ProfileCardDeprecated {...args} />
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
