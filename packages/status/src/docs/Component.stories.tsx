import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { Status } from '@alfalab/core-components-status';
import { colors, sizes } from '../consts';

const meta: Meta<typeof Status> = {
    title: 'Components/Status',
    component: Status,
    id: 'Status',
};

type Story = StoryObj<typeof Status>;

export const status: Story = {
    name: 'Status',
    render: () => (
        <Status
            color={select('color', colors, 'green')}
            view={select('view', ['muted-alt', 'contrast', 'muted'], 'muted-alt')}
            size={select('size', sizes, 20)}
            shape={select('shape', ['rectangular', 'rounded'], 'rectangular')}
            uppercase={boolean('uppercase', true)}
        >
            {text('children', 'Label')}
        </Status>
    ),
};

export default meta;
