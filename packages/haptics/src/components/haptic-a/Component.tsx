import React, { type AnchorHTMLAttributes, forwardRef, type MouseEvent } from 'react';

import { useHaptic } from '../../hooks/use-haptic';
import { type HapticBaseProps } from '../../types';

type HapticAProps = AnchorHTMLAttributes<HTMLAnchorElement> & HapticBaseProps;

export const HapticA = forwardRef<HTMLAnchorElement, HapticAProps>(
    ({ 'data-haptic-preset': dataHapticPreset, onClick, ...restProps }, ref) => {
        const { trigger } = useHaptic({ preset: dataHapticPreset });

        const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
            onClick?.(event);

            if (event.defaultPrevented) return;

            trigger();
        };

        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-has-content, jsx-a11y/click-events-have-key-events
            <a {...restProps} ref={ref} onClick={handleClick} />
        );
    },
);

HapticA.displayName = 'HapticA';
