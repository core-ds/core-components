import { type PipsFormat } from '../../types';

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
}: PipsFormat) => ({
    to: (value: number): string | number => {
        if (!showNumbers) return '';

        const isCustom = customDots?.includes(value) ?? false;
        const isPips = pipsValues?.includes(value) ?? false;
        const isWhole = Number.isInteger(value);

        if (hideCustomDotsNumbers) {
            return isPips || (isWhole && !isCustom) ? value : '';
        }

        return isPips || isCustom || isWhole ? value : '';
    },
});
