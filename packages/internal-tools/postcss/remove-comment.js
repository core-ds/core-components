/**
 * @type {import('postcss').PluginCreator<undefined>}
 */
export const postcssRemoveComment = () => ({
    postcssPlugin: 'postcss-remove-comment',
    Comment: (comment) => {
        comment.remove();
    },
});

postcssRemoveComment.postcss = true;
