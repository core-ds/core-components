import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from '@alfalab/core-components-loader';

const meta: Meta<typeof Loader> = {
    title: 'Deprecated components/Loader',
    component: Loader,
    id: 'Loader',
};

type Story = StoryObj<typeof Loader>;

export const loader: Story = {
    name: 'Loader',
    render: () => <Loader />,
};

export default meta;
