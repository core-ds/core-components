/* eslint-disable multiline-comment-style */
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

// Прокидывается через `globals` в jest.screenshots.config.mjs — особый случай только для скриншот-тестов.
// eslint-disable-next-line no-var
declare var SERVICE_CDN: string;

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly CORE_COMPONENTS_ENV: 'development' | 'production' | 'test';
        readonly CORE_COMPONENTS_VARIANT?: 'default' | 'alfasans';
        readonly AO_CARDS: string;
        readonly CDN_ICONS: string;
    }
}

interface Window {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    coreComponentsStore?: import('@alfalab/core-components-global-store/GlobalStore').GlobalStore;
}

declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}
