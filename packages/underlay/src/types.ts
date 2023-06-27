import React from 'react';

import { BackgroundColorType, BorderColorType, GapType, ShadowType } from '../../types';

type PaddingSize = Omit<GapType, '5xl' | '6xl' | '7xl' | '8xl'>;

type PaddingType = {
    top?: PaddingSize;
    right?: PaddingSize;
    bottom?: PaddingSize;
    left?: PaddingSize;
};

type BorderRadiusType = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | '3xl';

type DimensionsType = {
    width?: number;
    height?: number;
};

type BorderSizeType = 1 | 2 | 4;

export type ContentPropsType = {
    /**
     * Ширина бордера у контента
     */
    borderSize?: BorderSizeType;
    /**
     * Цвет бордера у контента
     */
    borderColor?: BorderColorType;
    /**
     * Радиус бордера у контента
     */
    borderRadius?: BorderRadiusType;
    /**
     * Цвет фона у контента
     */
    backgroundColor?: BackgroundColorType;
    /**
     * Ссылка на изображение для фона
     */
    backgroundImageURL?: string;
    /**
     * Тень у контента
     */
    shadow?: ShadowType;
    /**
     * Направление контента
     */
    direction?: 'vertical' | 'horizontal';
    /**
     * Выравнивание контента по вертикали
     */
    alignItems?: 'top' | 'middle' | 'bottom';
    /**
     * Выравнивание контента по горизонтали
     */
    justifyContent?: 'center' | 'left' | 'right';
};

export type UnderlayProps = React.HTMLAttributes<HTMLDivElement> & {
    /**
     * Размеры подложки
     */
    dimensions?: DimensionsType;
    /**
     * Внутренние отступы
     */
    padding?: PaddingType | string;

    /**
     * Радиус бордера
     */
    borderRadius?: BorderRadiusType;

    /**
     * Цвет фона
     */
    backgroundColor?: BackgroundColorType;

    /**
     * Ширина бордера
     */
    borderSize?: BorderSizeType;

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
     * Пропсы для стилизации контента подложки
     */
    contentProps?: ContentPropsType;

    /**
     *  Содержимое подложки
     */
    children?: React.ReactNode;
};
