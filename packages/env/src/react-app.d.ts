/* eslint-disable multiline-comment-style */
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly CORE_COMPONENTS_ENV: 'development' | 'production' | 'test';
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
