import React, {
    ChangeEvent,
    DetailedHTMLProps,
    forwardRef,
    InputHTMLAttributes,
    LabelHTMLAttributes,
    ReactNode,
    Ref,
    RefObject,
    useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { dom } from '@alfalab/core-components-shared';
import { useFocus } from '@alfalab/hooks';
import { CheckmarkCompactMIcon } from '@alfalab/icons-glyph/CheckmarkCompactMIcon';

import styles from './index.module.css';

type NativeProps = InputHTMLAttributes<HTMLInputElement>;
type Align = 'start' | 'center';

export type CheckboxProps = Omit<NativeProps, 'size' | 'onChange' | 'enterKeyHint'> & {
    /**
     * Управление состоянием вкл/выкл чекбокса (native prop)
     */
    checked?: boolean;

    /**
     * Обработчик переключения чекбокса
     */
    onChange?: (
        event: ChangeEvent<HTMLInputElement>,
        payload: {
            checked: boolean;
            name?: string;
        },
    ) => void;

    /**
     * Текст подписи к чекбоксу
     */
    label?: ReactNode;

    /**
     * Текст подсказки снизу
     */
    hint?: ReactNode;

    /**
     * Размер компонента
     * @description s и m deprecated, используйте вместо них 20 и 24 соответственно
     */
    size?: 's' | 'm' | 20 | 24;

    /**
     * Доп. класс чекбокса
     */
    boxClassName?: string;

    /**
     * Доп. класс контента
     */
    contentClassName?: string;

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
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Управление неопределенным состоянием чекбокса
     */
    indeterminate?: boolean;

    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;

    /**
     * Флаг для скрытия нативного инпута.
     * @default false
     */
    hiddenInput?: boolean;

    /**
     * Реф на инпут
     */
    inputRef?: RefObject<HTMLInputElement>;

    /**
     * Пропсы для label
     */
    labelProps?: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
};

const SIZE_TO_CLASSNAME_MAP = {
    s: 'size-20',
    m: 'size-24',
    20: 'size-20',
    24: 'size-24',
};

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
    (
        {
            checked,
            label,
            hint,
            size = 20,
            boxClassName,
            contentClassName,
            align = 'start',
            addons,
            block,
            onChange,
            className,
            name,
            disabled,
            inactive,
            dataTestId,
            indeterminate = false,
            hiddenInput = false,
            labelProps,
            error,
            inputRef,
            ...restProps
        },
        ref,
    ) => {
        const labelRef = useRef<HTMLLabelElement>(null);

        const [focused] = useFocus(labelRef, 'keyboard');

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
                onChange(event, { checked: event.target.checked, name });
            }
        };

        const errorMessage = typeof error === 'boolean' ? '' : error;

        return (
            <label
                {...labelProps}
                className={cn(
                    styles.component,
                    styles[SIZE_TO_CLASSNAME_MAP[size]],
                    styles[align],
                    className,
                    labelProps?.className,
                    {
                        [styles.disabled]: disabled || inactive,
                        [styles.checked]: checked,
                        [styles.indeterminate]: indeterminate,
                        [styles.focused]: focused,
                        [styles.block]: block,
                    },
                )}
                ref={mergeRefs([labelRef, ref, labelProps?.ref as Ref<HTMLLabelElement>])}
            >
                {!hiddenInput && (
                    <input
                        type='checkbox'
                        onChange={handleChange}
                        disabled={disabled || inactive}
                        checked={checked}
                        data-test-id={dataTestId}
                        ref={inputRef}
                        {...restProps}
                    />
                )}
                <span className={cn(styles.box, boxClassName)}>
                    {checked && <CheckmarkCompactMIcon className={styles.checkedIcon} />}

                    {indeterminate && !checked && <span className={styles.indeterminateLine} />}
                </span>

                {(label || hint || errorMessage) && (
                    <span className={cn(styles.content, contentClassName)}>
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

/**
 * Для отображения в сторибуке
 */
Checkbox.defaultProps = {
    indeterminate: false,
};
