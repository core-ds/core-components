import React, { forwardRef, HTMLAttributes } from 'react';
import cn from 'classnames';

import { Color } from '../colors';

import colors from '../colors.module.css';
import styles from './index.module.css';

type NativeProps = HTMLAttributes<HTMLSpanElement>;

type TextBaseProps = {
    /**
     * [Вариант начертания](https://alfa-laboratory.github.io/core-components/master/?path=/docs/гайдлайны-типографика--page)
     */
    view?:
        | 'primary-large'
        | 'primary-medium'
        | 'primary-small'
        | 'secondary-large'
        | 'secondary-medium'
        | 'secondary-small'
        | 'component'
        | 'caps';

    /**
     * Цвет текста
     */
    color?: Color;

    /**
     * Толщина шрифта
     */
    weight?: 'regular' | 'medium' | 'bold';

    /**
     * Делает цифры моноширинными
     */
    monospaceNumbers?: boolean;

    /**
     * HTML тег
     */
    tag?: 'span' | 'div';

    /**
     * Css-класс для стилизации (native prop)
     */
    className?: string;

    /**
     * Id компонента для тестов
     */
    dataTestId?: string;

    /**
     * Контент (native prop)
     */
    children?: React.ReactNode;

    /**
     * Добавляет отступы к тэгу 'p'
     */
    defaultMargins?: never;
};

type TextPTagProps = Omit<TextBaseProps, 'tag' | 'defaultMargins'> & {
    tag?: 'p';
    defaultMargins?: boolean;
};

export type TextProps = Omit<NativeProps, 'color'> & (TextBaseProps | TextPTagProps);

type TextElementType = HTMLParagraphElement | HTMLSpanElement | HTMLDivElement;

export const Text = forwardRef<TextElementType, TextProps>(
    (
        {
            view = 'primary-medium',
            tag: Component = 'span',
            weight,
            monospaceNumbers = false,
            defaultMargins = true,
            color,
            className,
            dataTestId,
            children,
            ...restProps
        },
        ref,
    ) => (
        <Component
            className={cn(
                {
                    [styles.paragraph]: Component === 'p' && !defaultMargins,
                    [styles.paragraphWithMargins]: Component === 'p' && defaultMargins,
                    [styles.monospace]: monospaceNumbers,
                },
                className,
                color && colors[color],
                styles[view],
                weight && styles[weight],
            )}
            data-test-id={dataTestId}
            ref={ref as never}
            {...restProps}
        >
            {children}
        </Component>
    ),
);
