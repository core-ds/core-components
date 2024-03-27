import React, { ChangeEvent, forwardRef, InputHTMLAttributes, ReactNode, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { dom } from '@alfalab/core-components-shared';
import { useFocus } from '@alfalab/hooks';

import styles from './index.module.css';

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
     * @deprecated данный проп больше не используется, временно оставлен для обратной совместимости
     * Используйте props disabled
     * Управление состоянием активен / неактивен
     */
    inactive?: boolean;

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
            inactive,
            error,
            label,
            hint,
            name,
            value,
            className,
            onChange,
            dataTestId,
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
                    [styles.disabled]: disabled || inactive,
                    [styles.checked]: checked,
                    [styles.reversed]: reversed,
                    [styles.focused]: focused,
                    [styles.block]: block,
                })}
                ref={mergeRefs([labelRef, ref])}
            >
                <input
                    type='checkbox'
                    onChange={handleChange}
                    disabled={disabled || inactive}
                    checked={checked}
                    name={name}
                    value={value}
                    data-test-id={dataTestId}
                    {...restProps}
                />

                <span className={styles.switch} />

                {(label || hint || errorMessage) && (
                    <span className={styles.content}>
                        {label && <span className={styles.label}>{label}</span>}
                        {hint && !errorMessage && <span className={styles.hint}>{hint}</span>}

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
