import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import { Status, colors } from '@alfalab/core-components-status';

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
        >
            {text('children', 'Label')}
        </Status>
    ),
};

export default meta;
