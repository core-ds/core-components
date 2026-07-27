import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { TabBarPrivate } from '@alfalab/core-components-tab-bar-private';

const meta: Meta<typeof TabBarPrivate> = {
    title: 'Components/TabBarPrivate',
    component: TabBarPrivate,
    id: 'TabBarPrivate',
};

type Story = StoryObj<typeof TabBarPrivate>;

export const button: Story = {
    name: 'TabBarPrivate',
    render: () => {
        return <TabBarPrivate />;
    },
};

export default meta;
