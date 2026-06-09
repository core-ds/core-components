import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';

import { HapticButton } from '@alfalab/core-components-haptics';

import type { HapticPreset } from '../types';

const meta: Meta<typeof HapticButton> = {
    title: 'Components/Haptic',
    component: HapticButton,
    id: 'Haptic',
};

type Story = StoryObj<typeof HapticButton>;

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
        const selectedPreset = select('data-haptic-preset', PRESETS, 'selection') as HapticPreset;

        return (
            <HapticButton disabled={!enabled} data-haptic-preset={selectedPreset}>
                Запустить {selectedPreset}
            </HapticButton>
        );
    },
};

export default meta;
