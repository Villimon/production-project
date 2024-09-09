import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

import { Button } from './Button';
import { Theme } from '@/shared/constants/theme';

export default {
    title: 'shared/Button',
    component: Button,
    args: {
        children: 'Text',
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const Clear = Template.bind({});
Clear.args = {
    variant: 'clear',
};

export const Outline = Template.bind({});
Outline.args = {};

export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
    size: 'l',
};

export const OutlineSizeXL = Template.bind({});
OutlineSizeXL.args = {
    size: 'xl',
};

export const Square = Template.bind({});
Square.args = {
    children: '>',
    square: true,
};

export const SquareSizeM = Template.bind({});
SquareSizeM.args = {
    children: '>',
    square: true,
    size: 'm',
};

export const SquareSizeL = Template.bind({});
SquareSizeL.args = {
    children: '>',
    square: true,
    size: 'l',
};

export const SquareSizeXL = Template.bind({});
SquareSizeXL.args = {
    children: '>',
    square: true,
    size: 'xl',
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Disables = Template.bind({});
Disables.args = {
    disabled: true,
};
