import React, {
    AnimationEvent,
    ChangeEvent,
    ElementType,
    Fragment,
    HTMLAttributes,
    InputHTMLAttributes,
    KeyboardEvent,
    MouseEvent,
    ReactNode,
    RefAttributes,
    useCallback,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { FormControlProps } from '@alfalab/core-components-form-control';
import { getDataTestId } from '@alfalab/core-components-shared';
import { StatusBadge } from '@alfalab/core-components-status-badge';
import { useFocus, useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { usePreventViewportScrollOnFocus } from '../../hooks/usePreventScrollOnFocus';
import { ClearButton } from '../clear-button';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorCommonStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type BaseInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | 'size'
    | 'type'
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'onClick'
    | 'onMouseDown'
    | 'enterKeyHint'
> & {
    /**
     * Значение поля ввода
     */
    value?: string;

    /**
     * Начальное значение поля
     */
    defaultValue?: string;

    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;

    /**
     * Крестик для очистки поля
     */
    clear?: boolean;

    /**
     * Размер компонента
     * @description s, m, l, xl deprecated, используйте вместо них 48, 56, 64, 72 соответственно
     */
    size?: 's' | 'm' | 'l' | 'xl' | 40 | 48 | 56 | 64 | 72;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;

    /**
     * Отображение иконки успеха
     */
    success?: boolean;

    /**
     * Текст подсказки
     */
    hint?: ReactNode;

    /**
     * Лейбл компонента
     */
    label?: React.ReactNode;

    /**
     * Вид лейбла внутри / снаружи
     */
    labelView?: 'inner' | 'outer';

    /**
     * Атрибут type
     */
    type?: 'number' | 'email' | 'money' | 'password' | 'tel' | 'text';

    /**
     * Ref для обертки input
     */
    wrapperRef?: React.Ref<HTMLDivElement> | null;

    /**
     * Слот слева
     */
    leftAddons?: React.ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: React.ReactNode;

    /**
     * Свойства для обертки левых аддонов
     */
    leftAddonsProps?: HTMLAttributes<HTMLDivElement>;

    /**
     * Свойства для обертки правых аддонов
     */
    rightAddonsProps?: HTMLAttributes<HTMLDivElement>;

    /**
     * Слот под инпутом
     */
    bottomAddons?: React.ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для поля
     */
    fieldClassName?: string;

    /**
     * Дополнительный класс инпута
     */
    inputClassName?: string;

    /**
     * Дополнительный класс для лейбла
     */
    labelClassName?: string;

    /**
     * Дополнительный класс для аддонов
     */
    addonsClassName?: string;

    /**
     * Класс, который будет установлен при фокусе
     */
    focusedClassName?: string;

    /**
     * Класс, который будет установлен, если в поле есть значение
     */
    filledClassName?: string;

    /**
     * Обработчик поля ввода
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>, payload: { value: string }) => void;

    /**
     * Обработчик нажатия на кнопку очистки
     */
    onClear?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Обработчик клика по полю
     */
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;

    /**
     * Обработчик MouseDown по полю
     */
    onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;

    /**
     * Обработчик MouseUp по полю
     */
    onMouseUp?: (event: MouseEvent<HTMLDivElement>) => void;

    /**
     * Компонент FormControl
     */
    FormControlComponent?: ElementType<FormControlProps & RefAttributes<HTMLDivElement>>;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Для FormControl используется модификатор -form-control
     */
    dataTestId?: string;

    /**
     * Запрещает ввод с клавиатуры
     */
    disableUserInput?: boolean;
};

const SIZE_TO_CLASSNAME_MAP = {
    s: 'size-48',
    m: 'size-56',
    l: 'size-64',
    xl: 'size-72',
    40: 'size-40',
    48: 'size-48',
    56: 'size-56',
    64: 'size-64',
    72: 'size-72',
};

const inputTypesForSelectionRange = ['password', 'search', 'tel', 'text', 'url'];

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
    (
        {
            size = 48,
            type = 'text',
            block = false,
            colors = 'default',
            bottomAddons,
            dataTestId,
            clear = false,
            disabled,
            error,
            success,
            hint,
            className,
            fieldClassName,
            inputClassName,
            labelClassName,
            addonsClassName,
            rightAddonsProps,
            leftAddonsProps,
            focusedClassName,
            filledClassName,
            label,
            labelView = 'inner',
            leftAddons,
            onFocus,
            onBlur,
            onChange,
            onClear,
            onClick,
            onMouseDown,
            onMouseUp,
            onAnimationStart,
            rightAddons,
            value,
            defaultValue,
            wrapperRef,
            readOnly: readOnlyProp,
            FormControlComponent,
            disableUserInput,
            ...restProps
        },
        ref,
    ) => {
        const { onKeyDown } = restProps;
        const uncontrolled = value === undefined;
        const readOnly = readOnlyProp || disableUserInput;

        const inputRef = useRef<HTMLInputElement>(null);

        const [focusVisible] = useFocus(inputRef, 'keyboard');

        const [focused, setFocused] = useState(restProps.autoFocus);
        const [stateValue, setStateValue] = useState(defaultValue || '');

        const filled = Boolean(uncontrolled ? stateValue : value);
        const [autofilled, setAutofilled] = useState(false);

        // отображаем крестик только для заполненного и активного инпута
        const clearButtonVisible = clear && filled && !disabled && !readOnlyProp;
        const hasInnerLabel = label && labelView === 'inner';

        useLayoutEffect_SAFE_FOR_SSR(() => {
            const input = inputRef.current;

            if (
                !restProps.autoFocus ||
                !input ||
                // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
                !inputTypesForSelectionRange.includes(input.type)
            ) {
                return;
            }

            // https://github.com/facebook/react/issues/14125
            input.setSelectionRange(input.value.length, input.value.length);
        }, []);

        const preventViewportScrollRef = usePreventViewportScrollOnFocus();

        const handleInputFocus = useCallback(
            (event: React.FocusEvent<HTMLInputElement>) => {
                if (!readOnlyProp || disableUserInput) {
                    setFocused(true);
                }

                if (onFocus) {
                    onFocus(event);
                }
            },
            [onFocus, readOnlyProp, disableUserInput],
        );

        const handleInputBlur = useCallback(
            (event: React.FocusEvent<HTMLInputElement>) => {
                setFocused(false);

                if (onBlur) {
                    onBlur(event);
                }
            },
            [onBlur],
        );

        const handleInputChange = useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                let inputValue = event.target.value;
                const target = event.target as HTMLInputElement;
                const isInputTypeNumber = target.getAttribute('type') === 'number';
                const pattern = /[eE]/g;

                if (isInputTypeNumber && pattern.test(inputValue)) {
                    inputValue = inputValue.replace(pattern, '');
                }

                if (onChange) {
                    onChange(event, { value: inputValue });
                }

                if (uncontrolled) {
                    setStateValue(inputValue);
                }
            },
            [onChange, uncontrolled],
        );

        const handleKeyDown = useCallback(
            (event: KeyboardEvent<HTMLInputElement>) => {
                /**
                 * По умолчанию в input[type=number] можно вводить числа типа 2e5 (200 000)
                 * Это ломает некоторое поведение, поэтому запрещаем ввод символов [eE]
                 * @see DS-6808
                 */
                const { key, target } = event;
                const eventTarget = target as HTMLInputElement;
                const isInputTypeNumber = eventTarget.getAttribute('type') === 'number';

                if (isInputTypeNumber && (key === 'e' || key === 'E')) {
                    event.preventDefault();

                    return;
                }

                if (onKeyDown) {
                    onKeyDown(event);
                }
            },
            [onKeyDown],
        );

        const handleClear = useCallback(
            (event: MouseEvent<HTMLButtonElement>) => {
                if (!clearButtonVisible) return;

                if (uncontrolled) {
                    setStateValue('');
                }

                if (onClear) {
                    onClear(event);
                }

                if (inputRef.current && !focused) {
                    inputRef.current.focus();
                }
            },
            [clearButtonVisible, focused, onClear, uncontrolled],
        );

        const handleAnimationStart = useCallback(
            (event: AnimationEvent<HTMLInputElement>) => {
                if (onAnimationStart) {
                    onAnimationStart(event);
                }

                setAutofilled(event.animationName.includes('start'));
            },
            [onAnimationStart],
        );

        const renderRightAddons = () => {
            const addonsVisible = clearButtonVisible || rightAddons || error || success;

            return (
                addonsVisible && (
                    <Fragment>
                        {clearButtonVisible && (
                            <ClearButton
                                onClick={handleClear}
                                disabled={disabled}
                                colors={colors}
                                dataTestId={getDataTestId(dataTestId, 'clear-icon')}
                                size={size}
                            />
                        )}
                        {rightAddons}
                        {error && (
                            <div
                                className={cn(styles.errorIcon, styles[`size-${size}`])}
                                data-addon='error-icon'
                            >
                                <StatusBadge
                                    view='negative-alert'
                                    size={size === 40 ? 16 : 20}
                                    dataTestId={getDataTestId(dataTestId, 'error-icon')}
                                />
                            </div>
                        )}
                        {success && !error && (
                            <div className={cn(styles.successIcon, styles[`size-${size}`])}>
                                <StatusBadge
                                    view='positive-checkmark'
                                    size={size === 40 ? 16 : 20}
                                    dataTestId={getDataTestId(dataTestId, 'success-icon')}
                                />
                            </div>
                        )}
                    </Fragment>
                )
            );
        };

        return FormControlComponent ? (
            <FormControlComponent
                ref={wrapperRef}
                className={cn(className, focused && focusedClassName, filled && filledClassName)}
                fieldClassName={cn(fieldClassName, {
                    [styles.focusVisible]: focusVisible,
                })}
                labelClassName={labelClassName}
                addonsClassName={addonsClassName}
                size={size}
                colors={colors}
                block={block}
                disabled={disabled}
                readOnly={readOnlyProp}
                filled={filled || autofilled || focused}
                focused={focused}
                error={error}
                label={label}
                labelView={labelView}
                hint={hint}
                leftAddons={leftAddons}
                rightAddons={renderRightAddons()}
                bottomAddons={bottomAddons}
                onClick={onClick}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                dataTestId={getDataTestId(dataTestId, 'form-control')}
                rightAddonsProps={rightAddonsProps}
                leftAddonsProps={leftAddonsProps}
            >
                <input
                    {...restProps}
                    className={cn(
                        styles.input,
                        styles[`size-${size}`],
                        colorCommonStyles[colors].input,
                        {
                            [styles.disableUserInput]: disableUserInput,
                            [colorCommonStyles[colors].disableUserInput]: disableUserInput,
                            [colorCommonStyles[colors].error]: error,
                            [styles[SIZE_TO_CLASSNAME_MAP[size]]]: hasInnerLabel,
                            [styles.hasInnerLabel]: hasInnerLabel,
                            [colorCommonStyles[colors].hasInnerLabel]: hasInnerLabel,
                        },
                        inputClassName,
                    )}
                    disabled={disabled}
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onAnimationStart={handleAnimationStart}
                    ref={mergeRefs([ref, inputRef, preventViewportScrollRef])}
                    type={type}
                    value={uncontrolled ? stateValue : value}
                    readOnly={readOnly}
                    data-test-id={dataTestId}
                    aria-label={typeof label === 'string' ? label : undefined}
                />
            </FormControlComponent>
        ) : null;
    },
);
