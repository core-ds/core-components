module.exports = async () => {
    const { jestEnv } = await import('../env-manager.mjs');

    process.env.TZ = 'UTC';
    // need to assign readonly CORE_COMPONENTS_ENV
    Object.assign(process.env, {
        CORE_COMPONENTS_ENV: process.env.NODE_ENV,
        CORE_COMPONENTS_CARD_IMAGE_BASE_URL: jestEnv.CORE_COMPONENTS_CARD_IMAGE_BASE_URL,
    });
};
