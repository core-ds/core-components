export default resolveRef;
/**
 * @param {Pick<import('@actions/github-script').AsyncFunctionArguments, 'core'>} args
 * @returns {Promise<string>}
 */
declare function resolveRef({
    core,
}: Pick<import('@actions/github-script').AsyncFunctionArguments, 'core'>): Promise<string>;
