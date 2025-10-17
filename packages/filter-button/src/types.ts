import { type AriaAttributes, type ReactNode } from 'react';

import { type IndicatorProps } from '@alfalab/core-components-indicator';

export type TFilterButtonSize = 32 | 40;

export type TFilterButtonColors = 'default' | 'inverted';

export type TMaskVariant = 'none' | 'dot' | 'count';
export type TPathMask = 'rectangle';

export interface BaseFilterButtonProps extends AriaAttributes {
    /**
     * Контент
     */
    children?: ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Размер компонента
     * @default 40
     * @description высота: 32, 40, ширина по умолчанию 40
     */
    size: TFilterButtonSize;

    /**
     * Набор цветов для компонента
     * @default default
     */
    colors?: TFilterButtonColors;

    // /**
    //  * Состояние блокировки
    //  */
    // disabled?: boolean;

    /**
     * Пропсы для компонента Indicator
     */
    indicatorProps?: Partial<Omit<IndicatorProps, 'size'>>;

    // /**
    //  * Обработчик клика
    //  * @description Должен открывать модальное окно со списком всех фильтров
    //  */
    // onClick?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Маска
     */
    pathMask?: TPathMask;
}
