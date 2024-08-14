import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator';
import { RouteDecorator } from '../../src/shared/config/storybook/RouteDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator';
import { Theme } from '../../src/shared/constants/theme';
export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    layout: 'fullscreen',
    themes: {
        default: 'light',
        list: [
            {
                name: 'light',
                class: ['app', Theme.LIGHT],
                color: '#fffff',
            },
            {
                name: 'dark',
                class: ['app', Theme.DARK],
                color: '#00000',
            },
            {
                name: 'pink',
                class: ['app', Theme.PINK],
                color: '#df6589',
            },
        ],
    },
};

addDecorator(StyleDecorator);
// addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouteDecorator);
addDecorator(SuspenseDecorator);
