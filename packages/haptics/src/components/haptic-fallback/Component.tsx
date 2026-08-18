import React, { forwardRef, type MouseEvent } from 'react';
import cn from 'classnames';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { ensureDOM, TICK_ID } from '../../utils';

import styles from './index.module.css';

export interface HapticFallbackProps {
    /**
     * Прямой tap по label, связанному с нативным switch.
     */
    onTap: (event: MouseEvent<HTMLLabelElement>) => void;

    /**
     * Класс для стилизации.
     */
    className?: string;
}

// ! todo: нашел возможность избавиться от этой обертки 

/**
 * Невидимый overlay, связанный с общим нативным Safari switch.
 */
export const HapticFallback = forwardRef<HTMLLabelElement, HapticFallbackProps>(
    ({ onTap, className }, ref) => {
        useLayoutEffect_SAFE_FOR_SSR(() => {
            // overlay для отрисовки tick на iOS
            ensureDOM();
        }, []);

        const handleClick = (e: MouseEvent<HTMLLabelElement>) => {
            e.stopPropagation();

            onTap(e);
        };

        return (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label
                ref={ref}
                htmlFor={TICK_ID}
                className={cn(className, styles.overlayLabel)}
                aria-hidden={true}
                onClick={handleClick}
            />
        );
    },
);

HapticFallback.displayName = 'HapticFallback';
