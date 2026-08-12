import React, { type ButtonHTMLAttributes, forwardRef, type MouseEvent } from 'react';

import { useHaptic } from '../../hooks/use-haptic';
import { useIosHapticSwitch } from '../../hooks/use-ios-haptic-switch';
import { type HapticBaseProps } from '../../types';

type HapticButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
    type?: 'button' | 'submit';
} & HapticBaseProps;

export const HapticButton = forwardRef<HTMLButtonElement, HapticButtonProps>(
    (
        {
            'data-haptic-preset': dataHapticPreset,
            onClick,
            type = 'button',
            className,
            disabled,
            ...restProps
        },
        ref,
    ) => {
        const { trigger } = useHaptic({ preset: dataHapticPreset });
        const iosSwitch = useIosHapticSwitch({
            disabled,
            onSwitchTap: (e) => {
                onClick?.(e as unknown as MouseEvent<HTMLButtonElement>);
            },
        });

        console.log({ dataHapticPreset, iosSwitch, disabled, trigger }, 'HapticButton');

        const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
            onClick?.(e);

            if (e.defaultPrevented) return;

            trigger();
        };

        const button = (
            <button
                {...restProps}
                ref={ref}
                className={[className, iosSwitch.childClassName].filter(Boolean).join(' ') || undefined}
                disabled={disabled}
                type={type === 'submit' ? 'submit' : 'button'}
                onClick={handleClick}
            />
        );

        if (!iosSwitch.active) {
            return button;
        }

        return (
            <span className={iosSwitch.wrapperClassName}>
                {button}
                {iosSwitch.node}
            </span>
        );
    },
);

HapticButton.displayName = 'HapticButton';
