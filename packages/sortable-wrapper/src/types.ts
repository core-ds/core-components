import { Announcements, DragEndEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';

type View = 'primary' | 'secondary';
export type ActivatorNode = 'cell' | 'control';

type Items = Array<{
    id: UniqueIdentifier;
    disabled?: boolean;
}>;

type BorderRadius = 'm' | 'l' | 'xl';

type PaddingSize = '3xs' | '2xs' | 'xs' | 's' | 'm' | 'l';

type Padding = {
    top?: PaddingSize;
    right?: PaddingSize;
    bottom?: PaddingSize;
    left?: PaddingSize;
};

export type SortableWrapperProps = {
    /**
     * Дополнительный класс на контейнер
     */
    className?: string;

    /**
     * Дополнительный класс на элемент списка
     */
    itemClassName?: string;
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
    padding?: Padding;

    /**
     * BorderRadius контролов
     */
    borderRadius?: BorderRadius;

    /**
     * Вид контролов
     */
    view?: View;

    /**
     * Активатор события перетаскивания. Либо элемент целиком, либо только контрол справа
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
