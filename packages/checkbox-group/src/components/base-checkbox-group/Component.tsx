import React, {
    type ChangeEvent,
    Children,
    cloneElement,
    type FocusEvent,
    forwardRef,
    isValidElement,
    type MouseEvent,
    type ReactElement,
    type ReactNode,
} from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import commonStyles from './index.module.css';

export type Direction = 'horizontal' | 'vertical';
export type CheckboxGroupType = 'checkbox' | 'tag';

export type BaseCheckboxGroupProps = {
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
    type?: CheckboxGroupType;

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
     * Дочерние элементы. Ожидаются компоненты `Checkbox` или `Tag`
     */
    children: ReactNode;

    /**
     * Обработчик изменения значения 'checked' одного из дочерних компонентов
     */
    onChange?: (
        event: ChangeEvent | MouseEvent,
        payload: {
            checked: boolean;
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
     * Управление возможностью изменения состояния 'checked' дочерних компонентов CheckBox
     */
    disabled?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Основные стили компонента.
     */
    styles: { [key: string]: string };
};

export const BaseCheckboxGroup = forwardRef<HTMLDivElement, BaseCheckboxGroupProps>(
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
            type = 'checkbox',
            dataTestId,
            disabled = false,
            styles,
        },
        ref,
    ) => {
        const renderCheckbox = (child: ReactElement) => {
            const { name, checked, className: childClassName } = child.props;

            const handleChange = (event: ChangeEvent) => {
                if (onChange) {
                    onChange(event, { name, checked: !checked });
                }
            };

            return cloneElement(child, {
                onChange: handleChange,
                disabled,
                ...child.props,
                className: cn(childClassName, commonStyles.checkbox),
            });
        };

        const renderTag = (child: ReactElement) => {
            const { name, checked } = child.props;

            const handleChange = (event: ChangeEvent | MouseEvent) => {
                if (onChange) {
                    onChange(event, { name, checked: !checked });
                }
            };

            const clone = cloneElement(child, { onClick: handleChange, disabled, ...child.props });

            return (
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                <label className={cn(commonStyles.checkbox, commonStyles.tagLabel)}>
                    {clone}
                    <input
                        type='checkbox'
                        autoComplete='off'
                        onChange={handleChange}
                        disabled={disabled || child.props.disabled}
                        checked={checked}
                        className={commonStyles.hiddenInput}
                        tabIndex={-1}
                    />
                </label>
            );
        };

        const errorMessage = typeof error === 'boolean' ? '' : error;

        return (
            <div
                ref={ref}
                className={cn(
                    commonStyles.component,
                    commonStyles[type],
                    commonStyles[direction],
                    { [styles.error]: error },
                    className,
                )}
                data-test-id={dataTestId}
            >
                {label ? (
                    <span
                        className={cn(styles.label, {
                            [styles.tag]: type === 'tag',
                        })}
                        data-test-id={getDataTestId(dataTestId, 'label')}
                    >
                        {label}
                    </span>
                ) : null}

                {children ? (
                    <div
                        className={cn(commonStyles.checkboxList, {
                            [styles.checkboxList]: type === 'checkbox',
                        })}
                        onBlur={onBlur}
                        onFocus={onFocus}
                    >
                        {Children.map(children, (child) => {
                            if (isValidElement(child)) {
                                return type === 'checkbox'
                                    ? renderCheckbox(child)
                                    : renderTag(child);
                            }

                            return null;
                        })}
                    </div>
                ) : null}

                {errorMessage && (
                    <span
                        className={cn(
                            styles.sub,
                            {
                                [styles.tag]: type === 'tag',
                            },
                            commonStyles.errorMessage,
                        )}
                        role='alert'
                        data-test-id={getDataTestId(dataTestId, 'error')}
                    >
                        {errorMessage}
                    </span>
                )}

                {hint && !errorMessage && (
                    <span
                        className={cn(
                            styles.sub,
                            {
                                [styles.tag]: type === 'tag',
                            },
                            commonStyles.hint,
                        )}
                        data-test-id={getDataTestId(dataTestId, 'hint')}
                    >
                        {hint}
                    </span>
                )}
            </div>
        );
    },
);
