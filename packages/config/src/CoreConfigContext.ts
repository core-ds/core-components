import { createContext, useContext } from 'react';

export type ImageProxyMap = Array<{ from: string; to: string }>;

/**
 * Глобальные настройки компонента Image.
 * Типы описаны здесь, чтобы не создавать циклическую зависимость config ↔ image.
 */
export type ImageConfigOverrides = {
    proxyMap?: ImageProxyMap;
    inViewOption?: boolean;
};

export type CoreConfigContextComponents = {
    Image?: ImageConfigOverrides;
};

export type CoreConfigContextValue = {
    breakpoint: number;
    client: 'desktop' | 'mobile';
    getPortalContainer?: () => Element | null | undefined;
    components?: CoreConfigContextComponents;
};

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
export const useComponentOverrides = <K extends keyof CoreConfigContextComponents>(
    component: K,
): CoreConfigContextComponents[K] | undefined => {
    const context = useCoreConfig();

    return context?.components?.[component];
};
