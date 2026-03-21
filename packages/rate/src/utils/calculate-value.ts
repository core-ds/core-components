/**
 * Нормализует значение рейтинга в допустимых пределах
 *
 * @param value - значение для нормализации
 * @param count - количество элементов
 * @returns нормализованное значение
 */
export function normalizeValue(value: number, count: number): number {
    if (isNaN(value) || value < 0) {
        return 0;
    }

    const maxValue = count;
    const normalized = Math.min(value, maxValue);

    return Math.floor(normalized);
}

/**
 * Определяет, является ли элемент активным (заполненным)
 *
 * @param itemIndex - индекс текущего элемента (0-based)
 * @param value - текущее значение рейтинга
 * @returns статус активности
 */
export function getItemState(itemIndex: number, value: number): boolean {
    const itemValue = itemIndex + 1;
    return value >= itemValue;
}
