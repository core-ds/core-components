import React from 'react';

export function preventDefault(e: React.UIEvent) {
    e.preventDefault();
}

export function getElementWindow(element: Element) {
    return element.ownerDocument.defaultView ?? window;
}

export function equalOrContains(target: Node, node: Node | null) {
    return target === node || target.contains(node);
}

export const dom = {
    preventDefault,
};
