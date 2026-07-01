import React, { forwardRef, type InputHTMLAttributes, type MouseEvent } from 'react';

import { useHaptic } from '../../hooks/use-haptic';
import { type HapticBaseProps } from '../../types';

type HapticInputProps = InputHTMLAttributes<HTMLInputElement> & HapticBaseProps;

export const HapticInput = forwardRef<HTMLInputElement, HapticInputProps>(
    ({ 'data-haptic-preset': dataHapticPreset, onClick, ...restProps }, ref) => {
        const { trigger } = useHaptic({ preset: dataHapticPreset });

        const handleClick = (event: MouseEvent<HTMLInputElement>) => {
            onClick?.(event);

            if (event.defaultPrevented) return;

            trigger();
        };

        return <input {...restProps} ref={ref} onClick={handleClick} />;
    },
);

HapticInput.displayName = 'HapticInput';
