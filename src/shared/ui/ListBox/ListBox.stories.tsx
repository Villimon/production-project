import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from '../Text/Text';
import { ListBox } from './ListBox';

export default {
    title: 'shared/ListBox',
    component: ListBox,
    args: {},
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
    <ListBox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
