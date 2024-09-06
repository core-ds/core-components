import React from 'react';

import { exhaustiveCheck } from '@alfalab/core-components-shared';

import { IconCheck20 } from '../icons/icon-check-20';
import { IconCheck24 } from '../icons/icon-check-24';

export const getIcon = (size: 's' | 'm' | 20 | 24) => {
    switch (size) {
        case 's':
        case 20:
            return <IconCheck20 />;
        case 'm':
        case 24:
            return <IconCheck24 />;

        default:
            return exhaustiveCheck(size);
    }
};
