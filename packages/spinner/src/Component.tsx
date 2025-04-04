import React, { FC } from 'react';
import { devWarning, hasOwnProperty, isNonNullable } from '@balafla/core-components-shared';
import cn from 'classnames';

import { useId } from '@alfalab/hooks';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';
import presetStyles from './preset.module.css';

export type SpinnerProps =
    | {
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
           * Дополнительные инлайн стили для cпиннера
           */
          style?: React.CSSProperties;
      } & (
          | {
                /**
                 * Размер спиннера (кольца)
                 */
                size: number;

                /**
                 * Толщина линии спинера (кольца)
                 */
                lineWidth: number;
            }
          | {
                /**
                 * Преднастроенный вариант
                 */
                preset: 16 | 24 | 48;
            }
      );

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

const PRESET_CONFIG = {
    16: [2, 14, 'preset16'],
    24: [2, 20, 'preset24'],
    48: [4, 40, 'preset48'],
} as const;

export const Spinner: FC<SpinnerProps> = (props) => {
    const { style, visible, id, className, dataTestId, colors = 'default' } = props;
    let size: number;
    let lineWidth: number;
    let presetClassname: string | undefined;

    if (hasOwnProperty(props, 'preset')) {
        const { preset } = props;
        const config = PRESET_CONFIG[preset];
        const [, , styleKey] = config;

        [lineWidth, size] = config;
        presetClassname = presetStyles[styleKey];
    } else {
        size = props.size;
        lineWidth = props.lineWidth;
    }

    const color = style?.color;

    if (isNonNullable(color)) {
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
            className={cn(
                styles.spinner,
                colorStyles[colors].component,
                presetClassname,
                className,
                { [styles.visible]: visible },
            )}
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
