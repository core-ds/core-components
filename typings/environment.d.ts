declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            CORE_COMPONENTS_ENV: 'development' | 'production' | 'test';
        }
    }
}

export {};
