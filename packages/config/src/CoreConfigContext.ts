import { createContext, useContext } from 'react';

export type CoreConfigContextValue = {
    breakpoint: number;
    client: 'desktop' | 'mobile';
    getPortalContainer?: () => Element | null | undefined;
    haptics?: {
        /**
         * Глобальный флаг haptic. `false` перекрывает локальный пресет.
         * @default true
         */
        enabled?: boolean;

        /**
         * Диагностика haptic feedback в `console.info` — для проверки паттернов на устройствах.
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
        debug: false,
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
