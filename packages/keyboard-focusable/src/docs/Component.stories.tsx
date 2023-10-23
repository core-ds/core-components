import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KeyboardFocusable } from '@alfalab/core-components-keyboard-focusable';

const meta: Meta<typeof KeyboardFocusable> = {
    title: 'Components/KeyboardFocusable',
    component: KeyboardFocusable,
    id: 'KeyboardFocusable',
};

type Story = StoryObj<typeof KeyboardFocusable>;

export const keyboard_focusable: Story = {
    name: 'KeyboardFocusable',
    render: () => {
        return <></>;
    },
};

export default meta;
