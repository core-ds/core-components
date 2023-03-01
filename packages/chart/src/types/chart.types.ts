/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
import { RectangleProps } from 'recharts';
import { DataKey } from 'recharts/types/util/types';

import { DataProps } from './utils/data.types';
import { DotSettingProps } from './utils/dot.types';

type CurveType = 'linear' | 'monotone' | 'step';

export type RectangleShapeType =
    | ReactElement<SVGElement>
    | ((props: any) => ReactElement<SVGElement>)
    | RectangleProps
    | boolean;

export interface ChartProps {
    /**
     * Название графика (отображается в легендах и тултипе)
     */
    name?: string;

    /**
     * Ключ данных
     */
    dataKey: DataKey<number | string>;

    /**
     * Цвет заливки графика
     */
    fill?: string;

    /**
     * Цвет линии графика
     */
    stroke?: string;

    /**
     * Отображение точек на графике
     */
    dot?: boolean;

    /**
     * Параметры для точек грфика (если dot: true)
     */
    dotSettings?: DotSettingProps[] | DotSettingProps;

    /**
     * Наследование цвета
     */
    inheritStroke?: boolean;

    /**
     * Форматирование значения графика для тултипа
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    formatter?: Function;

    /**
     * Тип линии
     */
    type?: CurveType;

    /**
     * Толщина линии
     */
    strokeWidth?: number;

    /**
     * Прерывистость линии
     */
    strokeDasharray?: string | number;
}

export interface ToggleChartProps {
    chart?: 'line' | 'area' | 'bar' | 'gradient';
    data?: DataProps[];
    icon?: 'circleLine' | 'filledCircle' | 'strokeCircle' | 'circle';
    order?: number;
    properties: ChartProps;
}
