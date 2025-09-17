type CreatePipsFormatParams = {
    showNumbers: boolean;
    hideCustomDotsNumbers: boolean;
    customDots?: number[];
    pipsValues?: number[];
};

/**
 * Создает format функцию для pips
 * @description
 * - Для кастомных точек всегда показывает значение (если showNumbers=true и hideCustomDotsNumbers={false)
 * - Для обычных значений показывает только целые числа (если showNumbers=true)
 * - Для дробных чисел возвращает пустую строку
 * - Если showNumbers=false, возвращает пустую строку для всех значений
 * - Если hideCustomDotsNumbers=true, скрывает числа только для кастомных точек
 */
export const createPipsFormat = ({
    customDots,
    showNumbers,
    hideCustomDotsNumbers,
    pipsValues,
}: CreatePipsFormatParams) => ({
    to: (value: number): string | number => {
        if (!showNumbers) return '';

        const isCustom = customDots?.includes(value) ?? false;
        const isPips = pipsValues?.includes(value) ?? false;
        const isWhole = Number.isInteger(value);

        // Если есть объединение с pips
        if (pipsValues?.length) {
            if (isPips) return value;
            if (isCustom) return hideCustomDotsNumbers ? '' : value;

            return isWhole ? value : '';
        }

        // Если есть кастомные точки без объединения
        if (customDots?.length) {
            if (isCustom) return hideCustomDotsNumbers ? '' : value;

            return isWhole ? value : '';
        }

        // Для обычных случаев всегда показываем числа
        return value;
    },
});
