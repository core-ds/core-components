import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, text, number, boolean } from '@storybook/addon-knobs';

import { Indicator } from '@alfalab/core-components-indicator';

const meta: Meta<typeof Indicator> = {
    title: 'Components/Indicator',
    component: Indicator,
    id: 'Indicator',
};

type Story = StoryObj<typeof Indicator>;

export const indicator: Story = {
    name: 'Indicator',
    render: () => {
        return (
            <div
                style={{
                    backgroundColor: 'var(--color-light-bg-tertiary)',
                    padding: '8px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <Indicator
                    value={number('value', 1)}
                    height={number('height', undefined)}
                    size={select('size', [8, 20, 24, 40], 20)}
                    color={text('color', '')}
                    backgroundColor={text('backgroundColor', '')}
                    border={boolean('border', true)}
                    view={select('view', [undefined, 'red', 'grey', 'white'], undefined)}
                />
            </div>
        );
    },
};

export default meta;
