/* eslint-disable multiline-comment-style */
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly CORE_COMPONENTS_ENV: 'development' | 'production' | 'test';
        readonly CORE_COMPONENTS_VARIANT?: 'default' | 'alfasans';
        readonly CORE_COMPONENTS_CARD_IMAGE_BASE_URL: string;
        readonly CORE_COMPONENTS_CDN_ICON_BASE_URL: string;
        readonly CORE_COMPONENTS_SERVICE_CDN: string;
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
