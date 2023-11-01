import React, { forwardRef } from 'react';
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import cn from 'classnames';

import { Portal } from '@alfalab/core-components-portal';
import { getDataTestId } from '@alfalab/core-components-shared';

import { SortableItem } from './components/item/Components';
import type { Items, SortableItemProps, SortableListProps } from './types';
import { restrictToParentElement, restrictToVerticalAxis } from './utils';

import styles from './index.module.css';

const DEFAULT_INSTRUCTION =
    'Чтобы выбрать перетаскиваемый элемент, нажмите пробел.\n' +
    'При перетаскивании используйте клавиши со стрелками для перемещения элемента.\n' +
    'Снова нажмите пробел, чтобы переместить элемент в его новое положение или нажмите escape для отмены.';

const DEFAULT_ANNOUNCEMENTS = {
    onDragStart({ active }: DragStartEvent) {
        return `Выбран элемент ${active.id}.`;
    },
    onDragOver({ active, over }: DragOverEvent) {
        if (over) {
            return `Выбранный элемент ${active.id} находится над элементом ${over.id}.`;
        }

        return `Выбранный элемент ${active.id} находится за пределами droppable зоны.`;
    },
    onDragEnd({ active, over }: DragEndEvent) {
        if (over) {
            return `Выбранный элемент ${active.id} был перемещен на место ${over.id}`;
        }

        return `Выбранный элемент ${active.id} не был перемещен.`;
    },
    onDragCancel() {
        return 'Перемещение было отменено';
    },
};

export const SortableList = forwardRef<HTMLDivElement, SortableListProps>(
    (
        {
            className,
            itemClassName,
            controlPosition = 'right',
            controlPadding,
            items,
            renderItem,
            borderRadius,
            activatorNode = 'cell',
            view = 'primary',
            padding,
            dataTestId,
            announcements = DEFAULT_ANNOUNCEMENTS,
            screenReaderInstructions = DEFAULT_INSTRUCTION,
            onDragStart,
            onDragEnd,
            portalProps,
            dragOverlayProps,
        },
        ref,
    ) => {
        const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);
        const sensors = useSensors(
            useSensor(KeyboardSensor),
            useSensor(TouchSensor),
            useSensor(MouseSensor),
        );

        const getPaddingClassName = () => {
            if (typeof padding === 'object') {
                return cn({
                    [styles[`padding-top-${padding.top}`]]: padding.top,
                    [styles[`padding-right-${padding.right}`]]: padding.right,
                    [styles[`padding-bottom-${padding.bottom}`]]: padding.bottom,
                    [styles[`padding-left-${padding.left}`]]: padding.left,
                });
            }

            if (typeof padding === 'string') {
                return cn(
                    styles[`padding-top-${padding}`],
                    styles[`padding-right-${padding}`],
                    styles[`padding-bottom-${padding}`],
                    styles[`padding-left-${padding}`],
                );
            }

            return undefined;
        };

        const commonClassName = cn(styles[view], {
            [styles[`border-radius-${borderRadius}`]]: borderRadius,
        });

        const sortableItemClassName = cn(commonClassName, itemClassName);

        const handleDragStart = (event: DragStartEvent) => {
            const { active } = event;

            setActiveId(active.id);

            onDragStart?.(event);
        };

        const handleDragEnd = (event: DragEndEvent) => {
            const { active, over } = event;

            if (over?.id && active.id !== over.id) {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                onDragEnd?.(event, arrayMove(items, oldIndex, newIndex));

                return;
            }

            onDragEnd?.(event, items);
            setActiveId(null);
        };

        const renderSortableItem = (
            item: Items[number],
            { children, ...restProps }: Partial<SortableItemProps>,
        ) => (
            <SortableItem
                controlPadding={controlPadding}
                controlPosition={controlPosition}
                key={item.id}
                id={item.id}
                className={sortableItemClassName}
                activatorNode={activatorNode}
                disabled={item.disabled}
                {...restProps}
            >
                {renderItem(item)}
            </SortableItem>
        );

        const renderDragOverlay = () => {
            const activeItem = items.find((item) => item.id === activeId);

            if (activeItem) {
                return renderSortableItem(activeItem, { isDragOverlay: true });
            }

            return null;
        };

        return (
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToParentElement, restrictToVerticalAxis]}
                accessibility={{
                    announcements,
                    screenReaderInstructions: { draggable: screenReaderInstructions },
                }}
            >
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    <div
                        ref={ref}
                        className={cn(
                            styles.component,
                            getPaddingClassName(),
                            commonClassName,
                            className,
                        )}
                        data-test-id={getDataTestId(dataTestId, 'container')}
                    >
                        {items.map((item) => renderSortableItem(item, { dataTestId }))}
                    </div>
                </SortableContext>

                <Portal immediateMount={true} {...portalProps}>
                    <DragOverlay {...dragOverlayProps}>
                        {activeId ? renderDragOverlay() : null}
                    </DragOverlay>
                </Portal>
            </DndContext>
        );
    },
);
