import React, { forwardRef } from 'react';

import { useHapticAdapter } from '../../hooks/use-haptic-adapter';
import { type HapticButtonProps } from '../../typings';
import { HapticFallback } from '../haptic-fallback';

import styles from '../haptic-fallback/index.module.css';

/** Компонент адаптер для поддержки haptic feedback `<button/>` элемента. */
export const HapticButton = forwardRef<HTMLButtonElement, HapticButtonProps>(
    ({ 'data-haptic-preset': preset, dataTestId, onClick, ...restProps }, ref) => {
        const {
            ref: mergedRef,
            fallback,
            handleClick,
            tap,
        } = useHapticAdapter({
            preset,
            disabled: restProps.disabled,
            onClick,
            ref,
        });

        const button = (
            // eslint-disable-next-line react/button-has-type
            <button
                {...restProps}
                ref={mergedRef}
                {...(dataTestId && { 'data-test-id': dataTestId })}
                onClick={handleClick}
            />
        );

        if (!fallback) {
            return button;
        }

        return (
            <span className={styles.wrapper}>
                {button}
                <HapticFallback dataTestId={dataTestId} onTap={tap} />
            </span>
        );
    },
);

HapticButton.displayName = 'HapticButton';
