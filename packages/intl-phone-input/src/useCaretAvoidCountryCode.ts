import { type RefObject, useEffect } from 'react';

type Args = {
    inputRef: RefObject<HTMLInputElement>;
    countryCodeLength: number;
    clearableCountryCode: boolean;
};

export function useCaretAvoidCountryCode({
    inputRef,
    countryCodeLength,
    clearableCountryCode,
}: Args) {
    useEffect(() => {
        const input = inputRef.current;

        if (!input || clearableCountryCode) return;

        const moveCaretFromCountryCode = () => {
            const selectionStart = input.selectionStart || 0;

            if (selectionStart < countryCodeLength) {
                input.focus();
                input.setSelectionRange(countryCodeLength, countryCodeLength);
            }
        };

        const preventCaretMovingOnCountryCode = (event: KeyboardEvent) => {
            const selectionStart = input.selectionStart || 0;
            const toLeftKey = event.keyCode === 37;

            if (toLeftKey) {
                if (selectionStart <= countryCodeLength) {
                    event.preventDefault();
                }

                // Если нажали ctrl + arrowLeft, то восстанавливаем положение каретки.
                if (event.metaKey || event.ctrlKey) {
                    requestAnimationFrame(() => {
                        moveCaretFromCountryCode();
                    });
                }
            }
        };

        input.addEventListener('click', moveCaretFromCountryCode);
        input.addEventListener('keydown', preventCaretMovingOnCountryCode);

        // eslint-disable-next-line consistent-return
        return () => {
            input.removeEventListener('click', moveCaretFromCountryCode);
            input.removeEventListener('keydown', preventCaretMovingOnCountryCode);
        };
    }, [clearableCountryCode, countryCodeLength, inputRef]);
}
