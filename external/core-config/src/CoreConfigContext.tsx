import { createContext, useContext } from 'react';

export type CoreConfigContextT = {
    breakpoint?: number;
    client: 'desktop' | 'mobile';
    components: CoreConfigContextComponents;
};

// Добавить типы из компонентов нет возможности, так как будет зацикленный импорт зависимостей
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CoreConfigContextComponents = Record<string, any>;

export const CoreConfigContext = createContext<CoreConfigContextT>({
    breakpoint: 1024,
    client: 'desktop',
    components: {},
});

export const useCoreConfig = (overrides: Partial<CoreConfigContextT> = {}) => {
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
