import { type CSSProperties, type ReactElement } from 'react';

import { type SkeletonProps } from '@alfalab/core-components-skeleton';

import { type SegmentProps } from './components';

export interface SegmentedControlProps {
    /**
     * Дополнительный className
     */
    className?: string;

    /**
     * Обработчик смены выбранного сегмента
     */
    onChange: (id: SegmentProps['id']) => void;

    /**
     * ID выбранного сегмента
     */
    selectedId: SegmentProps['id'];

    /**
     * Размер компонента
     * @default 32
     */
    size?: 32 | 40 | 48;

    /**
     * Форма компонента
     */
    shape?: 'rounded' | 'rectangular';

    /**
     * Дочерние элементы
     */
    children: Array<ReactElement<SegmentProps>>;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Дополнительные инлайн стили для враппера
     */
    style?: CSSProperties;

    /**
     * Отключает пользовательский ввод
     * @default false
     */
    disabled?: boolean;

    /**
     * Настройки скелетона
     */
    skeleton?: SkeletonProps;

    /**
     * Вариант отображения
     * @default default
     */
    view?: 'default' | 'muted';

    /**
     * Ширина сегментов: equal — одинаковая, сегменты вместе занимают весь контейнер;
     * content — по ширине контента
     * @default equal
     */
    segmentWidth?: 'equal' | 'content';
}
