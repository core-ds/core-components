import React, {
    AriaAttributes,
    ChangeEvent,
    Children,
    cloneElement,
    FocusEvent,
    forwardRef,
    HTMLAttributes,
    isValidElement,
    MouseEvent,
    ReactElement,
    ReactNode,
    useState,
} from 'react';
import cn from 'classnames';

import { getDataTestId, pickAccessibilityProps } from '@alfalab/core-components-shared';
import { useDidUpdateEffect } from '@alfalab/hooks';

import commonStyles from './index.module.css';

export type Direction = 'horizontal' | 'vertical';
export type RadioGroupType = 'radio' | 'tag';

export type BaseRadioGroupProps = Omit<
    HTMLAttributes<HTMLDivElement>,
    'onChange' | 'onBlur' | 'onFocus' | 'children' | 'className'
> &
    AriaAttributes & {
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
            ...restProps
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
                ref={ref}
                data-test-id={dataTestId}
                {...pickAccessibilityProps(restProps)}
            >
                {label ? (
                    <span
                        className={cn(commonStyles.label, styles.label)}
                        data-test-id={getDataTestId(dataTestId, 'label')}
                    >
                        {label}
                    </span>
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
                        data-test-id={getDataTestId(dataTestId, 'error')}
                    >
                        {errorMessage}
                    </span>
                )}

                {hint && !errorMessage && (
                    <span
                        className={cn(commonStyles.sub, styles.sub, commonStyles.hint)}
                        data-test-id={getDataTestId(dataTestId, 'hint')}
                    >
                        {hint}
                    </span>
                )}
            </div>
        );
    },
);
