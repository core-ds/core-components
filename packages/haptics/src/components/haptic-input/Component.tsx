import React, { forwardRef, Fragment } from 'react';

import { useHapticAdapter } from '../../hooks/use-haptic-adapter';
import { type HapticInputProps } from '../../typings';
import { HapticFallback } from '../haptic-fallback';

/** Компонент адаптер для поддержки haptic feedback `<input/>` элемента. */
export const HapticInput = forwardRef<HTMLInputElement, HapticInputProps>(
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

        const input = (
            <input
                {...restProps}
                ref={mergedRef}
                {...(dataTestId && { 'data-test-id': dataTestId })}
                onClick={handleClick}
            />
        );

        if (!fallback) {
            return input;
        }

        return (
            <Fragment>
                {input}
                <HapticFallback placement='origin' dataTestId={dataTestId} onTap={tap} />
            </Fragment>
        );
    },
);

HapticInput.displayName = 'HapticInput';
