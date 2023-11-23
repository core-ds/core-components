import React, { forwardRef, HTMLAttributes } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { Color } from '../colors';
import { useSkeleton } from '../hooks';
import { TextSkeletonProps } from '../types';

import colors from '../colors.module.css';

type NativeProps = HTMLAttributes<HTMLHeadingElement>;

export type TitleProps = Omit<NativeProps, 'color'> & {
    /**
     * HTML тег
     */
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';

    /**
     * [Вариант начертания](https://core-ds.github.io/core-components/master/?path=/docs/guidelines-typography--page)
     */
    view?: 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';

    /**
     * Цвет текста
     */
    color?: Color;

    /**
     * Толщина шрифта
     */
    weight?: 'regular' | 'medium' | 'bold';

    /**
     * Шрифт текста
     */
    font?: 'styrene' | 'system';

    /**
     * Добавляет отступы
     */
    defaultMargins?: boolean;

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
     * Количество строк
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

type Styles = {
    styles: {
        [key: string]: string;
    };
};

type TitleElementType = HTMLHeadingElement | HTMLDivElement;

export const Title = forwardRef<TitleElementType, TitleProps & Styles>(
    (
        {
            tag: Component = 'div',
            view = 'medium',
            font = 'styrene',
            weight = font === 'styrene' ? 'medium' : 'bold',
            defaultMargins = false,
            color,
            className,
            dataTestId,
            children,
            rowLimit,
            styles,
            skeletonProps,
            showSkeleton,
            ...restProps
        },
        ref,
    ) => {
        const { renderSkeleton, textRef } = useSkeleton(showSkeleton, skeletonProps);

        const skeleton = renderSkeleton({
            wrapperClassName: cn(defaultMargins && styles[`margins-${view}`]),
            dataTestId,
        });

        if (skeleton) {
            return skeleton;
        }

        return (
            <Component
                className={cn(
                    styles.component,
                    className,
                    styles[`${font}-${view}`],
                    defaultMargins && styles[`margins-${view}`],
                    styles[weight],
                    color && colors[color],
                    { [styles[`rowLimit${rowLimit}`]]: rowLimit },
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
