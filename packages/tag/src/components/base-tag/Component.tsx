import React, { ButtonHTMLAttributes, forwardRef, ReactNode, RefObject, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { useFocus } from '@alfalab/hooks';

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

export type NativeProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type BaseTagProps = Omit<NativeProps, 'onClick'> & {
    /**
     * Отображение кнопки в отмеченном (зажатом) состоянии
     */
    checked?: boolean;

    /**
     * Размер компонента
     * @description xxs, xs, s, m, l, xl deprecated, используйте вместо них 32, 40, 48, 56, 64, 72 соответственно
     */
    size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 32 | 40 | 48 | 56 | 64 | 72;

    /**
     * Дочерние элементы.
     */
    children?: ReactNode;

    /**
     * Дополнительный класс для обёртки children
     */
    childrenClassName?: string;

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Обработчик нажатия
     */
    onClick?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        payload: {
            checked: boolean;
            name?: string;
        },
    ) => void;

    /**
     * ref на children
     */

    childrenRef?: RefObject<HTMLSpanElement>;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * @deprecated данный проп больше не используется, временно оставлен для обратной совместимости
     * Используйте props shape и view
     * Вариант тега
     */
    variant?: 'default' | 'alt';

    /**
     * Форма тега
     */
    shape?: 'rounded' | 'rectangular';

    /**
     * Стиль тега
     * @default outlined
     */
    view?: 'outlined' | 'filled' | 'transparent';

    /**
     * Включает размытие фона для некоторых вариантов тега
     * @description Может привести к просадке fps и другим багам. Старайтесь не размещать слишком много заблюреных элементов на одной странице.
     */
    allowBackdropBlur?: boolean;

    /**
     * Основные стили компонента.
     */
    styles?: { [key: string]: string };

    /**
     * Стили компонента для default и inverted режима.
     */
    colorStylesMap?: StyleColors;
};

const SIZE_TO_CLASSNAME_MAP = {
    xxs: 'size-32',
    xs: 'size-40',
    s: 'size-48',
    m: 'size-56',
    l: 'size-64',
    xl: 'size-72',
    32: 'size-32',
    40: 'size-40',
    48: 'size-48',
    56: 'size-56',
    64: 'size-64',
    72: 'size-72',
};

export const BaseTag = forwardRef<HTMLButtonElement, BaseTagProps>(
    (
        {
            allowBackdropBlur,
            rightAddons,
            leftAddons,
            children,
            size = 48,
            checked,
            className,
            dataTestId,
            name,
            colors = 'default',
            onClick,
            variant = 'default',
            shape,
            view = 'outlined',
            childrenClassName,
            childrenRef,
            styles = {},
            colorStylesMap = { default: {}, inverted: {} },
            ...restProps
        },
        ref,
    ) => {
        const colorStyles = colorStylesMap[colors];

        const tagRef = useRef<HTMLButtonElement>(null);

        const [focused] = useFocus(tagRef, 'keyboard');

        const variantClassName = variant === 'default' ? 'rounded' : 'rectangular';

        const shapeClassName = shape || variantClassName;

        const tagProps = {
            className: cn(
                commonStyles.component,
                colorCommonStyles[colors].component,
                colorStyles.component,
                commonStyles[SIZE_TO_CLASSNAME_MAP[size]],
                styles[SIZE_TO_CLASSNAME_MAP[size]],
                colorCommonStyles[colors][view],
                commonStyles[view],
                {
                    [commonStyles.allowBackdropBlur]: allowBackdropBlur,
                    [commonStyles.checked]: checked,
                    [commonStyles[shapeClassName]]: Boolean(commonStyles[shapeClassName]),
                    [styles[shapeClassName]]: Boolean(styles[shapeClassName]),
                    [colorCommonStyles[colors].checked]: checked,
                    [colorStyles[view]]: Boolean(colorStyles[view]),
                    [commonStyles.focused]: focused,
                    [commonStyles.withRightAddons]: Boolean(rightAddons),
                    [commonStyles.withLeftAddons]: Boolean(leftAddons),
                    [commonStyles.noContent]: Boolean((leftAddons || rightAddons) && !children),
                },
                className,
            ),
            'data-test-id': dataTestId,
        };

        const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            if (onClick) {
                onClick(event, { name, checked: !checked });
            }
        };

        return (
            <button
                ref={mergeRefs([tagRef, ref])}
                type='button'
                onClick={handleClick}
                {...tagProps}
                {...restProps}
            >
                {leftAddons ? <span className={commonStyles.addons}>{leftAddons}</span> : null}

                {children && (
                    <span ref={childrenRef} className={childrenClassName}>
                        {children}
                    </span>
                )}

                {rightAddons ? <span className={commonStyles.addons}>{rightAddons}</span> : null}
            </button>
        );
    },
);
