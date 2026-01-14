import { createContext, useContext } from 'react';

import { isClient } from '@alfalab/core-components-shared';

/**
 * copy-paste from https://github.com/downshift-js/downshift/blob/a583281aefaaf33cb1a6c393967a060c61911e43/typings/index.d.ts#L83
 */
export interface Environment {
    addEventListener: typeof window.addEventListener;
    removeEventListener: typeof window.removeEventListener;
    document: Document;
    Node: typeof window.Node;
}

export type CoreConfigContextValue = {
    breakpoint: number;
    client: 'desktop' | 'mobile';
    environment?: Environment;
};

export const CoreConfigContext = createContext<CoreConfigContextValue>({
    breakpoint: 1024,
    client: 'desktop',
    environment: isClient() ? window : undefined,
});

export const useCoreConfig = (overrides: Partial<CoreConfigContextValue> = {}) => {
    const config = useContext(CoreConfigContext);
    const passedOverrides = Object.fromEntries(
        Object.entries(overrides).filter(([, value]) => !(value === undefined)),
    );

    return {
        ...config,
        ...passedOverrides,
    };
};
