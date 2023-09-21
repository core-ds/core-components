import React, { HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import defaultColors from './default.module.css';
import commonStyles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorCommonStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type StyleColors = {
    default: {
        [key: string]: string;
    };
    inverted: {
        [key: string]: string;
    };
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
     * Свойства для обертки левых аддонов
     */
    leftAddonsProps?: HTMLAttributes<HTMLDivElement>;

    /**
     * Свойства для обертки правых аддонов
     */
    rightAddonsProps?: HTMLAttributes<HTMLDivElement>;

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

    /**
     * Стили компонента для default и inverted режима.
     */
    colorStyles?: StyleColors;
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
            colorStyles = { default: {}, inverted: {} },
            leftAddonsProps,
            rightAddonsProps,
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
                    colorCommonStyles[colors].component,
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
                        className={cn(
                            commonStyles.above,
                            styles.above,
                            colorCommonStyles[colors].label,
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
                        colorCommonStyles[colors].inner,
                        colorStyles[colors].inner,
                        {
                            [commonStyles.disabled]: disabled || readOnly,
                            [colorCommonStyles[colors].disabled]: disabled || readOnly,
                            [colorStyles[colors].disabled]: disabled || readOnly,
                            [commonStyles.filled]: filled,
                            [colorCommonStyles[colors].filled]: filled,
                            [commonStyles.hasInnerLabel]: label && labelView === 'inner',
                            [commonStyles.focused]: focused,
                            [colorCommonStyles[colors].focused]: focused,
                            [colorStyles[colors].focused]: focused,
                            [commonStyles.hasError]: error,
                            [colorCommonStyles[colors].hasError]: error,
                            [colorStyles[colors].hasError]: error,
                        },
                    )}
                    ref={ref}
                >
                    {leftAddons && (
                        <div
                            {...leftAddonsProps}
                            data-test-id={getDataTestId(dataTestId, 'left-addons')}
                            className={cn(
                                commonStyles.addons,
                                commonStyles.leftAddons,
                                addonsClassName,
                                leftAddonsProps?.className,
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
                                        colorCommonStyles[colors].label,
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
                            {...rightAddonsProps}
                            data-test-id={getDataTestId(dataTestId, 'right-addons')}
                            className={cn(
                                commonStyles.addons,
                                commonStyles.rightAddons,
                                addonsClassName,
                                rightAddonsProps?.className,
                            )}
                        >
                            {rightAddons}
                        </div>
                    )}
                </div>
                {bottomAddons}

                {errorMessage && (
                    <span
                        data-test-id={getDataTestId(dataTestId, 'error-message')}
                        className={cn(
                            commonStyles.sub,
                            styles.error,
                            colorCommonStyles[colors].error,
                        )}
                        role='alert'
                    >
                        {errorMessage}
                    </span>
                )}

                {hint && !errorMessage && (
                    <span
                        data-test-id={getDataTestId(dataTestId, 'hint')}
                        className={cn(commonStyles.sub, styles.sub, colorCommonStyles[colors].hint)}
                    >
                        {hint}
                    </span>
                )}
            </div>
        );
    },
);
