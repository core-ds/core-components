import React, { type ButtonHTMLAttributes, forwardRef, type MouseEvent } from 'react';

import { useHaptic } from '../../hooks/use-haptic';
import { type HapticBaseProps } from '../../typings';
import { HapticFallback } from '../haptic-fallback';

import styles from './index.module.css';

type HapticButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
    type?: 'button' | 'submit';
} & HapticBaseProps;

/**
 * Компонент адаптер для поддержки haptic feedback `<button/>` элемента.
 *
 * @description
 *
 */
export const HapticButton = forwardRef<HTMLButtonElement, HapticButtonProps>(
    ({ 'data-haptic-preset': preset, onClick, type = 'button', className, ...restProps }, ref) => {
        const { trigger, fallback } = useHaptic({ preset });

        const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
            onClick?.(event);

            if (event.defaultPrevented || preset === false) return;

            trigger();
        };

        const button = (
            <button
                {...restProps}
                ref={ref}
                className={className}
                type={type === 'submit' ? 'submit' : 'button'}
                onClick={handleClick}
            />
        );

        if (!fallback) {
            return button;
        }

        return (
            <span className={styles.wrapper}>
                {button}
                <HapticFallback
                    onTap={(event) => onClick?.(event as unknown as MouseEvent<HTMLButtonElement>)}
                />
            </span>
        );
    },
);

HapticButton.displayName = 'HapticButton';
