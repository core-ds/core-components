import React, {
    AnimationEvent,
    ChangeEvent,
    ElementType,
    Fragment,
    HTMLAttributes,
    InputHTMLAttributes,
    MouseEvent,
    ReactNode,
    RefAttributes,
    useCallback,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { Badge } from '@alfalab/core-components-badge';
import { FormControlProps } from '@alfalab/core-components-form-control';
import { getDataTestId } from '@alfalab/core-components-shared';
import { useFocus } from '@alfalab/hooks';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import { ExclamationCircleMIcon } from '@alfalab/icons-glyph/ExclamationCircleMIcon';

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
     */
    size?: 's' | 'm' | 'l' | 'xl';

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
    type?: 'number' | 'card' | 'email' | 'money' | 'password' | 'tel' | 'text';

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

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
    (
        {
            size = 's',
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
        const uncontrolled = value === undefined;
        const readOnly = readOnlyProp || disableUserInput;

        const inputRef = useRef<HTMLInputElement>(null);

        const [focusVisible] = useFocus(inputRef, 'keyboard');

        const [focused, setFocused] = useState(restProps.autoFocus);
        const [stateValue, setStateValue] = useState(defaultValue || '');

        const filled = Boolean(uncontrolled ? stateValue : value);
        const [autofilled, setAutofilled] = useState(false);

        // отображаем крестик только для заполненного и активного инпута
        const clearButtonVisible = clear && filled && !disabled && !readOnly;
        const hasInnerLabel = label && labelView === 'inner';

        const handleInputFocus = useCallback(
            (event: React.FocusEvent<HTMLInputElement>) => {
                if (!readOnly) {
                    setFocused(true);
                }

                if (onFocus) {
                    onFocus(event);
                }
            },
            [onFocus, readOnly],
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
                if (onChange) {
                    onChange(event, { value: event.target.value });
                }

                if (uncontrolled) {
                    setStateValue(event.target.value);
                }
            },
            [onChange, uncontrolled],
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
                            />
                        )}
                        {rightAddons}
                        {error && (
                            <div className={styles.errorIcon} data-addon='error-icon'>
                                <Badge
                                    view='icon'
                                    size='m'
                                    iconColor='negative'
                                    content={
                                        <ExclamationCircleMIcon className={styles.errorColorIcon} />
                                    }
                                />
                            </div>
                        )}
                        {success && !error && (
                            <div className={styles.successIcon}>
                                <Badge
                                    view='icon'
                                    size='m'
                                    iconColor='positive'
                                    content={
                                        <CheckmarkCircleMIcon className={styles.successColorIcon} />
                                    }
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
                        colorCommonStyles[colors].input,
                        {
                            [colorCommonStyles[colors].disableUserInput]: disableUserInput,
                            [colorCommonStyles[colors].error]: error,
                            [styles[size]]: hasInnerLabel,
                            [styles.hasInnerLabel]: hasInnerLabel,
                            [colorCommonStyles[colors].hasInnerLabel]: hasInnerLabel,
                        },
                        inputClassName,
                    )}
                    disabled={disabled}
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    onChange={handleInputChange}
                    onAnimationStart={handleAnimationStart}
                    ref={mergeRefs([ref, inputRef])}
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
