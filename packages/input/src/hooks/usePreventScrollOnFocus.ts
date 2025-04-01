import { type RefObject, useEffect, useRef } from 'react';

import { fnUtils, os } from '@alfalab/core-components-shared';

import { findScrollableParent } from '../helpers/findScrollableParent';
import { isInput } from '../helpers/isInput';

import { useVirtualKeyboard } from './useVirtualKeyboard';

export function usePreventViewportScrollOnFocus<
    T extends HTMLInputElement | HTMLTextAreaElement,
>(): RefObject<T> {
    const inputRef = useRef<T>(null);
    const { keyboardIsOpen } = useVirtualKeyboard();
    const originalContainerHeightRef = useRef('');
    const originalContainerScrollRef = useRef(0);

    useEffect(() => {
        if (!os.isIOS() || !inputRef.current) {
            return fnUtils.noop;
        }

        const input = inputRef.current;

        // Хак для того, чтобы предотвратить смещение visual viewport появившейся клавиатурой
        const handleFocus = () => {
            input.style.opacity = '0';

            requestAnimationFrame(() => {
                input.style.transition = 'opacity 0.1s';
                input.style.opacity = '1';
            });
        };

        const handleBlur = () => {
            input.style.opacity = '';
            input.style.transition = '';
        };

        input.addEventListener('focus', handleFocus, true);
        input.addEventListener('blur', handleBlur, true);

        return () => {
            input.removeEventListener('focus', handleFocus, true);
            input.removeEventListener('blur', handleBlur, true);
        };
    }, []);

    useEffect(() => {
        if (!window?.visualViewport || !inputRef.current) return fnUtils.noop;

        const input = inputRef.current;
        const focusedElement = document.activeElement;
        let scrollableParent: null | HTMLElement = null;

        if (keyboardIsOpen && isInput(focusedElement) && focusedElement === input) {
            const { height: visualViewportHeight } = window.visualViewport;

            scrollableParent = findScrollableParent(focusedElement) as HTMLElement;

            originalContainerHeightRef.current = scrollableParent.style.height || '';
            originalContainerScrollRef.current = scrollableParent.scrollTop ?? 0;

            scrollableParent.style.height = `${visualViewportHeight}px`;
            input.scrollIntoView({
                block: 'center',
                behavior: 'instant' as unknown as ScrollBehavior, // в проекте используется старая версия typescript, которая не знает про "instant"
            });
        }

        return () => {
            if (keyboardIsOpen && scrollableParent) {
                scrollableParent.style.height = originalContainerHeightRef.current ?? '';
                scrollableParent.scrollTop = originalContainerScrollRef.current;
            }
        };
    }, [keyboardIsOpen]);

    return inputRef;
}
