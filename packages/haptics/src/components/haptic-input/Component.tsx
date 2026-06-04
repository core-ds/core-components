import React, { forwardRef, type InputHTMLAttributes, type MouseEvent } from 'react';

import { type HapticBaseProps } from '../../component';
import { useHaptic } from '../../hooks/use-haptic';

type HapticInputProps = InputHTMLAttributes<HTMLInputElement> & HapticBaseProps;

export const HapticInput = forwardRef<HTMLInputElement, HapticInputProps>(
    ({ 'data-haptic-preset': dataHapticPreset, onClick, ...restProps }, ref) => {
        const { trigger } = useHaptic({ dataHapticPreset });

        const handleClick = (event: MouseEvent<HTMLInputElement>) => {
            onClick?.(event);

            if (event.defaultPrevented) return;

            trigger();
        };

        return <input {...restProps} ref={ref} onClick={handleClick} />;
    },
);

HapticInput.displayName = 'HapticInput';
