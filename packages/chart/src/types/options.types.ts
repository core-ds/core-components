import type React from 'react';

import { type BrushProps } from './brush.types';
import { type CartesianGridProps } from './cartesianGrid.types';
import { type ComposedChartProps } from './composedChart.types';
import { type LegendProps } from './legend.types';
import { type ResponsiveContainerProps } from './responsiveContainer.types';
import { type SeriaProps } from './seria.types';
import { type TooltipProps } from './tooltip.types';
import { type XAxisProps } from './xAxis.types';
import { type YAxisProps } from './yAxis.types';

export interface OptionsProps {
    /**
     * Индефикатор графика
     */
    id: string;

    /**
     * Компонент контейнера, позволяющий адаптировать диаграммы к размеру родительского контейнера
     */
    responsiveContainer?: ResponsiveContainerProps;

    /**
     * Диаграмма, состоящая из bar, linear и area диаграмм
     */
    composeChart: ComposedChartProps;

    /**
     * Отображение линий осей графика
     */
    cartesianGrid?: CartesianGridProps;

    /**
     * Настройки оси Х
     */
    xAxis: XAxisProps;

    /**
     * Настройки оси У
     */
    yAxis: YAxisProps;

    /**
     * Всплывающаяся подсказка
     */
    tooltip?: TooltipProps;

    /**
     * Компонент маштабирования графика
     */
    brush?: BrushProps;

    /**
     * Компонент подписи графиков
     */
    legend?: LegendProps;

    /**
     * Mассив объектов с параметрами грaфиков с обязательным полем
     */
    series: SeriaProps[];

    /**
     * Mассив меток
     */
    labels: Array<string | number>;
    children?: React.ReactNode;
}
