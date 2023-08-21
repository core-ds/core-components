import React, { forwardRef, HTMLAttributes } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { Color } from '../colors';
import { useSkeleton } from '../hooks';
import { TextElementType, TextSkeletonProps } from '../types';

import colors from '../colors.module.css';
import styles from './index.module.css';

type NativeProps = HTMLAttributes<HTMLSpanElement>;

type TextBaseProps = {
    /**
     * [Вариант начертания](https://core-ds.github.io/core-components/master/?path=/docs/tokens-assets-типографика--docs)
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

    /**
     * Количество строк (не поддерживает IE)
     */
    rowLimit?: 1 | 2 | 3;

    /**
     * Показать скелетон
     */
    showSkeleton?: boolean;

    /**
     * Пропы для скелетона
     */
    skeletonProps?: TextSkeletonProps;
};

type TextPTagProps = Omit<TextBaseProps, 'tag' | 'defaultMargins'> & {
    tag?: 'p';
    defaultMargins?: boolean;
};

export type TextProps = Omit<NativeProps, 'color'> & (TextBaseProps | TextPTagProps);

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
            rowLimit,
            showSkeleton,
            skeletonProps,
            ...restProps
        },
        ref,
    ) => {
        const { renderSkeleton, textRef } = useSkeleton(showSkeleton, skeletonProps);

        const skeleton = renderSkeleton({
            wrapperClassName: cn({
                [styles.paragraphWithMargins]: Component === 'p' && defaultMargins,
            }),
            dataTestId,
        });

        if (skeleton) {
            return skeleton;
        }

        return (
            <Component
                className={cn(
                    {
                        [styles.paragraph]: Component === 'p' && !defaultMargins,
                        [styles.paragraphWithMargins]: Component === 'p' && defaultMargins,
                        [styles.monospace]: monospaceNumbers,
                        [styles[`rowLimit${rowLimit}`]]: rowLimit,
                    },
                    className,
                    color && colors[color],
                    styles[view],
                    weight && styles[weight],
                )}
                data-test-id={dataTestId}
                ref={mergeRefs([ref, textRef])}
                {...restProps}
            >
                {children}
            </Component>
        );
    },
);
