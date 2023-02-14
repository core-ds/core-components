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

import styles from './index.module.css';

export type Direction = 'horizontal' | 'vertical';
export type RadioGroupType = 'radio' | 'tag';

export type RadioGroupProps = {
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
};

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
    (
        {
            children,
            className,
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
        },
        ref,
    ) => {
        const [stateValue, setStateValue] = useState<RadioGroupProps['value']>('');

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
                className: cn(childClassName, styles.radio),
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
            });

            return (
                <label className={cn(styles.radio, styles.tagLabel)}>
                    {clone}
                    <input
                        type='radio'
                        autoComplete='off'
                        onChange={(event: ChangeEvent) => handleChange(event, childValue)}
                        disabled={disabled || child.props.disabled}
                        name={name}
                        checked={checked}
                        className={styles.hiddenInput}
                        value={child.props.value}
                    />
                </label>
            );
        };

        const errorMessage = typeof error === 'boolean' ? '' : error;

        return (
            <div
                className={cn(
                    styles.component,
                    styles[type],
                    styles[direction],
                    { [styles.error]: error },
                    className,
                )}
                data-test-id={dataTestId}
                ref={ref}
            >
                {label ? <span className={styles.label}>{label}</span> : null}

                {children ? (
                    <div className={styles.radioList} onBlur={onBlur} onFocus={onFocus}>
                        {Children.map(children, (child) => {
                            if (isValidElement(child)) {
                                return type === 'radio' ? renderRadio(child) : renderTag(child);
                            }

                            return null;
                        })}
                    </div>
                ) : null}

                {errorMessage && (
                    <span className={cn(styles.sub, styles.errorMessage)} role='alert'>
                        {errorMessage}
                    </span>
                )}

                {hint && !errorMessage && (
                    <span className={cn(styles.sub, styles.hint)}>{hint}</span>
                )}
            </div>
        );
    },
);
