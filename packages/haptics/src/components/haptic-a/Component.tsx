/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { type AnchorHTMLAttributes, forwardRef, type MouseEvent } from 'react';

import { useHaptic } from '../../hooks/use-haptic';
import { useIosHapticSwitch } from '../../hooks/use-ios-haptic-switch';
import { type HapticBaseProps } from '../../types';

type HapticAProps = AnchorHTMLAttributes<HTMLAnchorElement> & HapticBaseProps;

export const HapticA = forwardRef<HTMLAnchorElement, HapticAProps>(
    ({ 'data-haptic-preset': dataHapticPreset, onClick, className, ...restProps }, ref) => {
        const { trigger } = useHaptic({ preset: dataHapticPreset });
        const disabled = Boolean((restProps as { disabled?: boolean }).disabled);
        const iosSwitch = useIosHapticSwitch({
            disabled,
            onSwitchTap: (event) => {
                onClick?.(event as unknown as MouseEvent<HTMLAnchorElement>);
            },
        });

        console.log({ dataHapticPreset, iosSwitch, disabled, trigger }, 'HapticA');

        const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
            onClick?.(event);

            if (event.defaultPrevented) return;

            trigger();
        };

        const anchor = (
            // eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/click-events-have-key-events
            <a
                {...restProps}
                ref={ref}
                className={
                    [className, iosSwitch.childClassName].filter(Boolean).join(' ') || undefined
                }
                onClick={handleClick}
            />
        );

        if (!iosSwitch.active) {
            return anchor;
        }

        return (
            <span className={iosSwitch.wrapperClassName}>
                {anchor}
                {iosSwitch.node}
            </span>
        );
    },
);

HapticA.displayName = 'HapticA';
