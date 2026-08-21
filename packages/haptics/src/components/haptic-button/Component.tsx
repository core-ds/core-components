import React, { type ButtonHTMLAttributes, forwardRef, type MouseEvent, useRef } from 'react';
import mergeRefs from 'react-merge-refs';

import { useHaptic } from '../../hooks/use-haptic';
import { useIosHapticFallback } from '../../hooks/use-ios-haptic-fallback';
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
        const { trigger, enabled } = useHaptic({ preset });

        const fallback = useIosHapticFallback(
            enabled && preset !== undefined && !restProps.disabled,
        );
        const innerRef = useRef<HTMLButtonElement>(null);

        const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
            onClick?.(event);

            if (event.defaultPrevented || preset === false) return;

            if (!fallback) {
                trigger();
            }
        };

        const button = (
            <button
                {...restProps}
                ref={mergeRefs([innerRef, ref])}
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
                <HapticFallback onTap={() => innerRef.current?.click()} />
            </span>
        );
    },
);

HapticButton.displayName = 'HapticButton';
