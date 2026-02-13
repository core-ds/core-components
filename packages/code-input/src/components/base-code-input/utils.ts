/**
 * Парсит индекс из data-атрибута
 */
export const parseInputIdx = (el: HTMLElement | null): number | null => {
    const idx = Number(el?.dataset?.codeInputIndex);

    return Number.isNaN(idx) ? null : idx;
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
