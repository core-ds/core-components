import { ReactNode } from 'react';

export type TFallbackObject = Partial<{
    node: ReactNode;
    onError: () => void;
}>;

export function isFallbackObject(el: unknown): el is TFallbackObject {
    return typeof el === 'object' && el !== null && ('node' in el || 'onError' in el);
}
