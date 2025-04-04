import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MaskedInput } from '@balafla/core-components-masked-input';

const mask = [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
];

const meta: Meta<typeof MaskedInput> = {
    title: 'Components/MaskedInput',
    component: MaskedInput,
    id: 'MaskedInput',
};

type Story = StoryObj<typeof MaskedInput>;

export const masked_input: Story = {
    name: 'MaskedInput',
    render: () => {
        return (
            <div style={{ width: '240px' }}>
                <MaskedInput mask={mask} placeholder='0000 0000 0000 0000' block={true} />
            </div>
        );
    },
};

export default meta;
