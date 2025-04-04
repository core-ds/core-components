import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, number } from '@storybook/addon-knobs';
import { HatchingProgressBar } from '@balafla/core-components-hatching-progress-bar';

const meta: Meta<typeof HatchingProgressBar> = {
    title: 'Components/HatchingProgressBar',
    component: HatchingProgressBar,
    id: 'HatchingProgressBar',
};

type Story = StoryObj<typeof HatchingProgressBar>;

export const hatching_progress_bar: Story = {
    name: 'HatchingProgressBar',
    render: () => {
        return (
            <HatchingProgressBar
                value={number('value', 40)}
                hatchValue={number('hatchValue', 60)}
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
            />
        );
    },
};

export default meta;
