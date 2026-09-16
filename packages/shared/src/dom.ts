import type React from 'react';

function preventDefault(e: React.UIEvent) {
    e.preventDefault();
}

export const dom = {
    preventDefault,
};

export function getElementWindow(element: Element): typeof window {
    return element.ownerDocument.defaultView!;
}
