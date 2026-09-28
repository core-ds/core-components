import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { type Meta, type StoryObj } from '@storybook/react';

import {
    TabBarIsland,
    TabBarIslandTrailingIconButton,
} from '@alfalab/core-components-tab-bar-island';
import { DiamondsMIcon } from '@alfalab/icons-glyph/DiamondsMIcon';

const meta: Meta<typeof TabBarIsland> = {
    title: 'Components/TabBarIsland',
    component: TabBarIsland,
    id: 'TabBarIsland',
};

type Story = StoryObj<typeof TabBarIsland>;

export const button: Story = {
    name: 'TabBarIsland',
    render: () => {
        const iconAnimation = boolean('iconAnimation', true);

        return (
            <TabBarIsland
                iconAnimation={iconAnimation}
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
