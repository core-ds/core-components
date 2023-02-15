import React from 'react';
import { Announcements, DragEndEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';

type View = 'primary' | 'secondary';
type ActivatorNode = 'cell' | 'control';

export type Items = Array<{
    id: UniqueIdentifier;
    disabled?: boolean;
}>;

type BorderRadius = 'm' | 'l' | 'xl';

type PaddingSize = '3xs' | '2xs' | 'xs' | 's' | 'm' | 'l';

type PaddingObj = {
    top?: PaddingSize;
    right?: PaddingSize;
    bottom?: PaddingSize;
    left?: PaddingSize;
};

type ControlPosition = 'left' | 'right';

export type SortableItemProps = {
    activatorNode: ActivatorNode;
    controlPadding?: PaddingSize;
    controlPosition: ControlPosition;
    children: React.ReactNode;
    className: string;
    id: UniqueIdentifier;
    isDragOverlay?: boolean;
    disabled?: boolean;
    dataTestId?: string;
};

export type SortableListProps = {
    /**
     * Дополнительный класс на контейнер
     */
    className?: string;

    /**
     * Дополнительный класс на элемент списка
     */
    itemClassName?: string;

    /**
     * Отступ контрола от края
     */
    controlPadding?: PaddingSize;

    /**
     * Позиция контрола
     */
    controlPosition?: ControlPosition;

    /**
     * Рендер-функция элемента
     */
    renderItem: (item: Items[number]) => JSX.Element;

    /**
     * Список сортируемых идентификаторов
     */
    items: Items;

    /**
     * Отступы.
     */
    padding?: PaddingObj | PaddingSize;

    /**
     * BorderRadius элементов списка
     */
    borderRadius?: BorderRadius;

    /**
     * Вид
     */
    view?: View;

    /**
     * Активатор события перетаскивания. Либо элемент целиком, либо только контрол
     */
    activatorNode?: ActivatorNode;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Тексты объявления для screen reader
     */
    announcements?: Announcements;

    /**
     * Инструкция для screen reader
     */
    screenReaderInstructions?: string;

    /**
     * Коллбэк, вызываемый при начале процесса перетаскивания
     */
    onDragStart?: (event: DragStartEvent) => void;

    /**
     * Коллбэк, вызываемый по окончании перетаскивания
     */
    onDragEnd?: (event: DragEndEvent, items: Items) => void;
};
