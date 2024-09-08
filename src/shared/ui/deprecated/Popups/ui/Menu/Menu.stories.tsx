import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Menu } from './Menu';
import { Button } from '../../../Button/Button';

export default {
    title: 'shared/Menu',
    component: Menu,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    trigger: <Button>Open</Button>,
    items: [
        {
            content: 'first',
        },
        {
            content: 'second',
        },
        {
            content: 'third',
        },
    ],
};

export const Dark = Template.bind({});
