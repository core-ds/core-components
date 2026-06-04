import React, { type ButtonHTMLAttributes, forwardRef, type MouseEvent } from 'react';

import { type HapticBaseProps } from '../../component';
import { useHaptic } from '../../hooks/use-haptic';

type HapticButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
    type?: 'button' | 'submit';
} & HapticBaseProps;

export const HapticButton = forwardRef<HTMLButtonElement, HapticButtonProps>(
    ({ 'data-haptic-preset': dataHapticPreset, onClick, type = 'button', ...restProps }, ref) => {
        const { trigger } = useHaptic({ dataHapticPreset });

        const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
            onClick?.(e);

            if (e.defaultPrevented) return;

            trigger();
        };

        return (
            <button
                {...restProps}
                ref={ref}
                type={type === 'submit' ? 'submit' : 'button'}
                onClick={handleClick}
            />
        );
    },
);

HapticButton.displayName = 'HapticButton';
