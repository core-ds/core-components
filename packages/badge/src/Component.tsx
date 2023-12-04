import React from 'react';
import cn from 'classnames';

import { BackgroundColorType, GraphicColorType } from '../../types';

import styles from './index.module.css';

export type IconColorType = Extract<
    GraphicColorType,
    'positive' | 'attention' | 'link' | 'negative' | 'tertiary' | 'secondary' | 'primary'
>;

export type BadgeProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     *  Вид компонента
     */
    view: 'icon' | 'count';

    /**
     * Размер компонента (только для view=icon)
     * //deprecated(используйте height для view=count )
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     *  Видимость белой обводки вокруг иконки
     */
    visibleIconOutline?: boolean;

    /**
     *  Видимость цветной обводки вокруг иконки (только для view=icon)
     */
    visibleColorOutline?: boolean;

    /**
     * Контент компонента
     */
    content?: React.ReactElement | number;

    /**
     * Высота компонента, min = 16; max = 48 (только для view=count)
     */
    height?: number;

    /**
     * Цветовое оформление бейджа при view='count'
     */
    color?: Extract<BackgroundColorType, 'accent' | 'primary' | 'specialbg-secondary-transparent'>;

    /**
     * Цветовое оформление бейджа при view='icon'
     */
    iconColor?: IconColorType;

    /**
     * Цвет подложки под иконкой
     */
    iconUnderlayColor?: Extract<GraphicColorType, 'primary' | 'static-light'>;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

/**
 * @deprecated Используйте StatusBadge или Indicator
 */
// eslint-disable-next-line complexity
export const Badge = ({
    className,
    size = 'm',
    view,
    visibleIconOutline = false,
    visibleColorOutline = false,
    content,
    height = 16,
    iconColor,
    color = 'accent',
    iconUnderlayColor = 'static-light',
    dataTestId,
}: BadgeProps) => {
    const isCountView = view === 'count';

    const isHidden = isCountView && typeof content === 'number' && content <= 0;
    const componentContent = isCountView && content && content >= 100 ? '99+' : content;
    const isHeightS = isCountView && height >= 16 && height <= 18;
    const isHeightM = isCountView && height >= 19 && height <= 24;
    const isHeightL = isCountView && height >= 25 && height <= 32;
    const isHeightXL = isCountView && height >= 33 && height <= 40;
    const isHeightXXL = isCountView && height >= 41 && height <= 48;

    return (
        <div
            className={cn(
                !isCountView && styles.wrapper,
                iconColor && styles[iconColor],
                {
                    [styles[size]]: !isCountView,
                    [styles.outline]: !isCountView && visibleIconOutline,
                    [styles.outlineColor]: !isCountView && visibleColorOutline,
                    [styles.count]: isCountView,
                },
                className,
            )}
            data-test-id={dataTestId}
        >
            <div
                className={cn(
                    styles.component,
                    styles[size],
                    styles[view],
                    styles[`background-${color}`],
                    styles[`graphic-${iconUnderlayColor}`],
                    iconColor && styles[iconColor],
                    isHeightS && styles.heightS,
                    isHeightM && styles.heightM,
                    isHeightL && styles.heightL,
                    isHeightXL && styles.heightXL,
                    isHeightXXL && styles.heightXXL,
                    {
                        [styles.isHidden]: isHidden,
                        [styles.dot]: !content,
                        [styles.outlineCount]: isCountView && visibleIconOutline,
                    },
                )}
                style={{
                    ...(isCountView && content && { height, minWidth: height }),
                }}
            >
                {componentContent}
            </div>
        </div>
    );
};
