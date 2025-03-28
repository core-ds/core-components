import React, { forwardRef, HTMLAttributes } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { type TextSkeletonProps, useSkeleton } from '@alfalab/core-components-skeleton';

import { Color } from '../colors';

import { getDefaultWeight } from './utils';

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
    weight?: 'regular' | 'medium' | 'bold' | 'semibold';

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

    /**
     * Значение по-умолчанию для хука useMatchMedia
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
};

type PrivateProps = {
    styles: {
        [key: string]: string;
    };
    platform: 'mobile' | 'desktop';
};

type TitleElementType = HTMLHeadingElement | HTMLDivElement;

export const TitleBase = forwardRef<TitleElementType, TitleProps & PrivateProps>(
    (
        {
            tag: Component = 'div',
            view = 'medium',
            font = 'styrene',
            platform,
            weight = getDefaultWeight(font, platform),
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
                    {
                        [styles[`rowLimit${rowLimit}`]]: rowLimit,
                        [styles.transparent]: showSkeleton,
                    },
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
