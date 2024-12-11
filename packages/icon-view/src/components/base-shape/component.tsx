import React, { ElementType, forwardRef, Fragment, ReactNode } from 'react';
import cn from 'classnames';

import { useId, useImageLoadingState } from '@alfalab/hooks';

import { getPath, getPathName, PathsMap } from './utils';

import styles from './index.module.css';

// TODO: вынести в общие типы
type Border = {
    width?: number;
    color?: string;
    style?: 'solid' | 'dashed';
};

export type TMainSize = 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80 | 128;

export type BaseShapeProps = {
    /**
     * Размер компонента
     */
    size?: TMainSize | number | { width: TMainSize | number; height: TMainSize | number };

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
     * Сss класс для стилизации обертки иконки
     */
    iconContainerClassName?: string;

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
    mainSize?: TMainSize;
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
            iconContainerClassName,
        },
        ref,
    ) => {
        const [width, height] = typeof size === 'object' ? [size.width, size.height] : [size, size];
        const imageLoadingState = useImageLoadingState({ src: imageUrl || '' });

        const imagePatternId = useId();

        const svgPatternId = useId();

        const hasTopAddons = Boolean(topAddons) && width > 32;

        const hasBottomAddons = Boolean(bottomAddons) && width > 32;

        const hasIndicator = Boolean(indicator) && width < 128;

        const maxDimension = Math.max(width, height);

        const polygonName = getPathName({
            hasTopAddons,
            hasBottomAddons,
            hasIndicator,
        });

        const shapeDPath = getPath(polygonName, maxDimension, pathsMap.shape);

        const borderDPath = getPath(polygonName, maxDimension, pathsMap.border);

        return (
            <div
                className={cn(
                    styles.componentWrapper,
                    styles[`wrapperSize_${maxDimension}`],
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
                            d={shapeDPath}
                        />

                        {imageUrl && imageLoadingState !== 'error' && (
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
                                    d={shapeDPath}
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
                                    d={shapeDPath}
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
                                d={borderDPath}
                            />
                        )}
                    </svg>

                    {text && <div className={styles.text}>{text}</div>}

                    {children && (
                        <div
                            className={cn(
                                styles.children,
                                styles[`childrenSize_${mainSize}`],
                                iconContainerClassName,
                            )}
                        >
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

BaseShape.displayName = 'BaseShape';
