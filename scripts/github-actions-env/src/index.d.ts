declare namespace NodeJS {
    interface ProcessEnv {
        readonly GITHUB_WORKSPACE: string;
        readonly CORE_COMPONENTS_DEMO_VERSION: string;
        readonly CORE_COMPONENTS_DEMO_DIRECTORY: string;
    }
}
