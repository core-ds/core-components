import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { Status } from '@alfalab/core-components-status';
import { COLORS, SIZES } from '../consts';
import { DiamondsSIcon } from '@alfalab/icons-glyph/DiamondsSIcon';
import { DiamondsMIcon } from '@alfalab/icons-glyph/DiamondsMIcon';

const meta: Meta<typeof Status> = {
    title: 'Components/Status',
    component: Status,
    id: 'Status',
};

type Story = StoryObj<typeof Status>;

export const status: Story = {
    name: 'Status',
    render: () => {
        const size = select('size', SIZES, 20);
        const leftAddonIcon = [20, 24].includes(size) ? (
            <DiamondsSIcon width={12} height={12} />
        ) : (
            <DiamondsMIcon width={16} height={16} />
        );
        const leftAddons = boolean('leftAddons', false) && leftAddonIcon;

        return (
            <Status
                color={select('color', COLORS, 'green')}
                view={select('view', ['muted-alt', 'contrast', 'muted'], 'muted-alt')}
                size={size}
                shape={select('shape', ['rectangular', 'rounded'], 'rectangular')}
                uppercase={boolean('uppercase', true)}
                leftAddons={leftAddons}
            >
                {text('children', 'Label')}
            </Status>
        );
    },
};

export default meta;
