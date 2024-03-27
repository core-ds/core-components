import { ComponentsContextValue, useCoreComponentsContext } from '..';

/**
 * Получение глобальных настроек для компонента
 */
export const useComponentOverrides = (component: keyof ComponentsContextValue) => {
    const context = useCoreComponentsContext();

    if (context?.components && context.components[component]) {
        return context.components[component];
    }

    return undefined;
};
