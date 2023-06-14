import React, { HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

import defaultColors from './default.module.css';
import commonStyles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type BaseFormControlProps = HTMLAttributes<HTMLDivElement> & {
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
     * Дополнительный класс для поля
     */
    inputWrapperClassName?: string;

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
     * Основные стили компонента.
     */
    styles: { [key: string]: string };
};

export const BaseFormControl = React.forwardRef<HTMLDivElement, BaseFormControlProps>(
    (
        {
            block = false,
            size = 's',
            colors = 'default',
            className,
            fieldClassName,
            inputWrapperClassName,
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
            styles,
            ...restProps
        },
        ref,
    ) => {
        const errorMessage = typeof error === 'boolean' ? '' : error;

        return (
            <div
                data-test-id={dataTestId}
                className={cn(
                    commonStyles.component,
                    colorStyles[colors].component,
                    className,
                    commonStyles[size],
                    styles[size],
                    {
                        [commonStyles.block]: block,
                        [commonStyles.hasLeftAddons]: leftAddons,
                        [commonStyles.hasRightAddons]: rightAddons || error,
                    },
                )}
            >
                {label && labelView === 'outer' && (
                    <span
                        className={cn(commonStyles.above, styles.above, colorStyles[colors].label,
                        )}
                    >
                        {label}
                    </span>
                )}
                <div
                    {...restProps}
                    className={cn(
                        fieldClassName,
                        commonStyles.inner,
                        styles.inner,
                        colorStyles[colors].inner,
                        {
                            [commonStyles.disabled]: disabled || readOnly,
                            [colorStyles[colors].disabled]: disabled || readOnly,
                            [commonStyles.filled]: filled,
                            [colorStyles[colors].filled]: filled,
                            [commonStyles.hasInnerLabel]: label && labelView === 'inner',
                            [commonStyles.focused]: focused,
                            [colorStyles[colors].focused]: focused,
                            [commonStyles.hasError]: error,
                            [colorStyles[colors].hasError]: error,
                        },
                    )}
                    ref={ref}
                >
                    {leftAddons && (
                        <div
                            className={cn(
                                commonStyles.addons,
                                commonStyles.leftAddons,
                                addonsClassName,
                            )}
                        >
                            {leftAddons}
                        </div>
                    )}

                    <div className={cn(commonStyles.inputWrapper, inputWrapperClassName)}>
                        {label && labelView === 'inner' && (
                            <React.Fragment>
                                <span className={commonStyles.hiddenLabel} aria-hidden={true}>
                                    {label}
                                </span>
                                <div
                                    className={cn(
                                        commonStyles.label,
                                        colorStyles[colors].label,
                                        labelClassName,
                                    )}
                                >
                                    <span className={commonStyles.labelInner}>{label}</span>
                                </div>
                            </React.Fragment>
                        )}

                        <div className={commonStyles.input}>{children}</div>
                    </div>

                    {rightAddons && (
                        <div
                            className={cn(
                                commonStyles.addons,
                                commonStyles.rightAddons,
                                addonsClassName,
                            )}
                        >
                            {rightAddons}
                        </div>
                    )}
                </div>
                {bottomAddons}

                {errorMessage && (
                    <span
                        className={cn(
                            commonStyles.sub,
                            styles.error,
                            colorStyles[colors].error,
                        )}
                        role='alert'
                    >
                        {errorMessage}
                    </span>
                )}

                {hint && !errorMessage && (
                    <span className={cn(commonStyles.sub, styles.sub, colorStyles[colors].hint, 
                    )}>{hint}</span>
                )}
            </div>
        );
    },
);
