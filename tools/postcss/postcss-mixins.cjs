const postcss = require('postcss');

/**
 * @param {string[]} mixins
 */
function persistMixins(mixins) {
    return Object.fromEntries(
        mixins.map((name) => [
            name,
            /**
             * @param {import('postcss').AtRule} mixin
             */
            (mixin) => {
                mixin.replaceWith(postcss.atRule({ name: 'persistent-mixin', params: name }));
            },
        ]),
    );
}

module.exports = { persistMixins };
