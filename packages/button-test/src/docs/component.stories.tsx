import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ButtonTest } from '..';

export default {
    title: 'Компоненты/ButtonTest',
    component: ButtonTest,
    argTypes: {
        view: {
            options: ['primary', 'secondary', 'tertiary', 'link', 'ghost'],
            control: { type: 'select' },
            description: 'kkkkk',
        },
        leftAddons: {
            options: '<StarMIcon />',
            control: { type: 'boolean' },
        },
        rightAddons: {
            options: '<StarMIcon />',
            control: { type: 'boolean' },
        },
        Component: {
            control: false,
        },
        dataTestId: {
            control: false,
        },
        className: {
            control: false,
        },
    },
} as ComponentMeta<typeof ButtonTest>;

const Template: ComponentStory<typeof ButtonTest> = args => (
    <ButtonTest {...args}>{args.children}</ButtonTest>
);

export const Default = Template.bind({});
Default.args = {
    view: 'primary',
    children: 'sss',
};
