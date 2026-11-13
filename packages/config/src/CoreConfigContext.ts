import { type ComponentProps, createContext, type ElementType, useContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type CoreConfigProvider } from '@alfalab/core-components-config/provider';

type Components<Tag extends keyof JSX.IntrinsicElements> = {
    [P in Tag]?: ElementType<ComponentProps<P>, P>;
};

export interface CoreConfigContextValue {
    breakpoint: number;
    client: 'desktop' | 'mobile';
    getPortalContainer?: () => Element | null | undefined;
    as?: Components<'a' | 'button' | 'input'>;
}

/**
 * @deprecated Иcпользуйте {@link CoreConfigProvider}
 */
export const CoreConfigContext = createContext<CoreConfigContextValue>({
    breakpoint: 1024,
    client: 'desktop',
});

export function useCoreConfig(): CoreConfigContextValue;
/**
 * @deprecated Используйте {@link useCoreConfig} без аргументов
 */
export function useCoreConfig(overrides: Partial<CoreConfigContextValue>): CoreConfigContextValue;
export function useCoreConfig(overrides?: Partial<CoreConfigContextValue>): CoreConfigContextValue {
    const config = useContext(CoreConfigContext);

    if (overrides === undefined) {
        return config;
    }

    const passedOverrides = Object.fromEntries(
        Object.entries(overrides).filter(([, value]) => !(value === undefined)),
    );

    return {
        ...config,
        ...passedOverrides,
    };
}
