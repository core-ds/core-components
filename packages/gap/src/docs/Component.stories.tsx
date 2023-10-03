import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { Gap } from '@alfalab/core-components-gap';
import { CardImage } from '@alfalab/core-components-card-image';

const SIZES = [
    '3xs',
    '2xs',
    'xs',
    's',
    'm',
    'l',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
    '6xl',
    '7xl',
    '8xl',
];

const meta: Meta<typeof Gap> = {
    title: 'Components/Gap',
    component: Gap,
    id: 'Gap',
};

type Story = StoryObj<typeof Gap>;

export const gap: Story = {
    name: 'Gap',
    render: () => {
        const direction = select('direction', ['vertical', 'horizontal'], 'vertical');
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: direction === 'vertical' ? 'column' : 'row',
                }}
            >
                <CardImage cardId='EG' />
                <Gap direction={direction} size={select('size', SIZES, 's')} />
                <CardImage cardId='EG' />
            </div>
        );
    },
};

export default meta;
