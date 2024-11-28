import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, number } from '@storybook/addon-knobs';
import { ProgressBar } from '@alfalab/core-components-progress-bar';

const meta: Meta<typeof ProgressBar> = {
    title: 'Components/ProgressBar',
    component: ProgressBar,
    id: 'ProgressBar',
};

type Story = StoryObj<typeof ProgressBar>;

export const progress_bar: Story = {
    name: 'ProgressBar',
    render: () => (
        <ProgressBar
            value={number('value', 40)}
            view={select(
                'view',
                [
                    'positive',
                    'negative',
                    'attention',
                    'link',
                    'tertiary',
                    'secondary',
                    'primary',
                    'accent',
                ],
                'positive',
            )}
            size={select('size', [4, 8], 4)}
            colors={select('colors', ['default', 'inverted'], 'default')}
        />
    ),
};

export default meta;
