type RangeValuesParams = {
    min: number;
    max: number;
    step: number;
    hasCustomDots?: boolean;
};

/**
 * Генерирует массив значений для слайдера
 *
 * @description
 * - При hasCustomDots=true генерирует только целые числа
 * - При hasCustomDots=false генерирует все значения по шагу
 * - Корректно обрабатывает дробные границы
 */
export const createRangeValues = ({
    min,
    max,
    step,
    hasCustomDots = false,
}: RangeValuesParams): number[] => {
    if (hasCustomDots) {
        return Array.from({ length: max - min + 1 }, (_, i) => min + i);
    }

    return Array.from(
        { length: Math.floor((max - min) / step) + 1 },
        (_, i) => min + i * step,
    );;
};
