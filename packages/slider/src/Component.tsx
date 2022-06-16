import React, { useRef, useEffect, FC } from 'react';
import cn from 'classnames';
import noUiSlider, { API, Options } from 'nouislider';

import styles from './index.module.css';

type SubRange = number | [number] | [number, number];
interface Range {
    min: SubRange;
    max: SubRange;
    [key: string]: SubRange;
}

type PipsType = -1 | 0 | 1 | 2;

type Pips = {
    mode: 'range' | 'steps' | 'positions' | 'count' | 'values';
    values: number | number[];
    filter?: (value: number, type: PipsType) => PipsType;
    format?: {
        to: (value: number) => string | number;
        from?: (value: string) => number | false;
    };
    density?: number;
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
    range?: Range;

    /**
     * Значение инпута
     */
    value?: number;

    /**
     * Заблокированное состояние
     */
    disabled?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Обработчик поля ввода
     */
    onChange?: (payload: { value: number }) => void;

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
    disabled,
    pips,
    range = { min, max },
    className,
    onChange,
    dataTestId,
}) => {
    const sliderRef = useRef<HTMLDivElement & { noUiSlider: API }>(null);
    const busyRef = useRef<boolean>(false);

    const getSlider = () => sliderRef.current?.noUiSlider;

    useEffect(() => {
        if (!sliderRef.current) return;

        const slider = noUiSlider.create(sliderRef.current, {
            start: [value],
            connect: [true, false],
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

        // Пропускаем обновление, если происходит взаимодействие со слайдером
        if (slider && busyRef.current === false) slider.set(value, false);
    }, [value]);

    useEffect(() => {
        const slider = getSlider();
        if (!slider) return;

        const newOptions = {
            step,
            pips: pips as Options['pips'],
            range,
        };

        slider.updateOptions(newOptions, true);
    }, [pips, range, step]);

    useEffect(() => {
        const slider = getSlider();
        if (!slider) return;

        slider.off('update.onChange');
        slider.on('update.onChange', () => {
            if (onChange && busyRef.current) {
                onChange({ value: Number(slider.get()) });
            }
        });
    }, [onChange]);

    return (
        <div
            className={cn(styles.component, className)}
            ref={sliderRef}
            data-test-id={dataTestId}
            {...{ disabled }}
        />
    );
};
