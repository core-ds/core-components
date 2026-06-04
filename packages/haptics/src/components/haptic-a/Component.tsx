import React, { type AnchorHTMLAttributes, forwardRef, type MouseEvent } from 'react';

import { type HapticBaseProps } from '../../component';
import { useHaptic } from '../../hooks/use-haptic';

type HapticAProps = AnchorHTMLAttributes<HTMLAnchorElement> & HapticBaseProps;

export const HapticA = forwardRef<HTMLAnchorElement, HapticAProps>(
    ({ 'data-haptic-preset': dataHapticPreset, onClick, ...restProps }, ref) => {
        const { trigger } = useHaptic({ dataHapticPreset });

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
