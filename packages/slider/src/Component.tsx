import React, { FC, useEffect, useRef } from 'react';
import cn from 'classnames';
import noUiSlider, { API, Options } from 'nouislider';

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
     * Значение инпута
     */
    value?: number;

    /**
     * Значение инпута
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
     */
    size?: 's' | 'm';

    /**
     * Обработчик поля ввода
     */
    onChange?: (payload: { value: number; valueTo?: number }) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
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
    size = 's',
    className,
    onChange,
    dataTestId,
}) => {
    const sliderRef = useRef<HTMLDivElement & { noUiSlider: API }>(null);
    const busyRef = useRef<boolean>(false);
    const hasNotValueTo = valueTo === undefined;

    const getSlider = () => sliderRef.current?.noUiSlider;

    useEffect(() => {
        if (!sliderRef.current) return;

        const slider = noUiSlider.create(sliderRef.current, {
            start: valueTo ? [value, valueTo] : value,
            connect: valueTo ? true : [true, false],
            behaviour,
            step,
            pips: pips as Options['pips'],
            range,
        });

        slider.on('start', () => {
            busyRef.current = true;
        });

        slider.on('change', () => {
            busyRef.current = false;
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const slider = getSlider();

        if (!slider) return;

        slider.updateOptions(
            {
                step,
                range,
                pips: pips as Options['pips'],
            },
            true,
        );
    }, [pips, range, step]);

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

        const handler = () => {
            if (onChange) {
                if (hasNotValueTo) {
                    onChange({ value: Number(slider.get()) });
                } else {
                    const sliderValues = slider.get() as string[];
                    const from = Number(sliderValues[0]);
                    const to = Number(sliderValues[1]);

                    if (from <= to) {
                        onChange({ value: from, valueTo: to });
                    } else {
                        onChange({ value: to, valueTo: from });
                    }
                }
            }
        };

        slider.off('slide');
        slider.on('slide', handler);
    }, [onChange, hasNotValueTo]);

    return (
        <div
            className={cn(styles.component, className, styles[size])}
            ref={sliderRef}
            data-test-id={dataTestId}
            {...{ disabled }}
        />
    );
};
