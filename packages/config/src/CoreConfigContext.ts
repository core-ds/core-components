import { createContext, useContext } from 'react';

export type CoreConfigContextValue = {
    breakpoint: number;
    client: 'desktop' | 'mobile';
    getPortalContainer?: () => Element | null | undefined;
    haptics?: {
        /**
         * Включает haptic feedback для компонентов без локального `data-haptic-preset`.
         * @default true
         */
        enabled?: boolean;

        /**
         * Звуковой fallback вместо вибрации — для проверки паттернов на десктопе.
         * @default false
         */
        debug?: boolean;
    };
};

export const CoreConfigContext = createContext<CoreConfigContextValue>({
    breakpoint: 1024,
    client: 'desktop',
    haptics: {
        enabled: true,
        debug: true,
    },
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
