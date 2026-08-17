import React, { forwardRef, type InputHTMLAttributes, type MouseEvent } from 'react';

import { useHaptic } from '../../hooks/use-haptic';
import { type HapticBaseProps } from '../../typings';
import { HapticOverlay } from '../haptic-overlay';

type HapticInputProps = InputHTMLAttributes<HTMLInputElement> & HapticBaseProps;

export const HapticInput = forwardRef<HTMLInputElement, HapticInputProps>(
    ({ 'data-haptic-preset': preset, onClick, disabled, ...restProps }, ref) => {
        const { trigger, needsOverlay } = useHaptic({ preset, disabled });

        const handleClick = (event: MouseEvent<HTMLInputElement>) => {
            onClick?.(event);

            if (event.defaultPrevented) return;

            trigger();
        };

        const input = <input {...restProps} ref={ref} disabled={disabled} onClick={handleClick} />;

        if (!needsOverlay) {
            return input;
        }

        /*
         * Обёртки нет: input живёт внутри чужого `<label>` (Switch, Checkbox),
         * и лишний элемент сломал бы их раскладку.
         */
        return (
            <HapticOverlay fillParent={true} onTap={(event) => onClick?.(event)}>
                {input}
            </HapticOverlay>
        );
    },
);

HapticInput.displayName = 'HapticInput';
