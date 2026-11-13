import React, { type ContextType, type FC, type ReactNode, useMemo } from 'react';

import { CoreConfigContext, type CoreConfigContextValue, useCoreConfig } from './CoreConfigContext';

export interface CoreConfigProviderProps extends Partial<CoreConfigContextValue> {
    children?: ReactNode;
}

export const CoreConfigProvider: FC<CoreConfigProviderProps> = (props) => {
    const config = useCoreConfig();
    const { as } = config;
    const {
        breakpoint = config.breakpoint,
        client = config.client,
        getPortalContainer = config.getPortalContainer,
        children,
        as: { a = as?.a, button = as?.button, input = as?.input } = {},
    } = props;
    const value = useMemo<ContextType<typeof CoreConfigContext>>(
        () => ({
            breakpoint,
            client,
            getPortalContainer,
            as: { a, button, input },
        }),
        [a, breakpoint, button, client, getPortalContainer, input],
    );

    return <CoreConfigContext.Provider value={value}>{children}</CoreConfigContext.Provider>;
};
