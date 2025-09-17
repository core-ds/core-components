import React, { type CSSProperties, forwardRef, type ReactElement } from 'react';
import cn from 'classnames';

import styles from './index.module.css';

// TODO: вынести в общие типы
type Border = {
    width?: number;
    color?: string;
    style?: 'solid' | 'dashed' | 'dotted';
};

export type IndicatorProps = React.HTMLAttributes<HTMLDivElement> & {
    /**
     * Значение индикатора
     */
    value?: number | ReactElement;

    /**
     * Цвет значения
     */
    color?: string;

    /**
     * Цвет заливки
     */
    backgroundColor?: string;

    /**
     * Высота компонента, min = 16; max = 48
     */
    height?: number;

    /**
     * Размер компонента
     * @description xs, s, m, l deprecated, используйте вместо них 8, 16, 20, 24, 32, 40 соответственно
     */
    size?: 'xs' | 's' | 'm' | 'l' | 8 | 16 | 20 | 24 | 32 | 40;

    /**
     * Настройки обводки
     */
    border?: boolean | Border;

    /**
     * Пресет компонента
     */
    view?: 'red' | 'grey' | 'white';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

function getSize(height?: number, value?: IndicatorProps['value']) {
    if (!height) {
        return typeof value === 'undefined' ? 8 : 20;
    }

    if (height <= 8) return 8;
    if (height <= 16) return 16;
    if (height <= 20) return 20;
    if (height <= 24) return 24;
    if (height <= 32) return 32;
    if (height <= 40) return 40;

    return 48;
}

function formatValue(rawValue: IndicatorProps['value']) {
    if (typeof rawValue === 'number' && rawValue >= 100) return '99+';

    return rawValue;
}

function borderStyles(
    border: IndicatorProps['border'],
    view?: IndicatorProps['view'],
): CSSProperties {
    if (!border) return {};

    if (typeof border === 'object') {
        return {
            outlineColor: border.color,
            outlineWidth: border.width,
            outlineStyle: border.style || 'solid',
        };
    }

    if (view) return {};

    return {
        outlineWidth: 2,
        outlineColor: 'var(--color-light-base-bg-primary)',
        outlineStyle: 'solid',
    };
}

export const SIZE_TO_CLASSNAME_MAP = {
    xs: 'size-8',
    s: 'size-20',
    m: 'size-24',
    l: 'size-40',
    8: 'size-8',
    16: 'size-16',
    20: 'size-20',
    24: 'size-24',
    32: 'size-32',
    40: 'size-40',
    48: 'size-48',
};

export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(
    (
        {
            value,
            view,
            color,
            backgroundColor,
            height,
            border,
            className,
            dataTestId,
            style,
            size = getSize(height, value) as keyof typeof SIZE_TO_CLASSNAME_MAP,
            ...restProps
        },
        ref,
    ) => {
        const showContent =
            typeof value !== 'undefined' && SIZE_TO_CLASSNAME_MAP[size] !== 'size-8';

        return (
            <div
                ref={ref}
                className={cn(
                    styles.component,
                    styles[SIZE_TO_CLASSNAME_MAP[size]],
                    view && styles[view],
                    border === true && styles.border,
                    className,
                )}
                style={{
                    ...style,
                    ...(!view && {
                        backgroundColor,
                        color,
                    }),
                    height,
                    minWidth: height,
                    ...borderStyles(border, view),
                }}
                data-test-id={dataTestId}
                {...restProps}
            >
                {showContent && <span className={styles.content}>{formatValue(value)}</span>}
            </div>
        );
    },
);

Indicator.displayName = 'Indicator';
