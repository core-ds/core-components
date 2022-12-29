import React, { ElementType, forwardRef, Fragment, ReactNode } from 'react';
import cn from 'classnames';
import { getPath, PathsMap } from './utils';

import styles from './index.module.css';

export type BaseShapeProps = {
    /**
     * Размер компонента
     */
    size?: number;

    /**
     * Цвет заливки
     * @default #f3f4f5
     */
    backgroundColor?: string;

    /**
     * Видимость обводки
     * @default false
     */
    border?: boolean;

    /**
     * Фоновое изображение. Имеет приоритет над иконкой и заливкой
     */
    imageUrl?: string;

    /**
     * Фоновое svg. Имеет приоритет над иконкой и заливкой
     */
    backgroundIcon?: ElementType<{ width?: number; height?: number }>;

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
};

export const BaseShape = forwardRef<HTMLDivElement, BaseShapeProps>(
    (
        {
            size = 64,
            border = false,
            backgroundColor = 'var(--color-light-bg-secondary)',
            imageUrl,
            backgroundIcon: Icon,
            className,
            children,
            topAddons,
            bottomAddons,
            indicator,
            pathsMap,
            dataTestId,
        },
        ref,
    ) => {
        const imagePatternId = imageUrl && `${imageUrl.replace(/[^a-z0-9]+/g, '')}_${size}`;

        const svgPatternId = Icon && `svg_${size}`;

        const hasTopAddons = Boolean(topAddons) && size > 32;

        const hasBottomAddons = Boolean(bottomAddons) && size > 32;

        const hasIndicator = Boolean(indicator) && size < 128;
        return (
            <div
                className={cn(styles.componentWrapper, styles[`size_${size}`], className)}
                ref={ref}
                data-test-id={dataTestId}
            >
                <div className={styles.component}>
                    <svg
                        width={size}
                        height={size}
                        viewBox={`0 0 ${size} ${size}`}
                        xmlns='http://www.w3.org/2000/svg'
                        focusable={false}
                    >
                        <path
                            className={styles.bg}
                            style={{
                                fill: backgroundColor,
                            }}
                            d={getPath({
                                size,
                                hasTopAddons,
                                hasBottomAddons,
                                hasIndicator,
                                pathsMap: pathsMap.shape,
                            })}
                        />

                        {imagePatternId && (
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
                                        size,
                                        hasTopAddons,
                                        hasBottomAddons,
                                        hasIndicator,
                                        pathsMap: pathsMap.shape,
                                    })}
                                />
                            </Fragment>
                        )}

                        {Icon && !imageUrl && (
                            <Fragment>
                                <defs>
                                    <pattern id={svgPatternId} width='100%' height='100%'>
                                        <Icon width={size} height={size} />
                                    </pattern>
                                </defs>

                                <path
                                    style={{
                                        fill: `url(#${svgPatternId})`,
                                    }}
                                    d={getPath({
                                        size,
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
                                d={getPath({
                                    size,
                                    hasTopAddons,
                                    hasBottomAddons,
                                    hasIndicator,
                                    pathsMap: pathsMap.border,
                                })}
                            />
                        )}
                    </svg>

                    {!imageUrl && !Icon && <div className={styles.children}>{children}</div>}
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
