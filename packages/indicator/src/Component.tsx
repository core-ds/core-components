import React, { CSSProperties, forwardRef, ReactElement } from 'react';
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
     */
    size?: 'xs' | 's' | 'm' | 'l';

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
        return typeof value === 'undefined' ? 'xs' : 's';
    }

    if (height <= 8) return 'xs';
    if (height <= 18) return 's';
    if (height <= 24) return 'm';
    if (height <= 32) return 'l';
    if (height <= 40) return 'xl';

    return 'xxl';
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
        outlineColor: 'var(--color-light-graphic-primary)',
        outlineStyle: 'solid',
    };
}

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
            size = getSize(height, value),
            ...restProps
        },
        ref,
    ) => {
        const showContent = typeof value !== 'undefined' && size !== 'xs';

        return (
            <div
                ref={ref}
                className={cn(
                    styles.component,
                    styles[size],
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
