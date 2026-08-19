module.exports = async () => {
    const { createGlobalSetupEnv } = await import('../env-manager.mjs');

    process.env.TZ = 'UTC';
    createGlobalSetupEnv();
};
