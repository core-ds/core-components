import { createContext } from 'react';

import { PortalProps } from '@alfalab/core-components-portal';

export * from './hooks';

export type ComponentsContextValue = {
    Portal?: {
        getContainer?: PortalProps['getPortalContainer'];
    };
};

export type CoreComponentsContextValue = {
    /** Уникальный идентификатор страницы для специфичности стилей страницы  */
    components?: ComponentsContextValue;
};

export const CoreComponentsContext = createContext<CoreComponentsContextValue>({});

export const CoreComponentsProvider = CoreComponentsContext.Provider;
