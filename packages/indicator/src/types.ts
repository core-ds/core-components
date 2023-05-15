import React, { ReactElement } from 'react';

import { BorderColorType } from '../../types';

// TODO: нужно составить список общих типов, цветов и т.д.
type BorderType = {
    width?: number;
    color?: BorderColorType;
    style?: 'solid' | 'dashed' | 'dotted';
};

export type IndicatorProps = React.HTMLAttributes<HTMLDivElement> & {
    /**
     * Значение индикатора
     */
    value?: number | ReactElement;

    /**
     * Цвет значения
     */
    color?: string;

    /**
     * Цвет заливки
     */
    backgroundColor?: string;

    /**
     * Высота компонента, min = 16; max = 48 (только для view=count)
     */
    height?: number;

    /**
     * Настройки обводки
     */
    border?: BorderType;

    /**
     * Пресет компонента
     */
    view?: 'red' | 'grey' | 'white';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
