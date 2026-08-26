import React, {
    forwardRef,
    Fragment,
    type InputHTMLAttributes,
    type MouseEvent,
    useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';

import { useHaptic } from '../../hooks/use-haptic';
import { useIosHapticFallback } from '../../hooks/use-ios-haptic-fallback';
import { type HapticBaseProps } from '../../typings';
import { HapticFallback } from '../haptic-fallback';

import styles from './index.module.css';

type HapticInputProps = InputHTMLAttributes<HTMLInputElement> & HapticBaseProps;

/**
 * Компонент адаптер для поддержки haptic feedback `<input/>` элемента.
 *
 * @description
 *
 */
export const HapticInput = forwardRef<HTMLInputElement, HapticInputProps>(
    ({ 'data-haptic-preset': preset, onClick, ...restProps }, ref) => {
        const { trigger, enabled } = useHaptic({ preset });

        const fallback = useIosHapticFallback(
            enabled && preset !== undefined && !restProps.disabled,
        );
        const innerRef = useRef<HTMLInputElement>(null);

        const handleClick = (event: MouseEvent<HTMLInputElement>) => {
            onClick?.(event);

            if (event.defaultPrevented || preset === false) {
                return;
            }

            if (!fallback) {
                trigger();
            }
        };

        const input = (
            <input {...restProps} ref={mergeRefs([innerRef, ref])} onClick={handleClick} />
        );

        if (!fallback) {
            return input;
        }

        return (
            <Fragment>
                {input}
                <HapticFallback
                    className={styles.overlayLabelInline}
                    onTap={() => innerRef.current?.click()}
                />
            </Fragment>
        );
    },
);

HapticInput.displayName = 'HapticInput';
