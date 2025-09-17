import React, { type FC, useEffect, useMemo, useRef } from 'react';
import cn from 'classnames';
import noUiSlider, { API } from 'nouislider';

import { useSliderMarkers } from './hooks';
import { createPipsConfig } from './utils';

import styles from './index.module.css';

type SubRange = number | [number] | [number, number];
type RangeOptions = {
    min: SubRange;
    max: SubRange;
    [key: string]: SubRange;
};

type PipsType = -1 | 0 | 1 | 2;

type Pips = {
    mode: 'range' | 'steps' | 'positions' | 'count' | 'values';
    values: number | number[];
    filter?: (value: number, type: PipsType) => PipsType;
    format?: {
        to: (value: number) => string | number;
        from?: (value: string) => number | false;
    };
    stepped?: boolean;
};

export type SliderProps = {
    /**
     * Мин. допустимое число
     */
    min?: number;

    /**
     * Макс. допустимое число
     */
    max?: number;

    /**
     * Шаг (должен нацело делить отрезок между мин и макс)
     */
    step?: number;

    /**
     * Отображение подписей
     * https://refreshless.com/nouislider/pips/
     */
    pips?: Pips;

    /**
     * Настройка шагов
     * https://refreshless.com/nouislider/pips/#section-range
     */
    range?: RangeOptions;

    /**
     * Флаг точной привязки к range
     * https://refreshless.com/nouislider/examples/#section-skipping
     */
    snap?: boolean;

    /**
     * Значение слайдера
     */
    value?: number;

    /**
     * Второе значение слайдера (значение второго ползунка)
     * если передать ValueTo, то слайдер будет работать как range
     */
    valueTo?: number;

    /**
     * Заблокированное состояние
     */
    disabled?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Поведение ползунка
     */
    behaviour?: 'unconstrained-tap' | 'tap';

    /**
     * Размер
     * @description s, m deprecated, используйте вместо них 2, 4 соответственно
     */
    size?: 's' | 'm' | 2 | 4;

    /**
     * Включение/отключение отображения точек на слайдере
     * @default false
     */
    dots?: boolean;

    /**
     * Тип отображения точек на слайдере: 'step' - по шагу, 'custom' - произвольные
     * @default 'step'
     */
    dotsSlider?: 'step' | 'custom';

    /**
     * Массив значений для произвольного размещения точек
     */
    customDots?: number[];

    /**
     * Включение/отключение отображения чисел под точками
     * Действует на все точки кроме dotsSlider
     * @default true
     */
    showNumbers?: boolean;

    /**
     * Скрытие чисел только для кастомных точек
     * При hideCustomDotsNumbers=true числа скрываются только у customDots, остальные числа остаются видимыми
     * @default false
     */
    hideCustomDotsNumbers?: boolean;

    /**
     * Обработчик поля ввода
     */
    onChange?: (payload: { value: number; valueTo?: number }) => void;

    /**
     * @deprecated
     * Обработчик начала перетаскивания ползунка
     */
    onStart?: () => void;

    /**
     * Обработчик окончания перетаскивания ползунка
     * @description https://refreshless.com/nouislider/events-callbacks/#section-change
     */
    onEnd?: () => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const SIZE_TO_CLASSNAME_MAP = {
    s: 'size-2',
    m: 'size-4',
    2: 'size-2',
    4: 'size-4',
};

export const Slider: FC<SliderProps> = ({
    min = 0,
    max = 100,
    step = 1,
    value = 0,
    valueTo,
    disabled,
    pips,
    behaviour = 'tap',
    range = { min, max },
    size = 2,
    dots = false,
    dotsSlider = 'step',
    customDots,
    showNumbers = false,
    hideCustomDotsNumbers = false,
    className,
    onChange,
    onStart,
    onEnd,
    dataTestId,
    snap = false,
}) => {
    const sliderRef = useRef<(HTMLDivElement & { noUiSlider: API }) | null>(null);
    const busyRef = useRef<boolean>(false);
    const hasValueTo = valueTo !== undefined;

    const getSlider = () => sliderRef.current?.noUiSlider;

    const shouldCreatePipsConfig = pips || customDots?.length;

    const pipsConfig = useMemo(() => {
        if (!shouldCreatePipsConfig) {
            return undefined;
        }

        const configParams = {
            dotsSlider,
            customDots: dotsSlider === 'custom' ? customDots : undefined,
            showNumbers,
            hideCustomDotsNumbers: dotsSlider === 'custom' ? hideCustomDotsNumbers : undefined,
            pips,
            min,
            max,
            step,
        };

        return createPipsConfig(configParams);
    }, [
        shouldCreatePipsConfig,
        dotsSlider,
        customDots,
        showNumbers,
        hideCustomDotsNumbers,
        pips,
        min,
        max,
        step,
    ]);

    const { updateMarkersState, createSlideHandler } = useSliderMarkers({
        sliderRef,
        hasValueTo,
        value,
        valueTo,
        min,
        max,
        onChange,
    });

    useEffect(() => {
        if (!sliderRef.current) return;

        const slider = noUiSlider.create(sliderRef.current, {
            start: valueTo ? [value, valueTo] : value,
            connect: valueTo ? true : [true, false],
            behaviour,
            step,
            pips: pipsConfig,
            range,
            snap,
        });

        // eslint-disable-next-line consistent-return
        return () => slider.destroy();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const slider = getSlider();

        if (!slider) return;

        slider.on('start', () => {
            busyRef.current = true;
            onStart?.();
        });

        slider.on('change', () => {
            busyRef.current = false;
            onEnd?.();
        });

        // eslint-disable-next-line consistent-return
        return () => {
            slider.off('start');
            slider.off('change');
        };
    }, [onStart, onEnd]);

    useEffect(() => {
        const slider = getSlider();

        if (!slider) return;

        slider.updateOptions(
            {
                step,
                range,
                pips: pipsConfig,
                snap,
            },
            true,
        );
    }, [pipsConfig, range, snap, step]);

    useEffect(() => {
        const slider = getSlider();

        // Пропускаем обновление, если происходит взаимодействие со слайдером
        if (slider && busyRef.current === false) {
            if (valueTo) {
                slider.set([value, valueTo], false);
            } else {
                slider.set(value, false);
            }
        }
    }, [value, valueTo]);

    useEffect(() => {
        const slider = getSlider();

        if (!slider) return;

        const handler = createSlideHandler(slider);

        slider.off('slide');
        slider.on('slide', handler);

        if (hasValueTo) {
            updateMarkersState(value, valueTo);
        } else {
            updateMarkersState(value);
        }
    }, [onChange, hasValueTo, value, valueTo, createSlideHandler, updateMarkersState]);

    // todo: переделать логику отображения цифр и точек
    return (
        <div
            className={cn(styles.component, className, styles[SIZE_TO_CLASSNAME_MAP[size]], {
                [styles.dotsDisabled]: !dots,
                // [styles.numbersDisabled]: dots && dotsSlider === 'custom' && !customDots?.length,
            })}
            ref={sliderRef}
            data-test-id={dataTestId}
            {...{ disabled }}
        />
    );
};
