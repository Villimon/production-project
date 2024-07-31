import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Raiting } from './Raiting';

export default {
    title: 'shared/Raiting',
    component: Raiting,
    args: {},
} as ComponentMeta<typeof Raiting>;

const Template: ComponentStory<typeof Raiting> = (args) => <Raiting {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
