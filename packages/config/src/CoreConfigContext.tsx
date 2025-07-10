import { createContext, useContext } from 'react';

export type CoreConfigContextValue = {
    breakpoint?: number;
    client?: 'desktop' | 'mobile';
    components?: CoreConfigContextComponents;
};

// Добавить типы из компонентов нет возможности, так как будет зацикленный импорт зависимостей
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CoreConfigContextComponents = Record<string, any>;

export const CoreConfigContext = createContext<CoreConfigContextValue>({
    breakpoint: 1024,
    client: 'desktop',
    components: {},
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

/**
 * Получение глобальных настроек для компонента
 */
export const useComponentOverrides = <T extends object>(
    component: keyof CoreConfigContextComponents,
): T | undefined => {
    const context = useCoreConfig();

    if (context?.components && context.components[component]) {
        return context.components[component];
    }

    return undefined;
};
