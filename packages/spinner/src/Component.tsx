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
     */
    size?: 'xs' | 's' | 'm';

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
} as const;

export const Spinner: FC<SpinnerProps> = ({
    size: sizeProp = 's',
    colors = 'default',
    visible,
    id,
    className,
    dataTestId,
}) => {
    const uniqId = useId();
    const { size, padding, lineWidth } = CONFIG[sizeProp];

    const xStart = padding + lineWidth / 2;
    const xEnd = size - xStart;
    const y = size / 2;
    const r = y - xStart;

    const topGradientId = `${uniqId}_top`;
    const bottomGradientId = `${uniqId}_bottom`;

    return (
        <svg
            viewBox={`0 0 ${size} ${size}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={cn(
                styles.spinner,
                colorStyles[colors].component,
                styles[sizeProp],
                className,
                {
                    [styles.visible]: visible,
                },
            )}
            data-test-id={dataTestId}
            id={id}
        >
            <defs>
                <linearGradient id={topGradientId} x1='0.05'>
                    <stop offset='0.1' stopOpacity='0' stopColor='currentColor' />
                    <stop offset='1' stopOpacity='0.3' stopColor='currentColor' />
                </linearGradient>
                <linearGradient id={bottomGradientId} x1='0.05'>
                    <stop offset='0' stopOpacity='1' stopColor='currentColor' />
                    <stop offset='1' stopOpacity='0.3' stopColor='currentColor' />
                </linearGradient>
            </defs>

            <g strokeWidth={lineWidth}>
                <path
                    stroke={`url(#${topGradientId})`}
                    d={`M${xStart},${y} A${r},${r} 0 0 1 ${xEnd},${y}`}
                />
                <path
                    stroke={`url(#${bottomGradientId})`}
                    d={`M${xEnd},${y} A${r},${r} 0 0 1 ${xStart},${y}`}
                />
                <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    d={`M${xStart},${y} A${r},${r} 0 0 1 ${xStart} ${y}`}
                />
            </g>
        </svg>
    );
};
