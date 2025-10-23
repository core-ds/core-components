import { createContext, useContext } from 'react';

import { typographyStyles } from '@alfalab/core-components-default-theme';
import { type TypographyStyle } from '@alfalab/core-components-types';

export interface TypographyConfig {
    styles: TypographyStyle;
}

export interface CoreConfigContextValue {
    breakpoint: number;
    client: 'desktop' | 'mobile';
    getPortalContainer?: () => Element | null | undefined;
    typography?: TypographyConfig;
}

export const INITIAL_CORE_CONFIG_VALUE: CoreConfigContextValue = {
    breakpoint: 1024,
    client: 'desktop',
    typography: {
        styles: typographyStyles,
    },
};

export const CoreConfigContext = createContext(INITIAL_CORE_CONFIG_VALUE);

export function useCoreConfig(
    overrides: Partial<CoreConfigContextValue> = {},
): CoreConfigContextValue {
    const config = useContext(CoreConfigContext);
    const passedOverrides = Object.fromEntries(
        Object.entries(overrides).filter(([, value]) => !(value === undefined)),
    );

    return {
        ...config,
        ...passedOverrides,
    };
}
