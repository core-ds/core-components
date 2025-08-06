import React, { ChangeEvent, forwardRef, InputHTMLAttributes, ReactNode, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { dom } from '@alfalab/core-components-shared';
import { useFocus } from '@alfalab/hooks';

import { Colors } from './types/colors';

import defaultStyles from './default.module.css';
import styles from './index.module.css';
import invertedStyles from './inverted.module.css';

const colorStyles = {
    default: defaultStyles,
    inverted: invertedStyles,
};

type Align = 'start' | 'center';

export type SwitchProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'hint' | 'onChange' | 'disabled' | 'enterKeyHint'
> & {
    /**
     * Управление состоянием вкл/выкл компонента
     */
    checked?: boolean;

    /**
     * Текст подписи к переключателю
     */
    label?: ReactNode;

    /**
     * Текст подсказки снизу
     */
    hint?: ReactNode;

    /**
     * Переключатель будет отрисован справа от контента
     */
    reversed?: boolean;

    /**
     * Выравнивание
     */
    align?: Align;

    /**
     * Дополнительный слот
     */
    addons?: React.ReactNode;

    /**
     * Растягивать ли компонент на всю ширину
     */
    block?: boolean;

    /**
     * Управление состоянием включен / выключен
     */
    disabled?: boolean;

    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;

    /**
     * Обработчик переключения компонента
     */
    onChange?: (
        event: ChangeEvent<HTMLInputElement>,
        payload: {
            checked: boolean;
            name: InputHTMLAttributes<HTMLInputElement>['name'];
        },
    ) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Набор цветов для компонента
     * @default default
     */
    colors?: Colors;
};

export const Switch = forwardRef<HTMLLabelElement, SwitchProps>(
    (
        {
            reversed = false,
            checked = false,
            align = 'start',
            addons,
            block,
            disabled,
            error,
            label,
            hint,
            name,
            value,
            className,
            onChange,
            dataTestId,
            colors = 'default',
            ...restProps
        },
        ref,
    ) => {
        const labelRef = useRef<HTMLLabelElement>(null);

        const [focused] = useFocus(labelRef, 'keyboard');

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
                onChange(e, { checked: e.target.checked, name });
            }
        };

        const errorMessage = typeof error === 'boolean' ? '' : error;

        return (
            <label
                className={cn(styles.component, styles[align], className, {
                    [styles.disabled]: disabled,
                    [colorStyles[colors].disabled]: disabled,

                    [styles.checked]: checked,
                    [colorStyles[colors].checked]: checked,

                    [styles.reversed]: reversed,
                    [styles.focused]: focused,
                    [styles.block]: block,
                })}
                ref={mergeRefs([labelRef, ref])}
            >
                <input
                    type='checkbox'
                    onChange={handleChange}
                    disabled={disabled}
                    checked={checked}
                    name={name}
                    value={value}
                    data-test-id={dataTestId}
                    {...restProps}
                />

                <span className={cn(styles.switch, colorStyles[colors].switch)} />

                {(label || hint || errorMessage) && (
                    <span className={styles.content}>
                        {label && (
                            <span className={cn(styles.label, colorStyles[colors].label)}>
                                {label}
                            </span>
                        )}
                        {hint && !errorMessage && (
                            <span className={cn(styles.hint, colorStyles[colors].hint)}>
                                {hint}
                            </span>
                        )}

                        {errorMessage && (
                            <span className={styles.errorMessage} role='alert'>
                                {errorMessage}
                            </span>
                        )}
                    </span>
                )}

                {addons && (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <span className={styles.addons} onClick={dom.preventDefault}>
                        {addons}
                    </span>
                )}
            </label>
        );
    },
);

Switch.displayName = 'Switch';
