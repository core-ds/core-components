import { envManager } from '../env-manager';

module.exports = async () => {
    process.env.TZ = 'UTC';
    // need to assign readonly CORE_COMPONENTS_ENV
    Object.assign(process.env, {
        CORE_COMPONENTS_ENV: process.env.NODE_ENV,
        CORE_COMPONENTS_CARD_IMAGE_BASE_URL: envManager.CORE_COMPONENTS_CARD_IMAGE_BASE_URL_JEST,
    });
};
