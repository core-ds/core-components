import { type ForwardedRef, type MouseEvent, type MouseEventHandler, useRef } from 'react';
import mergeRefs from 'react-merge-refs';

import { type HapticPresetProp } from '../typings';
import { useHapticEnvironment } from '../utils';

import { useHaptic } from './use-haptic';

type UseHapticAdapterParams<E extends HTMLElement> = {
    preset?: HapticPresetProp;
    disabled?: boolean;
    onClick?: MouseEventHandler<E>;
    ref: ForwardedRef<E>;
};

/**
 * Хук адаптер для поддержки haptic feedback.
 *
 * @description
 * На клик запускает пресет из `data-haptic-preset`.
 * На iOS без Vibration API отдаёт `fallback`, чтобы тап ушёл в overlay и воспроизвёл системный tick.
 */
export const useHapticAdapter = <E extends HTMLElement>({
    preset,
    disabled,
    onClick,
    ref,
}: UseHapticAdapterParams<E>) => {
    const { trigger, enabled } = useHaptic({ preset });
    const { iosFallback } = useHapticEnvironment();
    const innerRef = useRef<E>(null);

    const fallback = enabled && preset !== undefined && !disabled && iosFallback;

    const handleClick = (event: MouseEvent<E>) => {
        onClick?.(event);

        if (event.defaultPrevented || fallback) return;

        trigger();
    };

    return {
        ref: mergeRefs([innerRef, ref]),
        fallback,
        handleClick,
        tap: () => innerRef.current?.click(),
    };
};
