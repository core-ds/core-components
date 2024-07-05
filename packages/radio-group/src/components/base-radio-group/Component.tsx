import React, {
    ChangeEvent,
    Children,
    cloneElement,
    FocusEvent,
    forwardRef,
    isValidElement,
    MouseEvent,
    ReactElement,
    ReactNode,
    useState,
} from 'react';
import cn from 'classnames';

import { useDidUpdateEffect } from '@alfalab/hooks';

import commonStyles from './index.module.css';

export type Direction = 'horizontal' | 'vertical';
export type RadioGroupType = 'radio' | 'tag';

export type BaseRadioGroupProps = {
    /**
     * Заголовок группы
     */
    label?: ReactNode;

    /**
     * Направление
     */
    direction?: Direction;

    /**
     * Тип компонента
     */
    type?: RadioGroupType;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для списка радио элементов
     */
    radioListClassName?: string;

    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;

    /**
     * Текст подсказки снизу
     */
    hint?: ReactNode;

    /**
     * Дочерние элементы. Ожидаются компоненты `Radio` или `Tag`
     */
    children: ReactNode;

    /**
     * Обработчик изменения значения 'checked' одного из дочерних компонентов
     */
    onChange?: (
        event: ChangeEvent | MouseEvent,
        payload: {
            value: string;
            name?: string;
        },
    ) => void;

    /**
     * Обработчик блюра.
     */
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;

    /**
     * Обработчик фокуса.
     */
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;

    /**
     * Управление возможностью изменения состояния 'checked' дочерних компонентов Radio | Tag
     */
    disabled?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Атрибут name для всех дочерних компонентов
     */
    name?: string;

    /**
     * Value выбранного дочернего элемента
     */
    value?: string | null;

    /**
     * Основные стили компонента.
     */
    styles: { [key: string]: string };
};

export const BaseRadioGroup = forwardRef<HTMLDivElement, BaseRadioGroupProps>(
    (
        {
            children,
            className,
            radioListClassName,
            direction = 'vertical',
            label,
            error,
            hint,
            onChange,
            onBlur,
            onFocus,
            type = 'radio',
            dataTestId,
            disabled = false,
            name,
            value,
            styles,
        },
        ref,
    ) => {
        const [stateValue, setStateValue] = useState<BaseRadioGroupProps['value']>('');

        useDidUpdateEffect(() => {
            setStateValue(value);
        }, [value]);

        const isChecked = (childValue: string) =>
            value !== null && (value || stateValue) === childValue;

        const handleChange = (event: ChangeEvent | MouseEvent, childValue: string) => {
            setStateValue(childValue);
            if (onChange) {
                onChange(event, { name, value: childValue });
            }
        };

        const renderRadio = (child: ReactElement) => {
            const { className: childClassName, value: childValue } = child.props;

            return cloneElement(child, {
                onChange: (event: ChangeEvent) => handleChange(event, childValue),
                disabled,
                ...child.props,
                checked: isChecked(childValue),
                name,
                className: cn(childClassName, commonStyles[`${direction}Radio`]),
            });
        };

        const renderTag = (child: ReactElement) => {
            const childValue = child.props.value;
            const checked = isChecked(childValue);
            const clone = cloneElement(child, {
                onClick: (event: MouseEvent) => handleChange(event, childValue),
                disabled,
                ...child.props,
                checked,
                name,
                tabIndex: -1,
            });

            return (
                <label
                    className={cn(
                        commonStyles[`${direction}Radio`],
                        commonStyles[`${direction}TagLabel`],
                        commonStyles.tagLabel,
                    )}
                >
                    <input
                        type='radio'
                        autoComplete='off'
                        onChange={(event: ChangeEvent) => handleChange(event, childValue)}
                        disabled={disabled || child.props.disabled}
                        name={name}
                        checked={checked}
                        className={commonStyles.hiddenInput}
                        value={child.props.value}
                    />
                    {clone}
                </label>
            );
        };

        const errorMessage = typeof error === 'boolean' ? '' : error;

        return (
            <div
                className={cn(
                    commonStyles.component,
                    commonStyles[type],
                    { [commonStyles.error]: error },
                    className,
                )}
                data-test-id={dataTestId}
                ref={ref}
            >
                {label ? (
                    <span className={cn(commonStyles.label, styles.label)}>{label}</span>
                ) : null}

                {children ? (
                    <div
                        className={cn(
                            commonStyles.radioList,
                            commonStyles[`${direction}RadioList`],
                            radioListClassName,
                            { [styles.radioList]: type === 'radio' },
                        )}
                        onBlur={onBlur}
                        onFocus={onFocus}
                    >
                        {Children.map(children, (child) => {
                            if (isValidElement(child)) {
                                return type === 'radio' ? renderRadio(child) : renderTag(child);
                            }

                            return null;
                        })}
                    </div>
                ) : null}

                {errorMessage && (
                    <span
                        className={cn(commonStyles.sub, styles.sub, commonStyles.errorMessage)}
                        role='alert'
                    >
                        {errorMessage}
                    </span>
                )}

                {hint && !errorMessage && (
                    <span className={cn(commonStyles.sub, styles.sub, commonStyles.hint)}>
                        {hint}
                    </span>
                )}
            </div>
        );
    },
);
