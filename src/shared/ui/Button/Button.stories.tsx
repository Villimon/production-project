import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
// import 'app/styles/index.scss'

import { Button, ThemeButton } from './Button';

export default {
    title: 'shared/Button',
    component: Button,
    args: {
        children: 'Text'
    }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const Clear = Template.bind({});
Clear.args = {
    theme: ThemeButton.CLEAR
};

export const Outline = Template.bind({});
Outline.args = {
    theme: ThemeButton.OUTLINE
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    theme: ThemeButton.OUTLINE
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)]

