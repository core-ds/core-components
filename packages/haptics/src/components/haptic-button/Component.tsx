/* eslint-disable react/button-has-type */
import React, { type ButtonHTMLAttributes, forwardRef, type MouseEvent } from 'react';
// import { type HapticPreset } from '../../types';
import { type HapticPreset } from 'web-haptics';

import { useCoreConfig } from '@alfalab/core-components-config';

import { triggerHaptic } from '../../utils';

export type HapticButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    'data-haptic-pattern'?: HapticPreset;
};

export const HapticButton = forwardRef<HTMLButtonElement, HapticButtonProps>(
    ({ 'data-haptic-pattern': hapticPattern = 'selection', onClick, ...restProps }, ref) => {
        const { haptics } = useCoreConfig();

        const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
            onClick?.(event);

            if (event.defaultPrevented) return;

            triggerHaptic(hapticPattern as HapticPreset, { enabled: haptics?.enabled });
        };

        return (
            // eslint-disable-next-line react/button-has-type
            <button
                {...restProps}
                data-haptic='false'
                data-haptic-pattern={hapticPattern}
                ref={ref}
                onClick={handleClick}
            />
        );
    },
);

HapticButton.displayName = 'HapticButton';
