import { isIOS } from '@alfalab/core-components-shared';

import { TICK_ID, VISUALLY_HIDDEN } from './constants';

/** Поддерживает ли окружение нативную вибрацию. */
export const isSupported =
    typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';

/**
 * Возвращает `true`, если устройство на iOS и нет `navigator.vibrate`.
 */
export const isIosFallback = !isSupported && isIOS();

type EnsureDOMProps = {
    label: HTMLLabelElement;
    input: HTMLInputElement;
};

/**
 * Возвращает общий скрытый `input[type=checkbox][switch]`, создавая его при необходимости.
 */
export const ensureDOM = (): EnsureDOMProps | null => {
    if (typeof document === 'undefined' || !document.body) return null;

    const existingInput = document.getElementById(TICK_ID);

    if (existingInput) {
        const label = existingInput.closest('label');

        if (existingInput.tagName === 'INPUT' && label) {
            return { label, input: existingInput as HTMLInputElement };
        }

        return null;
    }

    const input = document.createElement('input');

    Object.assign(input, {
        type: 'checkbox',
        switch: true,
        tabIndex: -1,
        id: TICK_ID,
        ariaHidden: 'true',
    });
    Object.assign(input.style, VISUALLY_HIDDEN);

    const label = document.createElement('label');

    Object.assign(label, {
        htmlFor: TICK_ID,
        ariaHidden: 'true',
    });
    Object.assign(label.style, VISUALLY_HIDDEN);
    label.appendChild(input);

    document.body.appendChild(label);

    return { label, input };
};
