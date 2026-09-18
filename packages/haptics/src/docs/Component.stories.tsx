import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';

import { CoreConfigContext } from '@alfalab/core-components-config';
import { defaultPatterns, HapticButton, type HapticPreset } from '@alfalab/core-components-haptics';

const meta: Meta<typeof HapticButton> = {
    title: 'Components/Haptic',
    component: HapticButton,
    id: 'Haptic',
};

type Story = StoryObj<typeof HapticButton>;

const PRESETS = Object.keys(defaultPatterns) as HapticPreset[];

export const haptic: Story = {
    name: 'Haptic',
    render: () => {
        const enabled = boolean('enabled', true);
        const debug = boolean('debug', false);
        const selectedPreset = select<HapticPreset>('data-haptic-preset', PRESETS, 'selection');

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
