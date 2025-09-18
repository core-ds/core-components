import { type Options } from 'nouislider';

import { createPipsFilter } from '../createPipsFilter';
import { createPipsFormat } from '../createPipsFormat';
import { createRangeValues } from '../createRangeValues';

type PipsConfigParams = {
    min: number;
    max: number;
    step: number;
    customDots: number[];
    showNumbers: boolean;
    hideCustomDotsNumbers: boolean;
    hideLargePips: boolean;
    pipsValues?: number[];
};

type PipsConfig = (params: PipsConfigParams) => Options['pips'];

/**
 * Конфигурации для различных типов отображения точек на слайдере
 *
 * @description
 * Содержит стратегии для создания конфигураций pips:
 * - `step` - отображение точек от `min` до `max` с шагом `step`
 * - `custom` - отображение кастомных точек с возможностью объединения с pips
 */
export const config: Record<'step' | 'custom', PipsConfig> = {
    // todo: как будто другие `mode` не учтены, мб не пробрасывать дефолтное значение чтобы починить эту логику?
    step: ({ min, max, step, showNumbers, hideLargePips }) =>
        ({
            mode: 'values',
            values: createRangeValues?.({ min, max, step }),
            format: createPipsFormat({ showNumbers, hideLargePips }),
        }) as Options['pips'],

    custom: ({ customDots, showNumbers, hideCustomDotsNumbers, hideLargePips, pipsValues }) => {
        if (customDots?.length && pipsValues?.length) {
            const mergeValues = Array.from(new Set([...pipsValues, ...customDots])).sort(
                (a, b) => a - b,
            );

            console.log('mergeValues:', mergeValues);

            return {
                mode: 'values',
                values: mergeValues,
                filter: createPipsFilter({
                    hideCustomDotsNumbers,
                    pipsValues,
                    customDots,
                    mergeValues,
                    hideLargePips,
                }),
                format: createPipsFormat({
                    pipsValues,
                    customDots,
                    showNumbers,
                    hideCustomDotsNumbers,
                }),
            } as Options['pips'];
        }

        return {
            mode: 'values',
            values: customDots,
            filter: createPipsFilter({
                customDots,
                hideCustomDotsNumbers,
                hideLargePips,
                pipsValues: [],
            }),
            format: createPipsFormat({
                customDots,
                showNumbers,
                hideCustomDotsNumbers,
                pipsValues: [],
            }),
        } as Options['pips'];
    },
} as const;
