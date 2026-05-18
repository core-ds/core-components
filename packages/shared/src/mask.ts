import { type MaskitoMask } from '@maskito/core';

import { isFn } from './type-checks';

export function isMaskitoMask(mask: unknown): mask is MaskitoMask {
    return (
        isFn(mask) ||
        mask instanceof RegExp ||
        (Array.isArray(mask) &&
            mask.every((item) => typeof item === 'string' || item instanceof RegExp))
    );
}
