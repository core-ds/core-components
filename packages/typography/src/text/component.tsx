import React, { forwardRef, HTMLAttributes } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { useSkeleton } from '../hooks';
import {
    COLORS,
    ROW_LIMITS,
    TAGS_BASE_TEXT,
    TextElementType,
    TextSkeletonProps,
    VIEWS_TEXT,
    WEIGHTS_TEXT,
} from '../types';

import colorStyles from '../colors.module.css';
import styles from './index.module.css';

type NativeProps = HTMLAttributes<HTMLSpanElement>;

type TextBaseProps = {
    /**
     * [Вариант начертания](https://core-ds.github.io/core-components/master/?path=/docs/tokens-assets-типографика--docs)
     */
    view?: (typeof VIEWS_TEXT)[number];

    /**
     * Цвет текста
     */
    color?: (typeof COLORS)[number];

    /**
     * Толщина шрифта
     */
    weight?: (typeof WEIGHTS_TEXT)[number];

    /**
     * Делает цифры моноширинными
     */
    monospaceNumbers?: boolean;

    /**
     * HTML тег
     */
    tag?: (typeof TAGS_BASE_TEXT)[number];

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

type TextPTagProps = Omit<TextBaseProps, 'tag' | 'defaultMargins'> & {
    tag?: 'p';
    defaultMargins?: boolean;
};

export const DEFAULT_TEXT_VIEW = 'primary-medium' as const;

export type TextProps = Omit<NativeProps, 'color'> & (TextBaseProps | TextPTagProps);

const logWarning = (view: Required<TextBaseProps>['view']) => {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }

    const viewsMap: { [key: string]: string } = {
        component: 'component-primary',
    };

    // eslint-disable-next-line no-console
    console.warn(
        // eslint-disable-next-line prefer-template
        `@alfalab/core-components/typography: view='${view}' будет удален в следующих мажорных версиях. ` +
            `Используйте view='${viewsMap[view]}'.`,
    );
};

export const Text = forwardRef<TextElementType, TextProps>(
    (
        {
            view = DEFAULT_TEXT_VIEW,
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
        if (view === 'component') {
            logWarning(view);
        }

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
                        [styles.transparent]: showSkeleton,
                    },
                    className,
                    color && colorStyles[`${color}Color`],
                    styles[`${view}View`],
                    weight && styles[`${weight}Weight`],
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
