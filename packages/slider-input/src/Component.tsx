import React, {
    type ChangeEvent,
    cloneElement,
    type ComponentType,
    type FocusEvent,
    forwardRef,
    Fragment,
    isValidElement,
    type ReactNode,
    useCallback,
} from 'react';
import cn from 'classnames';

import { Input as DefaultInput, type InputProps } from '@alfalab/core-components-input';
import { Slider, type SliderProps } from '@alfalab/core-components-slider';

import { type OnChangeType, type OnInputChangeType } from './types/propTypes';

import styles from './index.module.css';

export type SliderInputProps = Omit<
    InputProps,
    'min' | 'max' | 'step' | 'value' | 'type' | 'onChange' | 'bottomAddons' | 'size'
> & {
    /**
     * Размер компонента
     * @description s, m, l, xl deprecated, используйте вместо них 48, 56, 64, 72 соответственно
     */
    size?: Exclude<InputProps['size'], 40>;

    /**
     * Мин. допустимое число
     */
    min?: number;

    /**
     * Макс. допустимое число
     */
    max?: number;

    /**
     * Предотвращает ввод числа если оно больше или меньше допустимого.
     * При событии blur установится число по верхней границе, если оно больше допустимого, и наоборот - по нижней границе, если число меньше допустимого.
     * @default false
     * @deprecated Обработайте установку лимитов самостоятельно в событии onBlur. Пропс будет удален в версии core-components@49.0
     */
    lockLimit?: boolean;

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
    Input?: ComponentType<Omit<InputProps, 'onChange' | 'value'>>;

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
    onChange?: OnChangeType;

    /**
     * Обработчик ввода
     */
    onInputChange?: OnInputChangeType;

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

const SIZE_TO_CLASSNAME_MAP = {
    s: 'size-48',
    m: 'size-56',
    l: 'size-64',
    xl: 'size-72',
    48: 'size-48',
    56: 'size-56',
    64: 'size-64',
    72: 'size-72',
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
            lockLimit = false,
            block,
            steps = [],
            sliderValue = +value,
            size = 48,
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

        const handleInputBlur = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                const { value: inputValue } = event.target as HTMLInputElement;
                const validValue = getValidInputValue(inputValue);

                const getEventPayloadValue = (payload: number | '') => {
                    if (payload > max) {
                        return max;
                    }

                    if (payload < min) {
                        return min;
                    }

                    return '';
                };

                if (lockLimit) {
                    if (onChange) {
                        onChange(null, {
                            value: getEventPayloadValue(validValue),
                        });
                    }
                    if (onInputChange) {
                        onInputChange(null, {
                            value: getEventPayloadValue(validValue),
                        });
                    }
                }

                if (restProps.onBlur) {
                    restProps.onBlur(event);
                }
            },
            [getValidInputValue, lockLimit, max, min, onChange, onInputChange, restProps],
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
                    styles[SIZE_TO_CLASSNAME_MAP[size]],
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
                    onBlur={handleInputBlur}
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
                        styles[SIZE_TO_CLASSNAME_MAP[size]],
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
                                    styles[SIZE_TO_CLASSNAME_MAP[size]],
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

SliderInput.displayName = 'SliderInput';
