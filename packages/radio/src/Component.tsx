import React, {
    ChangeEvent,
    DetailedHTMLProps,
    forwardRef,
    InputHTMLAttributes,
    LabelHTMLAttributes,
    ReactNode,
    Ref,
    useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { dom } from '@alfalab/core-components-shared';
import { useFocus } from '@alfalab/hooks';

import styles from './index.module.css';

type NativeProps = InputHTMLAttributes<HTMLInputElement>;
type Align = 'start' | 'center';

export type RadioProps = Omit<
    NativeProps,
    'size' | 'type' | 'onChange' | 'checked' | 'disabled' | 'name' | 'className' | 'enterKeyHint'
> & {
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Текст подсказки снизу
     */
    hint?: ReactNode;

    /**
     * Текст подписи
     */
    label?: ReactNode;

    /**
     * Размер компонента
     * @description s и m deprecated, используйте вместо них 20 и 24 соответственно
     */
    size?: 's' | 'm' | 20 | 24;

    /**
     * Управление состоянием отмечен/не отмечен
     */
    checked?: boolean;

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
     * Html аттрибут name инпута
     */
    name?: string;

    /**
     * Класс компонента
     */
    className?: string;

    /**
     * Доп. класс радио кнопки
     */
    circleClassName?: string;

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
     * Пропсы для label
     */
    labelProps?: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;

    /**
     * Обработчик на выбор элемента
     */
    onChange?: (
        event: ChangeEvent<HTMLInputElement>,
        payload: {
            checked: boolean;
            name?: string;
        },
    ) => void;
};

const SIZE_TO_CLASSNAME_MAP = {
    s: 'size-20',
    m: 'size-24',
    20: 'size-20',
    24: 'size-24',
};

export const Radio = forwardRef<HTMLLabelElement, RadioProps>(
    (
        {
            onChange,
            className,
            circleClassName,
            contentClassName,
            name,
            disabled,
            inactive,
            dataTestId,
            label,
            checked,
            hint,
            size = 20,
            align = 'start',
            addons,
            block,
            labelProps,
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

        return (
            <label
                {...labelProps}
                className={cn(
                    styles.container,
                    styles[SIZE_TO_CLASSNAME_MAP[size]],
                    styles[align],
                    className,
                    labelProps?.className,
                    {
                        [styles.disabled]: disabled || inactive,
                        [styles.checked]: checked,
                        [styles.focused]: focused,
                        [styles.block]: block,
                    },
                )}
                ref={mergeRefs([labelRef, ref, labelProps?.ref as Ref<HTMLLabelElement>])}
            >
                <input
                    type='radio'
                    onChange={handleChange}
                    data-test-id={dataTestId}
                    disabled={disabled || inactive}
                    checked={checked}
                    name={name}
                    {...restProps}
                />
                <span className={cn(styles.circle, circleClassName)} />
                {(label || hint) && (
                    <span className={cn(styles.content, contentClassName)}>
                        {label && <span className={styles.label}>{label}</span>}
                        {hint && <span className={styles.hint}>{hint}</span>}
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

Radio.displayName = 'Radio';
