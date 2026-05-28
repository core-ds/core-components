import { type PipsFormat } from '../../types';

/**
 * Создает format функцию для pips
 *
 * @description
 * - all: показывает метки для всех соответствующих точек
 * - pipsOnly: показывает метки только для значений pips
 * - customPipsOnly: показывает метки только для customDots
 * - none: скрывает все метки
 */
export const createPipsFormat = ({ customDots, pipsValues, pipsLabel }: PipsFormat) => ({
    to: (value: number): string | number => {
        if (pipsLabel === 'none') return '';

        const isCustom = customDots?.includes(value) ?? false;
        const isPips = pipsValues?.includes(value) ?? false;
        const isWhole = Number.isInteger(value);

        if (pipsLabel === 'pipsOnly') {
            return isPips ? value : '';
        }

        if (pipsLabel === 'customPipsOnly') {
            return isCustom ? value : '';
        }

        return isPips || isCustom || isWhole ? value : '';
    },
});
