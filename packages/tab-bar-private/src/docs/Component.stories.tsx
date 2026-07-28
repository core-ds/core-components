import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DiamondsMIcon } from '@alfalab/icons-glyph/DiamondsMIcon';

import {
    TabBarPrivate,
    TabBarPrivateTrailingIconButton,
} from '@alfalab/core-components-tab-bar-private';

const meta: Meta<typeof TabBarPrivate> = {
    title: 'Components/TabBarPrivate',
    component: TabBarPrivate,
    id: 'TabBarPrivate',
};

type Story = StoryObj<typeof TabBarPrivate>;

export const button: Story = {
    name: 'TabBarPrivate',
    render: () => {
        return (
            <TabBarPrivate
                items={[
                    { key: 'money', icon: <DiamondsMIcon />, label: 'Деньги' },
                    { key: 'payments', icon: <DiamondsMIcon />, label: 'Платежи' },
                    { key: 'history', icon: <DiamondsMIcon />, label: 'История' },
                    { key: 'x', icon: <DiamondsMIcon />, label: 'Икс' },
                ]}
                trailingAddon={
                    <TabBarPrivateTrailingIconButton icon={<DiamondsMIcon />} label='Поддержка' />
                }
            />
        );
    },
};

export default meta;
