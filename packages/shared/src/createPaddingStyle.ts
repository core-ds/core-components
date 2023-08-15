import React from 'react';

import { PaddingType } from '../../types';

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
