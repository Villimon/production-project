import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { EditablePofileCard } from './EditablePofileCard';

export default {
    title: 'features/EditablePofileCard',
    component: EditablePofileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EditablePofileCard>;

const Template: ComponentStory<typeof EditablePofileCard> = (args) => (
    <EditablePofileCard {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
