import React, { type AnchorHTMLAttributes, forwardRef, type MouseEvent } from 'react';

import { useHaptic } from '../../hooks/use-haptic';
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
        const { trigger, fallback } = useHaptic({ preset });

        const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
            onClick?.(event);

            if (event.defaultPrevented) return;

            trigger();
        };

        const anchor = (
            /* eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
            <a {...restProps} ref={ref} className={className} onClick={handleClick} />
        );

        if (!fallback) {
            return anchor;
        }

        return (
            <span className={styles.wrapper}>
                {anchor}
                <HapticFallback
                    onTap={(event) => onClick?.(event as unknown as MouseEvent<HTMLAnchorElement>)}
                />
            </span>
        );
    },
);

HapticA.displayName = 'HapticA';
