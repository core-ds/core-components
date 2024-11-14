import React, { forwardRef, HTMLAttributes } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { useSkeleton } from '../hooks';
import type desktopStyles from '../title-desktop/desktop.module.css';
import type mobileStyles from '../title-desktop/mobile.module.css';
import type { COLORS, FONTS, ROW_LIMITS, TAGS_TITLE, VIEWS_TITLE, WEIGHTS_TITLE } from '../types';
import { TextSkeletonProps } from '../types';

import colorStyles from '../colors.module.css';
import commonStyles from './common.module.css';

type NativeProps = HTMLAttributes<HTMLHeadingElement>;

export const DEFAULT_TITLE_FONT = 'styrene' as const;

export type TitleProps = Omit<NativeProps, 'color'> & {
    /**
     * HTML тег
     */
    tag?: (typeof TAGS_TITLE)[number];

    /**
     * [Вариант начертания](https://core-ds.github.io/core-components/master/?path=/docs/guidelines-typography--page)
     */
    view?: (typeof VIEWS_TITLE)[number];

    /**
     * Цвет текста
     */
    color?: (typeof COLORS)[number];

    /**
     * Толщина шрифта
     */
    weight?: (typeof WEIGHTS_TITLE)[number];

    /**
     * Шрифт текста
     */
    font?: (typeof FONTS)[number];

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
    rowLimit?: (typeof ROW_LIMITS)[number];

    /**
     * Показать скелетон
     */
    showSkeleton?: boolean;

    /**
     * Пропы для скелетона
     */
    skeletonProps?: TextSkeletonProps;
};

type PrivateProps = {
    styles: typeof commonStyles & typeof desktopStyles & typeof mobileStyles;
};

type TitleElementType = HTMLHeadingElement | HTMLDivElement;

export const TitleBase = forwardRef<TitleElementType, TitleProps & PrivateProps>(
    (
        {
            tag: Component = 'div',
            view = 'medium',
            font = DEFAULT_TITLE_FONT,
            weight,
            defaultMargins = false,
            color,
            className,
            dataTestId,
            children,
            rowLimit,
            styles: stylesProp,
            skeletonProps,
            showSkeleton,
            ...restProps
        },
        ref,
    ) => {
        const { renderSkeleton, textRef } = useSkeleton(showSkeleton, skeletonProps);

        const styles = Object.assign(commonStyles, stylesProp);

        const skeleton = renderSkeleton({
            wrapperClassName: cn(defaultMargins && styles[`${view}Margins`]),
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
                    styles[`${font}Font_${view}View`],
                    defaultMargins && styles[`${view}Margins`],
                    styles[`${weight}Weight`],
                    color && colorStyles[`${color}Color`],
                    {
                        [styles[`rowLimit${rowLimit}`]]: rowLimit,
                        [styles.transparent]: showSkeleton,
                    },
                )}
                /*
                 * className={cn(
                 *   styles.component,
                 *   className,
                 *   styles[`${font}-${view}`],
                 *   defaultMargins && styles[`margins-${view}`],
                 *   styles[weight],
                 *   color && colors[color],
                 *   {
                 *       [styles[`rowLimit${rowLimit}`]]: rowLimit,
                 *       [styles.transparent]: showSkeleton,
                 *   }
                 *
                 */
                data-test-id={dataTestId}
                ref={mergeRefs([ref, textRef])}
                {...restProps}
            >
                {children}
            </Component>
        );
    },
);
