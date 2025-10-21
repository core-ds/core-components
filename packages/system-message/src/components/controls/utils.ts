import React, { Fragment, type ReactNode } from 'react';

export const hasMultipleChildren = (nodes: ReactNode): boolean => {
    let count = 0;

    const walk = (node: ReactNode) => {
        if (count > 1) return;

        const array = React.Children.toArray(node);

        for (const child of array) {
            if (count > 1) return;

            if (React.isValidElement(child) && child.type === Fragment) {
                walk(child.props.children);
            } else {
                count += 1;
            }
        }
    };

    walk(nodes);

    return count > 1;
};
