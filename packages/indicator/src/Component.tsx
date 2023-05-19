import React, { forwardRef, ReactElement } from 'react';
import cn from 'classnames';

import styles from './index.module.css';

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
    border?: {
        width?: number;
        color?: string;
        style?: 'solid' | 'dashed' | 'dotted';
    };

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

export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(
    (
        {
            value,
            color,
            backgroundColor,
            border,
            height,
            view,
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
                className={cn(styles.component, view && styles[view], styles[size], className)}
                style={{
                    ...style,
                    ...(!view && {
                        backgroundColor,
                        color,
                    }),
                    height,
                    minWidth: height,
                }}
                data-test-id={dataTestId}
                {...restProps}
            >
                {showContent && <span className={styles.content}>{formatValue(value)}</span>}
                {border && (
                    <span
                        className={styles.border}
                        style={{
                            ...(!view &&
                                border && {
                                    borderColor: border.color,
                                    borderWidth: border.width,
                                    borderStyle: border.style || 'solid',
                                }),
                        }}
                    />
                )}
            </div>
        );
    },
);
