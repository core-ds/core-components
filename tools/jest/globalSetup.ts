import { envManager } from '../env-manager';

module.exports = async () => {
    process.env.TZ = 'UTC';
    // need to assign readonly CORE_COMPONENTS_ENV
    Object.assign(process.env, {
        CORE_COMPONENTS_ENV: process.env.NODE_ENV,
        AO_CARDS: envManager.AO_CARDS_JEST,
    });
};
