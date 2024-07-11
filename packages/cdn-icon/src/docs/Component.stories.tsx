import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CDNIcon } from '@alfalab/core-components-cdn-icon';
import { DiamondsMIcon } from '@alfalab/icons-glyph/DiamondsMIcon';

const meta: Meta<typeof CDNIcon> = {
    title: 'Components/CDNIcon',
    component: CDNIcon,
    id: 'CDNIcon',
};

type Story = StoryObj<typeof CDNIcon>;

export const cdn_icon: Story = {
    name: 'CDNIcon',
    render: () => {
        return (
            <CDNIcon
                name='glyph_diamonds_m'
                fallback={<DiamondsMIcon />}
                color='var(--color-light-neutral-700)'
            />
        );
    },
};

export default meta;
