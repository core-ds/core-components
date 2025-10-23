import React, { forwardRef, type HTMLAttributes } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import camelCase from 'lodash/camelCase';

import { useCoreConfig } from '@alfalab/core-components-config';
import { type TextSkeletonProps, useSkeleton } from '@alfalab/core-components-skeleton';

import { type Color } from '../colors';
import { type TextElementType } from '../types';

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
        | 'component-primary'
        | 'component-secondary'
        | 'caps'
        | 'tagline';

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
     * Шрифт текста
     *
     * @deprecated
     */
    font?: 'alfasans' | undefined | null;
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
            weight = 'regular',
            monospaceNumbers = false,
            defaultMargins = true,
            color,
            className,
            dataTestId,
            children,
            rowLimit,
            showSkeleton,
            skeletonProps,
            font,
            ...restProps
        },
        ref,
    ) => {
        const { typography } = useCoreConfig();
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

        const kind = (
            {
                regular: 'paragraph',
                medium: 'action',
                bold: 'accent',
            } as const
        )[weight];
        const typographyStyle = camelCase(`${kind}-${view}`);

        return (
            <Component
                className={cn(
                    typography?.styles[typographyStyle],
                    {
                        [styles.paragraph]: Component === 'p' && !defaultMargins,
                        [styles.paragraphWithMargins]: Component === 'p' && defaultMargins,
                        [styles.monospace]: monospaceNumbers,
                        [styles[`rowLimit${rowLimit}`]]: rowLimit,
                        [styles.transparent]: showSkeleton,
                    },
                    color && colors[color],
                    className,
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
