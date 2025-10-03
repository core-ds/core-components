import { type Options } from 'nouislider';

import { type CreatePipsConfigParams } from '../../types';
import { createPipsFilter } from '../createPipsFilter';
import { createPipsFormat } from '../createPipsFormat';

type PipsConfig = (params: Omit<CreatePipsConfigParams, 'dotsSlider'>) => Options['pips'];

/**
 * Создает конфигурацию pips dotsSlider: 'step | custom' для noUiSlider
 *
 * @returns {Options['pips']} объект с полями:
 *   - mode: 'values' - режим отображения точек по значениям
 *   - values: number[] - объединенный и отсортированный массив значений из pips.values и customDots
 *   - filter: Function - функция фильтрации точек (из pips.filter или созданная через createPipsFilter)
 *   - format: Function - функция форматирования (из pips.format или созданный через createPipsFormat)
 *   - ...restPipsProps - остальные свойства из pips (например, stepped)
 */
export const config: Record<'step' | 'custom', PipsConfig> = {
    step: ({ pips, showNumbers }) => {
        if (!pips) return undefined;

        if (showNumbers) {
            return pips as Options['pips'];
        }

        const { format: providedFormat, ...rest } = pips;

        if (providedFormat) {
            return pips as Options['pips'];
        }

        return {
            ...rest,
            format: { to: () => '' },
        } as Options['pips'];
    },

    custom: (params: Omit<CreatePipsConfigParams, 'dotsSlider'>) => {
        const { pips, customDots, hideCustomDotsNumbers, showNumbers } = params;

        const { values, filter, format, ...restPipsProps } = pips || {};
        const pipsValues = Array.isArray(values) ? values : [];
        const pipsProps = { pipsValues, customDots, hideCustomDotsNumbers };
        const mergeValues = Array.from(new Set([...pipsValues, ...customDots])).sort(
            (a, b) => a - b,
        );

        return {
            ...restPipsProps,
            mode: 'values',
            values: mergeValues,
            filter:
                filter ||
                createPipsFilter({
                    mergeValues,
                    ...pipsProps,
                }),
            format:
                format ||
                createPipsFormat({
                    showNumbers,
                    ...pipsProps,
                }),
        } as Options['pips'];
    },
};

export const createPipsConfig = ({
    dotsSlider,
    ...restProps
}: CreatePipsConfigParams): Options['pips'] => config[dotsSlider]?.({ ...restProps });
