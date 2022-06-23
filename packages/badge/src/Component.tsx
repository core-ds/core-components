import React from 'react';
import cn from 'classnames';

import styles from './index.module.css';

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
     * Цветовое оформление иконки
     */
    iconColor?:
        | 'positive'
        | 'attention'
        | 'link'
        | 'negative'
        | 'tertiary'
        | 'secondary'
        | 'primary';

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Badge = ({
    className,
    size = 'm',
    view,
    visibleIconOutline = false,
    visibleColorOutline = false,
    content,
    height = 16,
    iconColor,
    dataTestId,
}: BadgeProps) => {
    const isCountView = view === 'count';

    const isHidden = isCountView && typeof content === 'number' && content <= 0;
    const componentContent = isCountView && content && content >= 100 ? '99+' : content;
    const isHeightS = isCountView && height >= 16 && height <= 17;
    const isHeightM = isCountView && height >= 18 && height <= 24;
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
                    [styles.outlineColor]: visibleColorOutline,
                    [styles.outlineCount]: isCountView && visibleIconOutline,
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
                    iconColor && styles[iconColor],
                    isHeightS && styles.heightS,
                    isHeightM && styles.heightM,
                    isHeightL && styles.heightL,
                    isHeightXL && styles.heightXL,
                    isHeightXXL && styles.heightXXL,
                    {
                        [styles.isHidden]: isHidden,
                        [styles.dot]: !content,
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
