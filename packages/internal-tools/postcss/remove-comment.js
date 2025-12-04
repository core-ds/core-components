/**
 * @type {import('postcss').PluginCreator<undefined>}
 */
export const postcssRemoveComment = () => ({
    postcssPlugin: 'postcss-remove-comment',
    OnceExit: (root) => {
        root.walkComments((comment) => {
            comment.remove();
        });
    },
});

postcssRemoveComment.postcss = true;
