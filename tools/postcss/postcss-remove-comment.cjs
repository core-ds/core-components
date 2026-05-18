/**
 * @returns {import('postcss').Plugin}
 */
const postcssRemoveComment = () => ({
    postcssPlugin: 'postcss-remove-comment',
    OnceExit: (root) => {
        root.walkComments((comment) => {
            comment.remove();
        });
    },
});

module.exports = postcssRemoveComment;
