export interface CartesianGridProps {
    /**
     * Отображение горизонтальной сетки
     */
    horizontal?: boolean;

    /**
     * Отображение вертикальной сетки
     */
    vertical?: boolean;

    /**
     * Штрихи для осей
     */
    strokeDasharray?: string;

    /**
     * Цвет разметки сетки
     */
    stroke?: string;

    /**
     * Цвет заливки графика
     */
    fill?: string;
}
