import React, { forwardRef } from 'react';

import { useHapticAdapter } from '../../hooks/use-haptic-adapter';
import { type HapticAProps } from '../../typings';
import { HapticFallback } from '../haptic-fallback';

import styles from '../haptic-fallback/index.module.css';

/** Компонент адаптер для поддержки haptic feedback `<a/>` элемента. */
export const HapticA = forwardRef<HTMLAnchorElement, HapticAProps>(
    ({ 'data-haptic-preset': preset, dataTestId, onClick, ...restProps }, ref) => {
        const {
            ref: mergedRef,
            fallback,
            handleClick,
            tap,
        } = useHapticAdapter({
            preset,
            onClick,
            ref,
        });

        const anchor = (
            /* eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
            <a
                {...restProps}
                ref={mergedRef}
                {...(dataTestId && { 'data-test-id': dataTestId })}
                onClick={handleClick}
            />
        );

        if (!fallback) {
            return anchor;
        }

        return (
            <span className={styles.wrapper}>
                {anchor}
                <HapticFallback dataTestId={dataTestId} onTap={tap} />
            </span>
        );
    },
);

HapticA.displayName = 'HapticA';
