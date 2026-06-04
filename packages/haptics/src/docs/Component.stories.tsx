import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';

import { Haptic } from '@alfalab/core-components-haptics';

import type { HapticPreset } from '../types';

const meta: Meta<typeof Haptic> = {
    title: 'Components/Haptic',
    component: Haptic,
    id: 'Haptic',
};

type Story = StoryObj<typeof Haptic>;

const PRESETS = [
    'success',
    'warning',
    'error',
    'light',
    'medium',
    'heavy',
    'soft',
    'rigid',
    'selection',
] as const;

export const haptic: Story = {
    name: 'Haptic',
    render: () => {
        const enabled = boolean('enabled', true);
        const selectedPreset = select('data-haptic-pattern', PRESETS, 'selection') as HapticPreset;

        return (
            <Haptic
                disabled={!enabled}
                data-haptic-preset={selectedPreset}
            >
                Запустить {selectedPreset}
            </Haptic>
        );
    },
};

export default meta;
