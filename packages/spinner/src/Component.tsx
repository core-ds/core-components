import React, { FC } from 'react';
import cn from 'classnames';

import { devWarning, fnUtils } from '@alfalab/core-components-shared';
import { useId } from '@alfalab/hooks';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

export interface SpinnerProps {
    /**
     * Палитра, в контексте которой используется спиннер
     * @default default
     */
    colors?: 'default' | 'inverted';

    /**
     * Управление видимостью компонента
     * @default false
     */
    visible?: boolean;

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
     * Размер спиннера (кольца)
     */
    size: number;

    /**
     * Толщина линии спинера (кольца)
     */
    lineWidth: number;

    /**
     * Дополнительные инлайн стили для cпиннера
     */
    style?: React.CSSProperties;
}

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export const Spinner: FC<SpinnerProps> = ({
    size,
    lineWidth,
    style,
    visible,
    id,
    className,
    dataTestId,
    colors = 'default',
}) => {
    const color = style?.color;

    if (!fnUtils.isNil(color)) {
        devWarning(
            `[Spinner]: Палитра, в контексте которой используется спиннер (проп 'colors') игнорируется. Используется цвет 'style.color' ${color}`,
        );
    }
    const uniqId = useId();
    const radius = size / 2 - lineWidth / 2;
    const rotationAngle /* deg */ = Math.ceil((Math.asin(lineWidth / 2 / radius) * 180) / Math.PI);
    const gap /* deg */ = 90;
    const pathLength /* deg */ = 360;
    const strokeDasharray = `${pathLength - gap - rotationAngle} ${gap + rotationAngle}`;
    const gradient = `conic-gradient(from ${rotationAngle}deg, transparent ${
        gap - rotationAngle * 2
    }deg, currentColor)`;

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox={`0 0 ${size} ${size}`}
            style={{ ...style, height: size, width: size }}
            className={cn(styles.spinner, colorStyles[colors].component, className, {
                [styles.visible]: visible,
            })}
            data-test-id={dataTestId}
            id={id}
        >
            <defs>
                <mask id={uniqId}>
                    <circle
                        cx='50%'
                        cy='50%'
                        r={radius}
                        strokeWidth={lineWidth}
                        strokeLinecap='round'
                        stroke='#fff'
                        strokeDashoffset={-rotationAngle}
                        strokeDasharray={strokeDasharray}
                        pathLength={pathLength}
                    />
                </mask>
            </defs>
            <foreignObject x='0' y='0' width={size} height={size} mask={`url(#${uniqId})`}>
                <div className={styles.gradient} style={{ backgroundImage: gradient }} />
            </foreignObject>
        </svg>
    );
};
