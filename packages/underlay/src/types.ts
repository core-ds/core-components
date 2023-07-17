import React from 'react';

import { BorderColorType, GapType, ShadowType } from '../../types';

export type UnderlayPaddingSize = Exclude<GapType, '7xl' | '8xl'>;
export type UnderlayBorderRadius = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | '3xl';
export type BorderSizeType = 1 | 2 | 4;

type PaddingType = {
    top?: UnderlayPaddingSize;
    right?: UnderlayPaddingSize;
    bottom?: UnderlayPaddingSize;
    left?: UnderlayPaddingSize;
};

export type CornersRadiusType = {
    bottomRight?: UnderlayBorderRadius;
    bottomLeft?: UnderlayBorderRadius;
    topRight?: UnderlayBorderRadius;
    topLeft?: UnderlayBorderRadius;
};

type DimensionsType = {
    width?: number | string;
    height?: number | string;
};

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
    borderRadius?: UnderlayBorderRadius | CornersRadiusType;
    /**
     * Цвет фона у контента
     */
    backgroundColor?: string;
    /**
     * Ссылка на изображение для фона
     */
    backgroundImageURL?: string;
    /**
     * Тень у контента
     */
    shadow?: ShadowType;
    /**
     * Выравнивание контента внутри основного слота.
     */
    axis?: 'vertical' | 'horizontal';
    /**
     * Выравнивание объектов относительно друг-друга
     */
    alignment?: 'start' | 'end' | 'fill' | 'center';
    /**
     * Выравнивание контента
     */
    justifyContent?: 'start' | 'end' | 'center';
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
    borderRadius?: UnderlayBorderRadius | CornersRadiusType;

    /**
     * Цвет фона
     */
    backgroundColor?: string;

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
