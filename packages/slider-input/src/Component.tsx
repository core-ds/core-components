import React, {
    ChangeEvent,
    cloneElement,
    FC,
    forwardRef,
    Fragment,
    isValidElement,
    ReactNode,
    useCallback,
} from 'react';
import cn from 'classnames';

import { Input as DefaultInput, InputProps } from '@alfalab/core-components-input';
import { Slider, SliderProps } from '@alfalab/core-components-slider';

import styles from './index.module.css';

export type SliderInputProps = Omit<
    InputProps,
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
     * Массив подписей к слайдеру
     */
    steps?: ReactNode[];

    /**
     * Шаг (должен нацело делить отрезок между мин и макс)
     */
    step?: number;

    /**
     * Отображение подписей
     * https://refreshless.com/nouislider/pips/
     */
    pips?: SliderProps['pips'];

    /**
     * Настройка шагов
     * https://refreshless.com/nouislider/pips/#section-range
     */
    range?: SliderProps['range'];

    /**
     * Значение инпута
     */
    value?: number | string;

    /**
     * Значение слайдера
     */
    sliderValue?: number;

    /**
     * Дополнительная информация в правой части поля
     */
    info?: ReactNode;

    /**
     * Компонент поля ввода
     */
    Input?: FC<Omit<InputProps, 'onChange' | 'value'>>;

    /**
     * Кастомные пропсы для поля ввода
     */
    customInputProps?: Record<string, unknown>;

    /**
     * Класс для инпута
     */
    inputClassName?: string;

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
    onChange?: (
        event: ChangeEvent<HTMLInputElement> | null,
        payload: { value: number | '' },
    ) => void;

    /**
     * Обработчик ввода
     */
    onInputChange?: (event: ChangeEvent<HTMLInputElement>, payload: { value: number | '' }) => void;

    /**
     * Обработчик изменения слайдера
     */
    onSliderChange?: (payload: { value: number }) => void;

    /**
     * Обработчик начала перетаскивания ползунка
     */
    onSliderStart?: SliderProps['onStart'];

    /**
     * Обработчик окончания перетаскивания ползунка
     */
    onSliderEnd?: SliderProps['onEnd'];

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const SliderInput = forwardRef<HTMLInputElement, SliderInputProps>(
    (
        {
            className,
            inputClassName,
            sliderClassName,
            stepsClassName,
            focusedClassName,
            fieldClassName,
            value = '',
            min = 0,
            max = 100,
            step = 1,
            block,
            steps = [],
            sliderValue = +value,
            size = 's',
            label,
            info,
            disabled,
            readOnly,
            onChange,
            onInputChange,
            onSliderChange,
            onSliderStart,
            onSliderEnd,
            rightAddons,
            Input = DefaultInput,
            customInputProps = {},
            error,
            hint,
            pips,
            range,
            dataTestId,
            ...restProps
        },
        ref,
    ) => {
        const getValidInputValue = useCallback((inputValue: string | number) => {
            const number = parseInt(inputValue?.toString().replace(/\s/g, ''), 10);

            return inputValue === '' || Number.isNaN(number) ? '' : Math.abs(number);
        }, []);

        const handleSliderChange = useCallback(
            (payload: { value: number }) => {
                if (onChange) onChange(null, payload);
                if (onSliderChange) onSliderChange(payload);
            },
            [onChange, onSliderChange],
        );

        const handleInputChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>, payload: { value: string | number }) => {
                if (onChange) onChange(event, { value: getValidInputValue(payload.value) });
                if (onInputChange)
                    onInputChange(event, { value: getValidInputValue(payload.value) });
            },
            [getValidInputValue, onChange, onInputChange],
        );

        return (
            <div
                className={cn(
                    styles.component,
                    {
                        [styles.block]: block,
                        [styles.filled]: Boolean(value),
                        [styles.hasLabel]: label,
                        [styles.hasError]: Boolean(error),
                    },
                    styles[size],
                    className,
                )}
                data-test-id={dataTestId}
            >
                <Input
                    {...restProps}
                    {...customInputProps}
                    ref={ref}
                    value={value.toString()}
                    onChange={handleInputChange}
                    block={true}
                    size={size}
                    label={label}
                    disabled={disabled}
                    readOnly={readOnly}
                    className={cn(inputClassName, styles.input)}
                    focusedClassName={cn(focusedClassName, styles.focused)}
                    fieldClassName={cn(
                        fieldClassName,
                        styles.field,
                        { [styles.disabled]: disabled },
                        styles[size],
                    )}
                    inputMode='numeric'
                    pattern='[0-9]*'
                    error={error}
                    hint={hint}
                    bottomAddons={
                        !disabled && (
                            <Slider
                                min={min}
                                max={max}
                                step={step}
                                onStart={onSliderStart}
                                onEnd={onSliderEnd}
                                onChange={handleSliderChange}
                                value={
                                    Number.isNaN(sliderValue) || !sliderValue ? min : sliderValue
                                }
                                disabled={disabled || readOnly}
                                className={cn(
                                    styles.slider,
                                    styles[size],
                                    { [styles.hidePips]: error || hint },
                                    sliderClassName,
                                )}
                                pips={pips}
                                range={range}
                            />
                        )
                    }
                    rightAddons={
                        (info || rightAddons) && (
                            <Fragment>
                                {info && <span className={styles.info}>{info}</span>}
                                {rightAddons}
                            </Fragment>
                        )
                    }
                />
                {/* eslint-disable react/no-array-index-key */}
                {steps.length > 0 && !error && (
                    <div className={cn(styles.steps, stepsClassName)}>
                        {steps.map((stepLabel, i) =>
                            isValidElement(stepLabel) ? (
                                cloneElement(stepLabel, { key: i })
                            ) : (
                                <span key={i.toString()}>{stepLabel}</span>
                            ),
                        )}
                    </div>
                )}
            </div>
        );
    },
);
