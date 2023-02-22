import { isValidElement, ReactNode } from 'react';

export const isItemElement = (obj: JSX.Element, name?: string): boolean =>
    typeof obj === 'object' && obj.type.displayName === name;

export const isItem = (child: ReactNode) => {
    let item = false;
    if (isValidElement(child) && isItemElement(child, 'ListItem')) {
        item = true;
    }
    return item;
};
