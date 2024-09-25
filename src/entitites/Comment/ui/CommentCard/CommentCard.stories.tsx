import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { CommentCard } from './CommentCard';
import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator';

export default {
    title: 'entitites/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
    <CommentCard {...args} />
);

const propsNormal = {
    comment: {
        id: '1',
        text: 'Hello',
        user: { id: '1', username: 'Oleg' },
    },
};

export const Normal = Template.bind({});
Normal.args = propsNormal;
Normal.decorators = [StoreDecorator({})];

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = propsNormal;
NormalRedesigned.decorators = [
    StoreDecorator({}),
    FeatureFlagsDecorator({ isAppRedesigned: true }),
];

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
Loading.decorators = [StoreDecorator({})];
