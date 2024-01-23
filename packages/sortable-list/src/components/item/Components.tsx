import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';
import { DragMIcon } from '@alfalab/icons-glyph/DragMIcon';

import { SortableItemProps } from '../../types';

import styles from './index.module.css';

export const SortableItem: React.FC<SortableItemProps> = ({
    activatorNode,
    controlPosition,
    controlPadding,
    children,
    className,
    contentClassName,
    id,
    isDragOverlay,
    disabled,
    dataTestId,
}): JSX.Element => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
        disabled,
    });

    const isCellActivator = !isDragOverlay && activatorNode === 'cell';
    const isControlActivator = !isDragOverlay && activatorNode === 'control';

    const renderControl = () => {
        const hasRightPadding = controlPadding && controlPosition === 'right';
        const hasLeftPadding = controlPadding && controlPosition === 'left';

        return (
            <div
                className={cn(styles.icon, {
                    [styles[`control-right-padding-${controlPadding}`]]: hasRightPadding,
                    [styles[`control-left-padding-${controlPadding}`]]: hasLeftPadding,
                })}
                ref={isControlActivator ? setActivatorNodeRef : undefined}
                {...(isControlActivator ? listeners : null)}
                {...(isControlActivator ? attributes : null)}
            >
                <DragMIcon aria-label='drag control' />
            </div>
        );
    };

    return (
        <div
            {...(isCellActivator ? listeners : null)}
            {...(isCellActivator ? attributes : null)}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
            className={cn(styles.component, styles[`activator-${activatorNode}`], className, {
                [styles.disabled]: disabled,
                [styles.dragging]: isDragging,
                [styles.dragOverlay]: isDragOverlay,
            })}
            ref={setNodeRef}
            data-test-id={getDataTestId(dataTestId, `item_${id}`)}
        >
            {controlPosition === 'left' && renderControl()}

            <div className={cn(styles.content, contentClassName)}>{children}</div>

            {controlPosition === 'right' && renderControl()}
        </div>
    );
};
