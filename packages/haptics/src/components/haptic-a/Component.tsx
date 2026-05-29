import React, { type AnchorHTMLAttributes, forwardRef, type MouseEvent } from 'react';
import { type HapticPreset } from 'web-haptics';

import { useCoreConfig } from '@alfalab/core-components-config';

// import { type HapticPreset } from '../../types';
import { triggerHaptic } from '../../utils';

export type HapticAProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    'data-haptic-pattern'?: HapticPreset;
};

export const HapticA = forwardRef<HTMLAnchorElement, HapticAProps>(
    ({ 'data-haptic-pattern': hapticPattern = 'selection', onClick, ...restProps }, ref) => {
        const { haptics } = useCoreConfig();

        const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
            onClick?.(event);

            if (event.defaultPrevented) return;

            triggerHaptic(hapticPattern as HapticPreset, { enabled: haptics?.enabled });
        };

        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-has-content, jsx-a11y/click-events-have-key-events
            <a
                {...restProps}
                data-haptic='false'
                data-haptic-pattern={hapticPattern}
                ref={ref}
                onClick={handleClick}
            />
        );
    },
);

HapticA.displayName = 'HapticA';
