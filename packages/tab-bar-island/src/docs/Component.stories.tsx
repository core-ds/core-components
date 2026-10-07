import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { type Meta, type StoryObj } from '@storybook/react';

import {
    TabBarIsland,
    TabBarIslandTrailingIconButton,
} from '@alfalab/core-components-tab-bar-island';
import { DiamondsLine24Icon } from '@alfalab/icons-glyph-26/DiamondsLine24Icon';

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
        const showSkeleton = boolean('showSkeleton', false);

        return (
            <TabBarIsland
                iconAnimation={iconAnimation}
                showSkeleton={showSkeleton}
                items={[
                    { key: 0, icon: <DiamondsLine24Icon />, label: 'Label' },
                    { key: 1, icon: <DiamondsLine24Icon />, label: 'Label', indicator: true },
                    { key: 2, icon: <DiamondsLine24Icon />, label: 'Label', indicator: 5 },
                    { key: 3, icon: <DiamondsLine24Icon />, label: 'Label', indicator: 100 },
                ]}
                trailingAddon={
                    <TabBarIslandTrailingIconButton
                        icon={<DiamondsLine24Icon />}
                        label='Поддержка'
                    />
                }
            />
        );
    },
};

export default meta;
