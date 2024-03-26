import { useContext } from 'react';

import { ComponentsContextValue, CoreComponentsContext } from '..';

/**
 * Получение глобальных настроек для компонента
 */
export const useComponentOverrides = (component: keyof ComponentsContextValue) => {
    const context = useContext(CoreComponentsContext);

    if (context?.components && context.components[component]) {
        return context.components[component];
    }

    return undefined;
};
