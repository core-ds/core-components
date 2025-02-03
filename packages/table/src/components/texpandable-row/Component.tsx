import React, { forwardRef, ReactNode, Ref, useState } from 'react';
import cn from 'classnames';

import { TRow, TRowProps } from '../trow';

import styles from './index.module.css';

export type TExpandableRowProps = TRowProps & {
    defaultExpanded?: boolean;

    expanded?: boolean;

    onToggle?: (expanded: boolean) => void;

    renderContent: (expanded: boolean) => ReactNode;

    rowRef?: Ref<HTMLTableRowElement>;
};

export const TExpandableRow = forwardRef<HTMLTableRowElement, TExpandableRowProps>(
    (
        {
            className,
            selected,
            expanded,
            defaultExpanded = false,
            onToggle = () => null,
            renderContent = () => null,
            rowRef,
            ...restProps
        }: TExpandableRowProps,
        ref,
    ) => {
        const [expandedState, setExpandedState] = useState<boolean>(defaultExpanded);

        const uncontrolled = expanded === undefined;

        const isExpanded = (uncontrolled ? expandedState : expanded) as boolean;

        const handleToggle = () => {
            if (uncontrolled) {
                setExpandedState(!isExpanded);
            }

            onToggle(isExpanded);
        };

        return (
            <React.Fragment>
                <TRow
                    className={cn(styles.row, className, {
                        [styles.selected]: selected,
                        [styles.expanded]: isExpanded,
                    })}
                    selected={selected}
                    onClick={handleToggle}
                    ref={rowRef}
                    {...restProps}
                />

                <tr ref={ref} className={cn(styles.expandable, { [styles.expanded]: isExpanded })}>
                    {renderContent(isExpanded)}
                </tr>
            </React.Fragment>
        );
    },
);

TExpandableRow.displayName = 'TExpandableRow';
