import React, {
    forwardRef,
    useCallback,
    ChangeEvent,
    ReactNode,
    isValidElement,
    cloneElement,
    InputHTMLAttributes,
} from 'react';
import cn from 'classnames';
import { Slider } from '@alfalab/core-components-slider';

import styles from './index.module.css';

export type SliderPickerProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'min' | 'max' | 'step' | 'value' | 'type' | 'onChange' | 'bottomAddons'
> & {
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
     * Массив подписей к слайдеру
     */
    steps?: ReactNode[];

    /**
     * Значение слайдера
     */
    value?: number;

    /**
     * Класс для слайдера
     */
    sliderClassName?: string;

    /**
     * Класс для шагов
     */
    stepsClassName?: string;

    /**
     * Обработчик изменения значения через слайдер или поле ввода
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>, payload: { value: number }) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const SliderPicker = forwardRef<HTMLInputElement, SliderPickerProps>(
    (
        {
            className,
            sliderClassName,
            stepsClassName,
            min = 0,
            max = 100,
            step = 1,
            value = min,
            steps = [],
            disabled,
            readOnly,
            onChange,
            dataTestId,
        },
        ref,
    ) => {
        const handleSliderChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>, payload) => {
                if (onChange) onChange(event, payload);
            },
            [onChange],
        );

        return (
            <div className={cn(styles.component, className)} data-test-id={dataTestId}>
                <Slider
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleSliderChange}
                    ref={ref}
                    value={value}
                    disabled={disabled || readOnly}
                    className={cn(styles.slider, sliderClassName)}
                />
                {steps.length > 0 && (
                    <div className={cn(styles.steps, stepsClassName)}>
                        {steps.map((stepLabel, i) =>
                            isValidElement(stepLabel) ? (
                                cloneElement(stepLabel, { key: i })
                            ) : (
                                // eslint-disable-next-line react/no-array-index-key
                                <span key={i}>{stepLabel}</span>
                            ),
                        )}
                    </div>
                )}
            </div>
        );
    },
);

/**
 * Для отображения в сторибуке
 */
SliderPicker.defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    steps: [],
};
