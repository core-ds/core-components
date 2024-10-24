import { createContext, useContext } from 'react';

export type CoreConfigContext = {
    breakpoint: number;
    ssrView: 'desktop' | 'mobile';
};

export const CoreConfigContext = createContext<CoreConfigContext>({
    breakpoint: 1024,
    ssrView: 'desktop',
});

export const useCoreConfig = (overrides: Partial<CoreConfigContext> = {}) => {
    const config = useContext(CoreConfigContext);

    Object.entries(overrides).forEach(([key, value]) => {
        if (value === undefined) {
            delete overrides[key as keyof typeof overrides];
        }
    });

    return {
        ...config,
        ...overrides,
    };
};
