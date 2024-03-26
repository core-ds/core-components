import { createContext } from 'react';

export * from './hooks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentsContextValue = Record<string, any>;

export type CoreContextValue = {
    components?: ComponentsContextValue;
};

export const CoreComponentsContext = createContext<CoreContextValue>({});

export const CoreComponentsProvider = CoreComponentsContext.Provider;
