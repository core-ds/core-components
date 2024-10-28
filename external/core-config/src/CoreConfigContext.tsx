import { createContext, useContext } from 'react';

export type CoreConfigContext = {
    breakpoint: number;
    client: 'desktop' | 'mobile';
};

export const CoreConfigContext = createContext<CoreConfigContext>({
    breakpoint: 1024,
    client: 'desktop',
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
