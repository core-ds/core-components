export default async () => {
    const { createGlobalSetupScreenshotsEnv } = await import('../env-manager.mjs');

    createGlobalSetupScreenshotsEnv();
};
