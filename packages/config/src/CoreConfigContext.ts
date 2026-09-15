import { createContext, type ElementType, useContext } from 'react';

export type CoreConfigContextValue = {
    breakpoint: number;
    client: 'desktop' | 'mobile';
    getPortalContainer?: () => Element | null | undefined;
    as?: {
        /**
         * Кастомный компонент вместо нативного `<button>`.
         */
        button?: ElementType;

        /**
         * Кастомный компонент вместо нативного `<a>`.
         */
        a?: ElementType;

        /**
         * Кастомный компонент вместо нативного `<input>`.
         */
        input?: ElementType;
    };
    haptics?: {
        /**
         * Глобальный флаг haptic. `false` перекрывает локальный пресет.
         * @default true
         */
        enabled?: boolean;

        /**
         * Диагностика haptic feedback.
         * @description
         *  Добавляет `console.info` и звуковой отклик при взаимодействии с элементом Haptic.
         *
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
