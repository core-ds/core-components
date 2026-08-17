import React, { type AnchorHTMLAttributes, forwardRef, type MouseEvent } from 'react';

import { useHaptic } from '../../hooks/use-haptic';
import { type HapticBaseProps } from '../../typings';
import { HapticOverlay } from '../haptic-overlay';

type HapticAProps = AnchorHTMLAttributes<HTMLAnchorElement> & HapticBaseProps;

export const HapticA = forwardRef<HTMLAnchorElement, HapticAProps>(
    ({ 'data-haptic-preset': preset, onClick, className, ...restProps }, ref) => {
        const disabled = Boolean((restProps as { disabled?: boolean }).disabled);

        const { trigger, needsOverlay } = useHaptic({ preset, disabled });

        const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
            onClick?.(event);

            if (event.defaultPrevented) return;

            trigger();
        };

        const anchor = (
            /* eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
            <a {...restProps} ref={ref} className={className} onClick={handleClick} />
        );

        if (!needsOverlay) {
            return anchor;
        }

        return (
            <HapticOverlay
                onTap={(event) => onClick?.(event as unknown as MouseEvent<HTMLAnchorElement>)}
            >
                {anchor}
            </HapticOverlay>
        );
    },
);

HapticA.displayName = 'HapticA';
