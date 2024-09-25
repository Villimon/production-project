import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Country } from '@/entitites/Country';
import { Currency } from '@/entitites/Currency';
import avatar from '@/shared/assets/tests/storybook.jpg';
import { ProfileCard } from './ProfileCard';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    args: {
        children: 'Text',
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
    <ProfileCard {...args} />
);

const primaryParams = {
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

export const Primary = Template.bind({});
Primary.args = primaryParams;

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = primaryParams;
PrimaryRedesigned.decorators = [NewDesignDecorator];

export const WithError = Template.bind({});
WithError.args = {
    error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
