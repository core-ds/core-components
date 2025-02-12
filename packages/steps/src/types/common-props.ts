import { ReactNode } from 'react';

/** Обобщенный набор типов который подходит для Steps, но также прокинут в дочерний Step */
export type CommonProps = {
    /**
     * Дочерние элементы
     */
    children: ReactNode;

    /**
     * Управление ориентацией компонента
     * @default false
     */
    isVerticalAlign?: boolean;

    /**
     * Управление отображением номера шага
     */
    ordered?: boolean;

    /**
     * Включение / отключение интерактивности шагов
     */
    interactive?: boolean;

    /**
     * Растягивание шагов на всю ширину блока для вертикальной ориентации
     * @default false
     */
    fullWidth?: boolean;

    /**
     * Минимальное расстояние между шагами для горизонтального расположения компонента
     * @default 24
     * @description Значение `8` `deprecated` и более не учитывается в расчетах отступов
     */
    minSpaceBetweenSteps?: 8 | 16 | 24 | 32;

    /**
     * Цвет тире выполненного шага
     */
    completedDashColor?: string;
};
