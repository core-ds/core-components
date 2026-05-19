import React, {
    forwardRef,
    type MouseEvent,
} from 'react';

import { useCoreConfig } from '@alfalab/core-components-config';

import { type HapticPreset, type HapticProps, type HapticType } from './types';
import { triggerHaptic } from './utils';

// todo: add more haptic presets
const hapticPresets: Record<HapticType, HapticPreset> = {
    checkbox: 'selection',
};

export const Haptic = forwardRef<HTMLElement, HapticProps>(
    ({ Component = 'button', haptic, onClick, ...restProps }, ref) => {
        const { haptics } = useCoreConfig();

        const handleClick = (event: MouseEvent<HTMLElement>) => {
            onClick?.(event);

            // if the event is default prevented, don't trigger the haptic
            if (event.defaultPrevented) return;

            triggerHaptic(hapticPresets[haptic as HapticType], {
                enabled: true || haptics?.enabled,
            });
        };

        // data-haptic='false' research
        return <Component {...restProps} data-haptic='false' ref={ref} onClick={handleClick} />;
    });

Haptic.displayName = 'Haptic';
