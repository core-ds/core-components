import React from 'react';

import { BackgroundColorType, BorderColorType, GapType, ShadowType } from '../../types';

type PaddingSize = Omit<GapType, '5xl' | '6xl' | '7xl' | '8xl'>;

type PaddingType = {
    top?: PaddingSize;
    right?: PaddingSize;
    bottom?: PaddingSize;
    left?: PaddingSize;
};

type BorderRadiusType = 'm' | 'l' | 'xl' | 'xxl';

export type UnderlayProps = React.HTMLAttributes<HTMLDivElement> & {
    /**
     * Внутренние отступы
     */
    padding?: PaddingType | string;

    /**
     * Радиус
     */
    borderRadius?: BorderRadiusType;

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
     * Настройка переполнения (true - разрешена)
     * default: true
     */
    overflow?: boolean;

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
    children?: React.ReactNode;
};
