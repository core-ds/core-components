import React, { type ButtonHTMLAttributes, forwardRef, type MouseEvent } from 'react';

import { useHaptic } from '../../hooks/use-haptic';
import { type HapticBaseProps } from '../../typings';
import { HapticOverlay } from '../haptic-overlay';

type HapticButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
    type?: 'button' | 'submit';
} & HapticBaseProps;

export const HapticButton = forwardRef<HTMLButtonElement, HapticButtonProps>(
    (
        {
            'data-haptic-preset': preset,
            onClick,
            type = 'button',
            className,
            disabled,
            ...restProps
        },
        ref,
    ) => {
        const { trigger, needsOverlay } = useHaptic({ preset, disabled });

        const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
            onClick?.(event);

            if (event.defaultPrevented) return;

            trigger();
        };

        const button = (
            <button
                {...restProps}
                ref={ref}
                className={className}
                disabled={disabled}
                type={type === 'submit' ? 'submit' : 'button'}
                onClick={handleClick}
            />
        );

        if (!needsOverlay) {
            return button;
        }

        return (
            <HapticOverlay
                onTap={(event) => onClick?.(event as unknown as MouseEvent<HTMLButtonElement>)}
            >
                {button}
            </HapticOverlay>
        );
    },
);

HapticButton.displayName = 'HapticButton';
