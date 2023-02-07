import React, { ReactNode, MouseEvent } from 'react';
import cn from 'classnames';

import {
    BackgroundColorType,
    BorderColorType,
    ShadowType,
    PaddingPropType,
    BORDER_COLOR,
    BACKGROUND,
    SHADOW,
} from './types';

import background from './background.module.css';
import border from './border.module.css';
import boxShadow from './shadow.module.css';
import styles from './index.module.css';

export type UnderlayProps = {
    /**
     * Внутренние отступы
     */
    padding?: PaddingPropType;

    /**
     * Высота компонента
     */
    height?: number | string;

    /**
     * Ширина компонента
     */
    width?: number | string;

    /**
     * Радиус
     */
    borderRadius?: 0 | 8 | 16 | 20;

    /**
     * Цвет фона
     */
    backgroundColor?: BackgroundColorType | string;

    /**
     * Ширина бордера
     */
    borderSize?: 1 | 2 | 4 | 'none';

    /**
     * Цвет бордера
     */
    borderColor?: BorderColorType | string;

    /**
     * Тень
     */
    shadow?: ShadowType | string;

    /**
     * Фоновое изображение. Имеет приоритет над заливкой
     */
    imageUrl?: string;

    /**
     * Обработчик клика
     */
    onClick?: (event?: MouseEvent<HTMLDivElement>) => void;

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

export const UnderlayWrapper: React.FC<UnderlayProps> = ({
    children,
    borderRadius,
    imageUrl,
    shadow = 'none',
    borderSize = 'none',
    backgroundColor = 'none',
    borderColor = 'none',
    width,
    height,
    className,
    padding,
    onClick,
    dataTestId,
}) => {
    const tokenShadow = !SHADOW.includes(shadow as ShadowType);
    const tokenBorderColor = !BORDER_COLOR.includes(borderColor as BorderColorType);
    const tokenBackground = !BACKGROUND.includes(backgroundColor as BackgroundColorType);

    const handleClick = (
        event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    ) => {
        if (onClick) {
            onClick(event as React.MouseEvent<HTMLDivElement>);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleClick(event);
        }
    };

    return (
        <div
            className={cn(
                styles.component,
                {
                    [styles.cursorPointer]: onClick,
                    [styles.backgroundImage]: imageUrl,
                    [border[`border-radius-${borderRadius}`]]: borderRadius,
                },
                background[backgroundColor],
                border[borderColor],
                border[`border-width-${borderSize}`],
                boxShadow[shadow],
                className,
            )}
            style={{
                ...(width && { width }),
                ...(height && { height }),
                ...(tokenBorderColor && { borderColor }),
                ...(tokenShadow && { boxShadow: shadow }),
                ...(tokenBackground && { backgroundColor }),
                ...(imageUrl && { backgroundImage: `url(${imageUrl})` }),
                ...(padding?.bottom && { paddingBottom: `${padding.bottom}px` }),
                ...(padding?.right && { paddingRight: `${padding.right}px` }),
                ...(padding?.left && { paddingLeft: `${padding.left}px` }),
                ...(padding?.top && { paddingTop: `${padding.top}px` }),
            }}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role='button'
            data-test-id={dataTestId}
        >
            {children}
        </div>
    );
};
