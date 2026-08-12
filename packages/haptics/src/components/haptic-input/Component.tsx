import React, { forwardRef, type InputHTMLAttributes, type MouseEvent } from 'react';

import { useHaptic } from '../../hooks/use-haptic';
import { useIosHapticSwitch } from '../../hooks/use-ios-haptic-switch';
import { type HapticBaseProps } from '../../types';

type HapticInputProps = InputHTMLAttributes<HTMLInputElement> & HapticBaseProps;

export const HapticInput = forwardRef<HTMLInputElement, HapticInputProps>(
    ({ 'data-haptic-preset': dataHapticPreset, onClick, disabled, ...restProps }, ref) => {
        const { trigger } = useHaptic({ preset: dataHapticPreset });

        const iosSwitch = useIosHapticSwitch({
            disabled,
            fillParent: true,
            onSwitchTap: (event) => {
                onClick?.(event as unknown as MouseEvent<HTMLInputElement>);
            },
        });

        console.log({ dataHapticPreset, iosSwitch, disabled, trigger }, 'HapticInput');

        const handleClick = (event: MouseEvent<HTMLInputElement>) => {
            onClick?.(event);

            if (event.defaultPrevented) return;

            trigger();
        };

        const input = <input {...restProps} ref={ref} disabled={disabled} onClick={handleClick} />;

        if (!iosSwitch.active) {
            return input;
        }

        return (
            <React.Fragment>
                {input}
                {iosSwitch.node}
            </React.Fragment>
        );
    },
);

HapticInput.displayName = 'HapticInput';
