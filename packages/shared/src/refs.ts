import React from 'react';
import mergeRefs from 'react-merge-refs';

import { isNonNullable } from './fnUtils';

export function internalMergeRefs<T>(
    refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined>,
): React.RefCallback<T> {
    return mergeRefs(refs.filter(isNonNullable));
}
