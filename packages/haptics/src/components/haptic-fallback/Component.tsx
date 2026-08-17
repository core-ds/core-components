import React, { forwardRef, type MouseEvent } from 'react';

import styles from './index.module.css';

/**
 * Hack from https://github.com/WebKit/WebKit/pull/38473
 * Native Safari `<input type="checkbox" switch>` plays a system haptic on a real user tap.
 */
const SWITCH_TYPE = { switch: '' };

export interface HapticFallbackProps {
    /**
     * Прямой tap по нативному switch.
     */
    onTap: (event: MouseEvent<HTMLInputElement>) => void;

    /**
     * Класс для стилизации.
     */
    className?: string;
}

/**
 * Невидимый overlay с нативным Safari `<input type="checkbox" switch>`.
 */
export const HapticFallback = forwardRef<HTMLLabelElement, HapticFallbackProps>(
    ({ onTap, className }, ref) => {
        const handleClick = (e: MouseEvent<HTMLInputElement>) => {
            const { currentTarget } = e;

            e.stopPropagation();

            onTap(e);
            currentTarget.checked = false;
        };

        return (
            <label ref={ref} className={className ?? styles.overlayLabel} aria-hidden={true}>
                <input
                    {...SWITCH_TYPE}
                    type='checkbox'
                    className={styles.overlayInput}
                    tabIndex={-1}
                    onClick={handleClick}
                />
            </label>
        );
    },
);

HapticFallback.displayName = 'HapticFallback';
