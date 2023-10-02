import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '@alfalab/core-components-divider';

const meta: Meta<typeof Divider> = {
    title: 'Components/Divider',
    component: Divider,
    id: 'Divider',
};

type Story = StoryObj<typeof Divider>;

export const divider: Story = {
    name: 'Divider',
    render: () => {
        return (
            <div>
                <div style={{ height: 24, margin: '8px 0', backgroundColor: '#eeeff1' }} />
                <Divider />
                <div style={{ height: 24, margin: '8px 0', backgroundColor: '#eeeff1' }} />
            </div>
        );
    },
};

export default meta;
