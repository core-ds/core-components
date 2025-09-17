import { isValidElement, type ReactNode } from 'react';

export const isItemElement = (obj: JSX.Element, name?: string): boolean =>
    typeof obj === 'object' && obj.type.displayName === name;

export const isItem = (child: ReactNode) =>
    isValidElement(child) && isItemElement(child, 'ListItem');
