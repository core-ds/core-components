import React, { forwardRef, HTMLAttributes } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { type TextSkeletonProps, useSkeleton } from '@alfalab/core-components-skeleton';

import { Color } from '../colors';
import { TextElementType } from '../types';

import colors from '../colors.module.css';
import alfasansStyles from './alfasans-index.module.css';
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
            font,
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
                        [styles.transparent]: showSkeleton,
                        [alfasansStyles.text]: font === 'alfasans',
                    },
                    className,
                    color && colors[color],
                    (font === 'alfasans' ? alfasansStyles : styles)[view],
                    weight && (font === 'alfasans' ? alfasansStyles : styles)[weight],
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
