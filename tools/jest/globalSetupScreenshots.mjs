export default async () => {
    const { envManager } = await import('../env-manager.mjs');

    Object.assign(process.env, {
        CORE_COMPONENTS_SERVICE_CDN: envManager.CORE_COMPONENTS_SERVICE_CDN,
    });
};
