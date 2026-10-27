import { type ReactNode } from 'react';

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
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;
}
