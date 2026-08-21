import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';

import { CoreConfigContext } from '@alfalab/core-components-config';
import { HapticButton } from '@alfalab/core-components-haptics';

import type { HapticPreset } from '../typings';

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
        const debug = boolean('debug', false);
        const selectedPreset = select('data-haptic-preset', PRESETS, 'selection') as HapticPreset;

        return (
            <CoreConfigContext.Provider
                value={{ breakpoint: 1024, client: 'mobile', haptics: { enabled: true, debug } }}
            >
                <HapticButton disabled={!enabled} data-haptic-preset={selectedPreset}>
                    Запустить {selectedPreset}
                </HapticButton>
            </CoreConfigContext.Provider>
        );
    },
};

export default meta;
