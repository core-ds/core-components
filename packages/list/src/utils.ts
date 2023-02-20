import { Children, isValidElement, ReactNode } from 'react';

export const isReactElement = (obj: JSX.Element, name?: string): boolean =>
    !!obj &&
    typeof obj !== 'boolean' &&
    typeof obj !== 'string' &&
    typeof obj !== 'number' &&
    typeof obj === 'object' &&
    !!obj.type &&
    (name ? !!obj.type?.displayName && obj.type.displayName === name : !!obj.type);

export const isListItem = (children: ReactNode) => {
    let listItem = false;

    Children?.forEach(children, (child, i) => {
        if (i >= 1) return;

        if (isValidElement(child) && isReactElement(child, 'ListItem')) {
            listItem = true;
        }
    });

    return listItem;
};
