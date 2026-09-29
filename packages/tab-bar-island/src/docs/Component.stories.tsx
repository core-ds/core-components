import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DiamondsMIcon } from '@alfalab/icons-glyph/DiamondsMIcon';

import {
    TabBarIsland,
    TabBarIslandTrailingIconButton,
} from '@alfalab/core-components-tab-bar-island';

const meta: Meta<typeof TabBarIsland> = {
    title: 'Components/TabBarIsland',
    component: TabBarIsland,
    id: 'TabBarIsland',
};

type Story = StoryObj<typeof TabBarIsland>;

export const button: Story = {
    name: 'TabBarIsland',
    render: () => {
        return (
            <TabBarIsland
                items={[
                    { key: 'money', icon: <DiamondsMIcon />, label: 'Поддержка' },
                    { key: 'payments', icon: <DiamondsMIcon />, label: 'Платежи' },
                    { key: 'history', icon: <DiamondsMIcon />, label: 'История' },
                    { key: 'x', icon: <DiamondsMIcon />, label: 'Икс' },
                ]}
                trailingAddon={
                    <TabBarIslandTrailingIconButton icon={<DiamondsMIcon />} label='Поддержка' />
                }
            />
        );
    },
};

export default meta;
