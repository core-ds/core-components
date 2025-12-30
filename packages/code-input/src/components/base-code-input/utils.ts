type ClampFocusIndexPayload = {
    values: string[];
    fields: number;
    requestedIndex: number;
};

/**
 * Возвращает индекс, на который разрешено поставить фокус при включенном `restrictFocus`
 */
export const clampFocusIndex = ({
    values,
    fields,
    requestedIndex,
}: ClampFocusIndexPayload): number => {
    const emptyIdx = values.indexOf('');
    const focusIdx = emptyIdx >= 0 ? emptyIdx : Math.min(values.length, fields - 1);

    return Math.min(requestedIndex, focusIdx);
};

/**
 * Синхронизирует выделение текста в инпуте после фокуса/клика.
 * В Safari корректное выделение работает только при асинхронном вызове
 */
export const syncSelection = (target: HTMLInputElement) => {
    requestAnimationFrame(() => {
        if (document.activeElement === target) {
            target.select();
        }
    });
};
