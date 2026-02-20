export default resolveDirectory;
/**
 * @param {Pick<import('@actions/github-script').AsyncFunctionArguments, 'context' |'core' |  'exec'>} args
 * @returns {Promise<string | undefined>}
 */
declare function resolveDirectory({
    context,
    core,
    exec,
}: Pick<
    import('@actions/github-script').AsyncFunctionArguments,
    'context' | 'core' | 'exec'
>): Promise<string | undefined>;
