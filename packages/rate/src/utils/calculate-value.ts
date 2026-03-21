/**
 * Вычисляет значение рейтинга на основе клика по элементу
 *
 * @param index - индекс элемента (0-based)
 * @param isHalf - клик по левой половине (для половинчатых значений)
 * @param allowHalf - разрешены ли половинчатые значения
 * @returns вычисленное значение рейтинга
 */
export function calculateValue(index: number, isHalf: boolean, allowHalf: boolean): number {
    if (allowHalf && isHalf) {
        return index + 0.5;
    }
    return index + 1;
}

/**
 * Определяет, является ли элемент активным (заполненным)
 *
 * @param itemIndex - индекс текущего элемента (0-based)
 * @param value - текущее значение рейтинга
 * @returns статус активности и заполненности половины
 */
export function getItemState(itemIndex: number, value: number): {
    isActive: boolean;
    isHalfActive: boolean;
} {
    const itemValue = itemIndex + 1;
    const isActive = value >= itemValue;
    const isHalfActive = !isActive && value > itemIndex;

    return { isActive, isHalfActive };
}

/**
 * Нормализует значение рейтинга в допустимых пределах
 *
 * @param value - значение для нормализации
 * @param count - количество элементов
 * @param allowHalf - разрешены ли половинчатые значения
 * @returns нормализованное значение
 */
export function normalizeValue(value: number, count: number, allowHalf: boolean): number {
    if (isNaN(value) || value < 0) {
        return 0;
    }

    const maxValue = count;
    const normalized = Math.min(value, maxValue);

    if (allowHalf) {
        // Округляем до ближайших 0.5
        return Math.round(normalized * 2) / 2;
    }

    return Math.floor(normalized);
}
