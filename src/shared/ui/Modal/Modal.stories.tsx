import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Modal } from './Modal';

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Light = Template.bind({});
Light.args = {
    isOpen: true,
    children: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
    aut id optio quam necessitatibus ab quidem nesciunt,
    perspiciatis aliquam deserunt doloremque, molestiae molestias!
    Consectetur nulla vitae iure, amet obcaecati illum?`,
};

export const Dark = Template.bind({});
Dark.args = {
    isOpen: true,
    children: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
    aut id optio quam necessitatibus ab quidem nesciunt,
    perspiciatis aliquam deserunt doloremque, molestiae molestias!
    Consectetur nulla vitae iure, amet obcaecati illum?`,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
