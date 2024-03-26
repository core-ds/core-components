import { createContext } from 'react';

// Добавить типы из компонентов нет возможности, так как будет зацикленный импорт зависимостей
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentsContextValue = Record<string, any>;

export type CoreContextValue = {
    components?: ComponentsContextValue;
};

export const CoreComponentsContext = createContext<CoreContextValue>({});

export const CoreComponentsProvider = CoreComponentsContext.Provider;
