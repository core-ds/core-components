/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

const path = require('path');
const glob = require('glob');

module.exports = {
    plugins: [
        require('postcss-import')({}),
        require('postcss-for')({}),
        require('postcss-each')({}),
        require('./tools/postcss/postcss-subtract-mixin.cjs')(),
        require('postcss-mixins')({
            mixinsFiles: glob.sync(path.join(__dirname, 'packages/vars/src/*.css'), {
                ignore: ['**/alfasans-*.css'],
            }),
        }),
        require('postcss-preset-env')({
            stage: 3,
            features: {
                'nesting-rules': true,
                'color-mod-function': { unresolved: 'ignore' },
                'custom-properties': false,
            },
        }),
        require('postcss-custom-media')({
            importFrom: {
                customMedia: require('./packages/mq/src/mq.json'),
            },
        }),
        ...(process.env.BUILD_WITHOUT_CSS_VARS === 'true'
            ? [require('postcss-custom-properties')({ preserve: false })]
            : []),
    ],
};
