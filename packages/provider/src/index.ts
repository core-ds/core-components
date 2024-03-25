import { createContext } from 'react';

import { PortalProps } from '@alfalab/core-components-portal';

export * from './hooks';

type CoreComponentsContextValue = {
    /** Уникальный идентификатор страницы для специфичности стилей страницы  */
    getContainer?: PortalProps['getPortalContainer'];
};

export const CoreComponentsContext = createContext<CoreComponentsContextValue>({
    getContainer: undefined,
});

export const CoreComponentsProvider = CoreComponentsContext.Provider;
