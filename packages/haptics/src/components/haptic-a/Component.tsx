import React, { type AnchorHTMLAttributes, forwardRef, type MouseEvent, useRef } from 'react';
import mergeRefs from 'react-merge-refs';

import { useHaptic } from '../../hooks/use-haptic';
import { useIosHapticFallback } from '../../hooks/use-ios-haptic-fallback';
import { type HapticBaseProps } from '../../typings';
import { HapticFallback } from '../haptic-fallback';

import styles from './index.module.css';

type HapticAProps = AnchorHTMLAttributes<HTMLAnchorElement> & HapticBaseProps;

/**
 * Компонент адаптер для поддержки haptic feedback `<a/>` элемента.
 *
 * @description
 *
 */
export const HapticA = forwardRef<HTMLAnchorElement, HapticAProps>(
    ({ 'data-haptic-preset': preset, onClick, className, ...restProps }, ref) => {
        const { trigger, enabled } = useHaptic({ preset });

        const fallback = useIosHapticFallback(enabled && preset !== undefined);
        const innerRef = useRef<HTMLAnchorElement>(null);

        const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
            onClick?.(event);

            if (event.defaultPrevented || preset === false) return;

            if (!fallback) {
                trigger();
            }
        };

        const anchor = (
            /* eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
            <a
                {...restProps}
                ref={mergeRefs([innerRef, ref])}
                className={className}
                onClick={handleClick}
            />
        );

        if (!fallback) {
            return anchor;
        }

        return (
            <span className={styles.wrapper}>
                {anchor}
                <HapticFallback onTap={() => innerRef.current?.click()} />
            </span>
        );
    },
);

HapticA.displayName = 'HapticA';
