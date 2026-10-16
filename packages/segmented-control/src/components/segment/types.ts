import { type ReactElement, type ReactNode } from 'react';

type SegmentAddon = {
    /**
     * Контент аддона
     */
    content: ReactElement;
};
type SegmentAddons = {
    left?: SegmentAddon;
    right?: SegmentAddon;
};

type IDType = string | number;

export interface SegmentProps {
    /**
     * Дополнительный className
     */
    className?: string;

    /**
     * Дополнительный className для контента сегмента
     */
    contentClassName?: string;

    /**
     * ID сегмента
     */
    id: IDType;

    /**
     * Заголовок сегмента
     */
    title: ReactNode;

    /**
     * Контент выбранного сегмента
     */
    children?: ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Аддоны сегмента
     */
    addons?: SegmentAddons;
}
