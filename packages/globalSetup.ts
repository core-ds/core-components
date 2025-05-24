module.exports = async () => {
    process.env.TZ = 'UTC';
    process.env.CORE_COMPONENTS_ENV = process.env.NODE_ENV;
};
