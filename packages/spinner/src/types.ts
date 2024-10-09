import { CSSProperties } from 'react';

export interface SpinnerProps {
    /**
     * Палитра, в контексте которой используется спиннер
     * @default default
     */
    colors?: 'default' | 'inverted';

    /**
     * Управление видимостью компонента
     * @default false
     */
    visible?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Размер спиннера (кольца)
     */
    size: number;

    /**
     * Толщина линии спинера (кольца)
     */
    lineWidth: number;

    /**
     * Дополнительные инлайн стили для cпиннера
     */
    style?: CSSProperties;
}
