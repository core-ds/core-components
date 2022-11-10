import React, { HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type FormControlProps = HTMLAttributes<HTMLDivElement> & {
    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;

    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Заблокированное состояние
     */
    disabled?: boolean;

    /**
     * Cостояние только для чтения
     */
    readOnly?: boolean;

    /**
     * Заполненное состояние
     */
    filled?: boolean;

    /**
     * Выбранное (фокус) состояние
     */
    focused?: boolean;

    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;

    /**
     * Текст подсказки
     */
    hint?: ReactNode;

    /**
     * Лейбл компонента
     */
    label?: ReactNode;

    /**
     * Вид лейбла внутри / снаружи
     */
    labelView?: 'inner' | 'outer';

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Слот под полем
     */
    bottomAddons?: ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для поля
     */
    fieldClassName?: string;

    /**
     * Дополнительный класс для лейбла
     */
    labelClassName?: string;

    /**
     * Дополнительный класс для аддонов
     */
    addonsClassName?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Компонент поля (инпут, textarea и пр.)
     */
    children?: ReactNode;

    /**
     * Счетчик переполнения
     */
    overflowHint?: ReactNode;
    /**
     * Флаг преполнения
     */
    overflow?: boolean;
};

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
    (
        {
            block = false,
            size = 's',
            colors = 'default',
            className,
            fieldClassName,
            labelClassName,
            addonsClassName,
            disabled,
            readOnly,
            focused,
            filled,
            error,
            hint,
            label,
            labelView = 'inner',
            leftAddons,
            rightAddons,
            bottomAddons,
            children,
            dataTestId,
            overflowHint,
            overflow,
            ...restProps
        },
        ref,
    ) => {
        const errorMessage = typeof error === 'boolean' ? '' : error;

        return (
            <div
                data-test-id={dataTestId}
                className={cn(
                    styles.component,
                    colorStyles[colors].component,
                    className,
                    styles[size],
                    {
                        [styles.block]: block,
                        [styles.hasLeftAddons]: leftAddons,
                        [styles.hasRightAddons]: rightAddons || error,
                    },
                )}
            >
                {label && labelView === 'outer' && (
                    <span className={cn(styles.above, colorStyles[colors].label)}>{label}</span>
                )}
                <div
                    {...restProps}
                    className={cn(fieldClassName, styles.inner, colorStyles[colors].inner, {
                        [styles.disabled]: disabled || readOnly,
                        [colorStyles[colors].disabled]: disabled || readOnly,
                        [styles.filled]: filled,
                        [colorStyles[colors].filled]: filled,
                        [styles.hasInnerLabel]: label && labelView === 'inner',
                        [styles.focused]: focused,
                        [colorStyles[colors].focused]: focused,
                        [styles.hasError]: error,
                        [colorStyles[colors].hasError]: error,
                    })}
                    ref={ref}
                >
                    {leftAddons && (
                        <div className={cn(styles.addons, styles.leftAddons, addonsClassName)}>
                            {leftAddons}
                        </div>
                    )}

                    <div className={styles.inputWrapper}>
                        {label && labelView === 'inner' && (
                            <React.Fragment>
                                <span className={styles.hiddenLabel} aria-hidden={true}>
                                    {label}
                                </span>
                                <div
                                    className={cn(
                                        styles.label,
                                        colorStyles[colors].label,
                                        labelClassName,
                                    )}
                                >
                                    <span className={styles.labelInner}>{label}</span>
                                </div>
                            </React.Fragment>
                        )}

                        <div className={styles.input}>{children}</div>
                    </div>

                    {rightAddons && (
                        <div className={cn(styles.addons, styles.rightAddons, addonsClassName)}>
                            {rightAddons}
                        </div>
                    )}
                </div>
                {bottomAddons}

                {overflowHint && (
                    <span
                        className={cn(styles.sub, {
                            [colorStyles[colors].error]: overflow,
                            [colorStyles[colors].hint]: !overflow,
                        })}
                    >
                        {overflowHint}
                    </span>
                )}

                {errorMessage && (
                    <span
                        className={cn(styles.sub, styles.error, colorStyles[colors].error)}
                        role='alert'
                    >
                        {errorMessage}
                    </span>
                )}

                {hint && !errorMessage && (
                    <span className={cn(styles.sub, colorStyles[colors].hint)}>{hint}</span>
                )}
            </div>
        );
    },
);
