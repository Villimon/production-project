import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListBox } from './ListBox';

export default {
    title: 'shared/ListBox',
    component: ListBox,
    args: {},
    decorators: [
        (Story) => (
            <div style={{ padding: 100 }}>
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
    <ListBox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    items: [
        {
            content: '123123',
            value: '1',
        },
        {
            content: '123123333',
            value: '12',
        },
        {
            content: '123123444',
            value: '13',
        },
    ],
};

export const TopRight = Template.bind({});
TopRight.args = {
    direction: 'top-right',
    value: '1',
    items: [
        {
            content: '123123',
            value: '1',
        },
        {
            content: '123123333',
            value: '12',
        },
        {
            content: '123123444',
            value: '13',
        },
    ],
};

export const TopLeft = Template.bind({});
TopLeft.args = {
    direction: 'top-left',
    value: '1',
    items: [
        {
            content: '123123',
            value: '1',
        },
        {
            content: '123123333',
            value: '12',
        },
        {
            content: '123123444',
            value: '13',
        },
    ],
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
    direction: 'bottom-left',
    value: '1',
    items: [
        {
            content: '123123',
            value: '1',
        },
        {
            content: '123123333',
            value: '12',
        },
        {
            content: '123123444',
            value: '13',
        },
    ],
};

export const BottomRight = Template.bind({});
BottomRight.args = {
    direction: 'bottom-right',
    value: '1',
    items: [
        {
            content: '123123',
            value: '1',
        },
        {
            content: '123123333',
            value: '12',
        },
        {
            content: '123123444',
            value: '13',
        },
    ],
};
