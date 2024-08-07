import React, { FC } from 'react';
import cn from 'classnames';

import { useId } from '@alfalab/hooks';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type SpinnerProps = {
    /**
     * Управление видимостью компонента
     */
    visible?: boolean;

    /**
     * Размер компонента
     * @description xs, s, m deprecated, используйте вместо них 16, 24, 48 соответственно
     */
    size?: 'xs' | 's' | 'm' | 16 | 24 | 48;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Палитра, в контексте которой используется спиннер
     */
    colors?: 'default' | 'inverted';
};

const CONFIG = {
    xs: {
        padding: 1,
        lineWidth: 2,
        size: 18,
    },
    s: {
        padding: 2,
        lineWidth: 2,
        size: 24,
    },
    m: {
        padding: 4,
        lineWidth: 4,
        size: 48,
    },
    16: {
        padding: 1,
        lineWidth: 2,
        size: 18,
    },
    24: {
        padding: 2,
        lineWidth: 2,
        size: 24,
    },
    48: {
        padding: 4,
        lineWidth: 4,
        size: 48,
    },
} as const;

export const SIZE_TO_CLASSNAME_MAP = {
    xs: 'size-16',
    s: 'size-24',
    m: 'size-48',
    16: 'size-16',
    24: 'size-24',
    48: 'size-48',
};

export const Spinner: FC<SpinnerProps> = ({
    size: sizeFromProps = 24,
    colors = 'default',
    visible,
    id,
    className,
    dataTestId,
}) => {
    const uniqId = useId();
    const { size, padding, lineWidth } = CONFIG[sizeFromProps];
    const spinnerSize = size - padding * 2;
    const spinnerOrigin = spinnerSize / 2 + padding;
    const spinnerRadius = spinnerSize / 2 - lineWidth / 2;
    const rotationAngle /* deg */ = Math.ceil(
        (Math.asin(lineWidth / 2 / spinnerRadius) * 180) / Math.PI,
    );
    const gap /* deg */ = 2;

    return (
        <svg
            viewBox={`0 0 ${size} ${size}`}
            xmlns='http://www.w3.org/2000/svg'
            className={cn(
                styles.spinner,
                colorStyles[colors].component,
                styles[SIZE_TO_CLASSNAME_MAP[sizeFromProps]],
                className,
                {
                    [styles.visible]: visible,
                },
            )}
            data-test-id={dataTestId}
            id={id}
        >
            <defs>
                <mask id={uniqId}>
                    <circle
                        cx={spinnerOrigin}
                        cy={spinnerOrigin}
                        r={spinnerRadius}
                        strokeWidth={lineWidth}
                        stroke='#fff'
                        strokeLinecap='round'
                        pathLength='360'
                        strokeDasharray={`${Math.min(270, 360 - rotationAngle * 2) - gap} ${
                            rotationAngle * 2 + gap
                        }`}
                    />
                </mask>
            </defs>
            <foreignObject x='0' y='0' width={size} height={size} mask={`url(#${uniqId})`}>
                <div
                    className={styles.gradient}
                    style={{
                        transform: `rotate(${
                            Math.min(90 - rotationAngle, rotationAngle) - gap / 2
                        }deg)`,
                    }}
                />
            </foreignObject>
        </svg>
    );
};
