import { createContext, useContext } from 'react';

export type CoreConfigContextValue = {
    breakpoint: number;
    client: 'desktop' | 'mobile';
    portalContainer: Element | null;
};

export const CoreConfigContext = createContext<CoreConfigContextValue>({
    breakpoint: 1024,
    client: 'desktop',
    portalContainer: null,
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
