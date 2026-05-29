import React, { forwardRef, type InputHTMLAttributes, type MouseEvent } from 'react';
import { type HapticPreset } from 'web-haptics';

import { useCoreConfig } from '@alfalab/core-components-config';

// import { type HapticPreset } from '../../types';
import { triggerHaptic } from '../../utils';

export type HapticInputProps = InputHTMLAttributes<HTMLInputElement> & {
    'data-haptic-pattern'?: HapticPreset;
};

export const HapticInput = forwardRef<HTMLInputElement, HapticInputProps>(
    ({ 'data-haptic-pattern': hapticPattern = 'selection', onClick, ...restProps }, ref) => {
        const { haptics } = useCoreConfig();

        const handleClick = (event: MouseEvent<HTMLInputElement>) => {
            onClick?.(event);

            if (event.defaultPrevented) return;

            triggerHaptic(hapticPattern as HapticPreset, { enabled: haptics?.enabled });
        };

        return (
            <input
                {...restProps}
                data-haptic='false'
                data-haptic-pattern={hapticPattern}
                ref={ref}
                onClick={handleClick}
            />
        );
    },
);

HapticInput.displayName = 'HapticInput';
