import { type MouseEvent, type ReactNode } from 'react';

export type TFilterButtonSize = 32 | 40;

export type TFilterButtonColors = 'default' | 'inverted';

export type TIndicatorType = 'dot' | 'count';

export type BaseFilterButtonProps = {
    /**
     * Контент (иконка или текст)
     */
    children?: ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Размер
     * @default 40
     * @description высота: 40|32, ширина по умолчанию 40
     */
    size?: TFilterButtonSize;

    /**
     * Набор цветов
     * @default default
     */
    colors?: TFilterButtonColors;

    /**
     * Состояние блокировки
     */
    disabled?: boolean;

    /**
     * Обработчик клика
     */
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Показать индикатор
     */
    indicator?: boolean;

    /**
     * Тип индикатора
     * @default dot
     */
    indicatorType?: TIndicatorType;

    /**
     * Значение индикатора. Если > 9, отображается 9+
     */
    indicatorValue?: number;

    /**
     * Фиксированная ширина 40px
     * @default true
     */
    fixedWidth?: boolean;

    /**
     * Слот списка опций (например, @options-list/)
     * Компонент рендерится рядом с кнопкой; управление его видимостью — на вашей стороне
     */
    optionsList?: ReactNode;
};
