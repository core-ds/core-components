import type React from 'react';

function preventDefault(e: React.UIEvent) {
    e.preventDefault();
}

export const dom = {
    preventDefault,
};
