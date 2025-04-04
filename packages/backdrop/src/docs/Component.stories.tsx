import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { Backdrop } from '@balafla/core-components-backdrop';

const meta: Meta<typeof Backdrop> = {
    title: 'Components/Backdrop',
    component: Backdrop,
    id: 'Backdrop',
};

type Story = StoryObj<typeof Backdrop>;

export const backdrop: Story = {
    name: 'Backdrop',
    render: () => {
        return (
            <Backdrop
                open={boolean('open', false)}
                invisible={boolean('invisible', false)}
                unmountOnExit={boolean('unmountOnExit', false)}
            >
                {text('children', '')}
            </Backdrop>
        );
    },
};

export default meta;
