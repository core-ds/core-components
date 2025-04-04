import React from 'react';
import type { PaddingType } from '@balafla/core-components-types';

export function createPaddingStyle(padding?: PaddingType): undefined | React.CSSProperties {
    if (typeof padding === 'string' || typeof padding === 'number') {
        return { padding };
    }

    if (padding !== null && typeof padding === 'object') {
        return {
            paddingLeft: padding.left,
            paddingRight: padding.right,
            paddingTop: padding.top,
            paddingBottom: padding.bottom,
        };
    }

    return padding;
}
