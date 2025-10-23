import React, { forwardRef, type HTMLAttributes } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import camelCase from 'lodash/camelCase';

import { useCoreConfig } from '@alfalab/core-components-config';
import { isObject } from '@alfalab/core-components-shared';
import { type TextSkeletonProps, useSkeleton } from '@alfalab/core-components-skeleton';

import { type Color } from '../colors';

import { getDefaultWeight } from './utils';

import colors from '../colors.module.css';
import commonStyles from './common.module.css';

type NativeProps = HTMLAttributes<HTMLHeadingElement>;

export type TitleProps = Omit<NativeProps, 'color'> & {
    /**
     * HTML тег
     */
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';

    /**
     * [Вариант начертания](?path=/docs/guidelines-typography--page)
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
     *
     * @deprecated
     */
    font?: 'styrene' | 'system' | 'alfasans' | { font: 'alfasans'; systemCompat: boolean };

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
            weight = getDefaultWeight(isObject(font) ? font.font : font, platform),
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
        const { typography } = useCoreConfig();
        const { renderSkeleton, textRef } = useSkeleton(showSkeleton, skeletonProps);

        const skeleton = renderSkeleton({
            wrapperClassName: cn(defaultMargins && styles[`margins-${view}`]),
            dataTestId,
        });

        if (skeleton) {
            return skeleton;
        }

        const systemCompat = isObject(font) ? font.systemCompat : font === 'system';
        const typographyStyle = camelCase(
            `${weight === 'regular' ? 'promo' : 'headline'}-${systemCompat ? 'system' : ''}-${platform === 'mobile' ? platform : ''}-${view}`,
        );

        return (
            <Component
                className={cn(
                    commonStyles.component,
                    styles.component,
                    className,
                    typography?.styles[typographyStyle],
                    defaultMargins && styles[`margins-${view}`],
                    color && colors[color],
                    {
                        [commonStyles[`rowLimit${rowLimit}`]]: rowLimit,
                        [commonStyles.transparent]: showSkeleton,
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
