import { type Options } from 'nouislider';

import { type Pips } from '../../types';

import { config } from './config';

interface CreatePipsConfigParams {
    /** Мин. допустимое число */
    min: number;

    /** Макс. допустимое число */
    max: number;

    /** Шаг (должен нацело делить отрезок между мин и макс) */
    step: number;

    /**
     * Тип отображения точек на слайдере: 'step' - по шагу, 'custom' - произвольные
     * @default 'step'
     */
    dotsSlider: 'step' | 'custom';

    /**
     * Включение/отключение отображения чисел под точками.
     * Действует на все точки кроме dotsSlider
     * @default true
     */
    showNumbers: boolean;

    /**
     * Скрытие чисел только для кастомных точек.
     * При hideCustomDotsNumbers=true числа скрываются только у customDots, остальные числа остаются видимыми
     * @default false
     */
    hideCustomDotsNumbers?: boolean;

    /**
     * Отображение подписей с values
     * https://refreshless.com/nouislider/pips/
     */
    pips?: Pips;

    /** Массив значений для произвольного размещения точек */
    customDots?: number[];
};

export const createPipsConfig = ({
    min,
    max,
    step,
    dotsSlider = 'step',
    showNumbers = true,
    hideCustomDotsNumbers = false,
    pips,
    customDots = [],
}: CreatePipsConfigParams): Options['pips'] => {
    if (pips && !customDots?.length) {
        return pips as Options['pips'];
    }

    return config[dotsSlider]?.({
        min,
        max,
        step,
        customDots,
        showNumbers,
        hideCustomDotsNumbers,
        pipsValues: pips && 'values' in pips && Array.isArray(pips.values) ? pips.values : [],
    });
};
