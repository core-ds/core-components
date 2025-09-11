import { type ReactNode } from 'react';

/** Обобщенный набор типов который подходит для Steps, но также прокинут в дочерний Step */
export type CommonProps = {
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

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
     * @description Значение 8 устарело и будет удалено в будущих версиях. Используйте 16, 24 или 32.
     */
    minSpaceBetweenSteps?: 8 | 16 | 24 | 32;

    /**
     * Цвет тире выполненного шага
     */
    completedDashColor?: string;
};
