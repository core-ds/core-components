/**
 * Удаляет форматирование номера телефона
 * @param phone Номер телефона
 */

export const deleteFormatting = (phone: string) =>
    phone.replace('+', '').replace(/^7/, '').replace(/\s/g, '').replace(/-/g, '');

export function setCaretPosition({
    position,
    inputRef,
}: {
    position: number;
    inputRef: React.RefObject<HTMLInputElement>;
}) {
    window.requestAnimationFrame(() => {
        if (inputRef === null || !inputRef.current) return;

        inputRef.current.setSelectionRange(position, position);
    });
}

export function getInsertedNumber({
    rawValue,
    clearableCountryCode,
    countryPrefix,
    previousConformedValue,
}: {
    rawValue: string;
    clearableCountryCode: boolean;
    countryPrefix: string;
    previousConformedValue: string;
}) {
    if (!clearableCountryCode && previousConformedValue === countryPrefix) {
        if (rawValue.startsWith('7') || rawValue.startsWith('8')) {
            return rawValue;
        }

        return rawValue.slice(countryPrefix.length);
    }

    return rawValue;
}

export function deleteMaskChar(previousValue: string, rawValue: string) {
    const prevRawValueAsArr = deleteFormatting(rawValue).split('').reverse();
    let prevConformedCharIdx = previousValue.length - 1;
    let isMaskRemoved = false;
    const newRaw: string[] = [];

    prevRawValueAsArr.forEach((char) => {
        if (isMaskRemoved || char === previousValue[prevConformedCharIdx]) {
            newRaw.push(char);
            prevConformedCharIdx -= 1;
        } else if (char === '7') {
            isMaskRemoved = true;
        }
    });

    return newRaw.reverse().join('');
}
