import React, { ElementType, forwardRef, Fragment, ReactNode } from 'react';
import cn from 'classnames';

import { useId } from '@alfalab/hooks';

import { getPath, PathsMap } from './utils';

import styles from './index.module.css';

// TODO: вынести в общие типы
type Border = {
    width?: number;
    color?: string;
    style?: 'solid' | 'dashed';
};

export type BaseShapeProps = {
    /**
     * Размер компонента
     */
    size?: number | { width: number; height: number };

    /**
     * Цвет заливки
     * @default #f3f4f5
     */
    backgroundColor?: string;

    /**
     * Дополнительный класс для стилизации формы шейпа.
     */
    shapeClassName?: string;

    /**
     * Видимость обводки
     * @default false
     */
    border?: boolean | Border;

    /**
     * Фоновое изображение. Имеет приоритет над иконкой и заливкой
     */
    imageUrl?: string;

    /**
     * Фоновое svg. Имеет приоритет над иконкой и заливкой
     */
    backgroundIcon?: ElementType;

    /**
     * Сss класс для стилизации общей обёртки
     */
    className?: string;

    /**
     * Слот сверху
     */
    topAddons?: ReactNode;

    /**
     * Слот снизу
     */
    bottomAddons?: ReactNode;

    /**
     * Слот индикатора сверху
     */
    indicator?: ReactNode;

    /**
     * Фигуры
     */
    pathsMap: PathsMap;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Дочерние элементы.
     */
    children?: ReactNode;

    /**
     * Текст
     */
    text?: ReactNode;

    /**
     * Размер основного слота
     */
    mainSize?: 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | 80 | 128;
};

export const BaseShape = forwardRef<HTMLDivElement, BaseShapeProps>(
    (
        {
            size = 64,
            border = false,
            backgroundColor,
            imageUrl,
            backgroundIcon: Icon,
            className,
            shapeClassName,
            text,
            children,
            topAddons,
            bottomAddons,
            indicator,
            pathsMap,
            dataTestId,
            mainSize,
        },
        ref,
    ) => {
        const [width, height] = typeof size === 'object' ? [size.width, size.height] : [size, size];

        const imagePatternId = useId();

        const svgPatternId = useId();

        const hasTopAddons = Boolean(topAddons) && width > 32;

        const hasBottomAddons = Boolean(bottomAddons) && width > 32;

        const hasIndicator = Boolean(indicator) && width < 128;

        return (
            <div
                className={cn(
                    styles.componentWrapper,
                    styles[`size_${Math.max(width, height)}`],
                    className,
                )}
                ref={ref}
                data-test-id={dataTestId}
            >
                <div className={styles.component} style={{ width, height }}>
                    <svg
                        width={width}
                        height={height}
                        viewBox={`0 0 ${width} ${height}`}
                        xmlns='http://www.w3.org/2000/svg'
                        focusable={false}
                    >
                        <path
                            className={cn(styles.bg, shapeClassName)}
                            style={{
                                fill: backgroundColor,
                            }}
                            d={getPath({
                                size: Math.max(width, height),
                                hasTopAddons,
                                hasBottomAddons,
                                hasIndicator,
                                pathsMap: pathsMap.shape,
                            })}
                        />

                        {imageUrl && (
                            <Fragment>
                                <defs>
                                    <pattern id={imagePatternId} width='100%' height='100%'>
                                        <image
                                            href={imageUrl}
                                            width='100%'
                                            height='100%'
                                            preserveAspectRatio='xMidYMid slice'
                                        />
                                    </pattern>
                                </defs>

                                <path
                                    style={{
                                        fill: `url(#${imagePatternId})`,
                                    }}
                                    d={getPath({
                                        size: Math.max(width, height),
                                        hasTopAddons,
                                        hasBottomAddons,
                                        hasIndicator,
                                        pathsMap: pathsMap.shape,
                                    })}
                                />
                            </Fragment>
                        )}

                        {Icon && (
                            <Fragment>
                                <defs>
                                    <pattern id={svgPatternId} width='100%' height='100%'>
                                        <Icon width={width} height={height} />
                                    </pattern>
                                </defs>

                                <path
                                    style={{
                                        fill: `url(#${svgPatternId})`,
                                    }}
                                    d={getPath({
                                        size: Math.max(width, height),
                                        hasTopAddons,
                                        hasBottomAddons,
                                        hasIndicator,
                                        pathsMap: pathsMap.shape,
                                    })}
                                />
                            </Fragment>
                        )}

                        {border && (
                            <path
                                className={styles.border}
                                style={
                                    typeof border === 'object'
                                        ? {
                                              stroke: border.color,
                                              strokeWidth: border.width,
                                          }
                                        : undefined
                                }
                                d={getPath({
                                    size: Math.max(width, height),
                                    hasTopAddons,
                                    hasBottomAddons,
                                    hasIndicator,
                                    pathsMap: pathsMap.border,
                                })}
                            />
                        )}
                    </svg>

                    {text && <div className={styles.text}>{text}</div>}

                    {children && (
                        <div className={cn(styles.children, styles[`size-${mainSize}`])}>
                            {children}
                        </div>
                    )}
                </div>

                {hasTopAddons && (
                    <div className={cn(styles.addons, styles.topAddons)}>{topAddons}</div>
                )}

                {hasBottomAddons && (
                    <div className={cn(styles.addons, styles.bottomAddons)}>{bottomAddons}</div>
                )}

                {hasIndicator && !hasTopAddons && (
                    <div className={cn(styles.addons, styles.indicator)}>{indicator}</div>
                )}
            </div>
        );
    },
);
