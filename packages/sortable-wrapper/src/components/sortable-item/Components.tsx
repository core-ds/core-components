import React from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import cn from 'classnames';

import { DragMIcon } from '@alfalab/icons-glyph/DragMIcon';

import { getDataTestId } from '../../../../utils';
import { ActivatorNode } from '../../types';

import styles from './index.module.css';

export type DraggableItemProps = {
    activatorNode: ActivatorNode;
    children: React.ReactNode;
    className: string;
    id: UniqueIdentifier;
    isDragOverlay?: boolean;
    disabled?: boolean;
    dataTestId?: string;
};

export const SortableItem: React.FC<DraggableItemProps> = ({
    activatorNode,
    children,
    className,
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
            <div className={cn(styles.content)}>{children}</div>
            <div
                className={styles.icon}
                ref={isControlActivator ? setActivatorNodeRef : undefined}
                {...(isControlActivator ? listeners : null)}
                {...(isControlActivator ? attributes : null)}
            >
                <DragMIcon aria-label='drag control' />
            </div>
        </div>
    );
};
