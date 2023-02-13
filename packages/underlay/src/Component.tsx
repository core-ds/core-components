import React, { ReactNode, HTMLAttributes } from 'react';
import cn from 'classnames';

import { BackgroundColorType, BorderColorType, ShadowType, PaddingPropType } from './types';

import styles from './index.module.css';

export type UnderlayProps = HTMLAttributes<HTMLDivElement> & {
    /**
     * Внутренние отступы
     */
    padding?: PaddingPropType;

    /**
     * Радиус
     */
    borderRadius?: 'm' | 'xl' | 'xxl';

    /**
     * Цвет фона
     */
    backgroundColor?: BackgroundColorType;

    /**
     * Ширина бордера
     */
    borderSize?: 1 | 2 | 4;

    /**
     * Цвет бордера
     */
    borderColor?: BorderColorType;

    /**
     * Тень
     */
    shadow?: ShadowType;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     *  Содержимое подложки
     */
    children?: ReactNode;
};

export const Underlay: React.FC<UnderlayProps> = ({
    children,
    borderRadius,
    shadow,
    borderSize,
    backgroundColor,
    borderColor,
    className,
    padding,
    dataTestId,
    ...restProps
}) => {
    const paddingStyles = padding && {
        [styles[`padding-top-${padding.top}`]]: padding.top,
        [styles[`padding-right-${padding.right}`]]: padding.right,
        [styles[`padding-bottom-${padding.bottom}`]]: padding.bottom,
        [styles[`padding-left-${padding.left}`]]: padding.left,
    };

    return (
        <div
            className={cn(
                styles.component,
                paddingStyles,
                backgroundColor && styles[`background-${backgroundColor}`],
                borderRadius && styles[`border-radius-${borderRadius}`],
                borderColor && styles[`border-color-${borderColor}`],
                borderSize && styles[`border-width-${borderSize}`],
                shadow && styles[shadow],
                className,
            )}
            data-test-id={dataTestId}
            {...restProps}
        >
            {children}
        </div>
    );
};
