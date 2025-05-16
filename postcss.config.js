/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

const path = require('path');
const glob = require('glob');
const { getPackagesSync } = require('@manypkg/get-packages');

const { packages } = getPackagesSync(process.cwd());
const vars = packages.find(({ packageJson: { name } }) => name === '@alfalab/core-components-vars');
const mq = packages.find(({ packageJson: { name } }) => name === '@alfalab/core-components-mq');

module.exports = {
    plugins: [
        require('postcss-import')({}),
        require('postcss-for')({}),
        require('postcss-each')({}),
        require('./tools/postcss/postcss-subtract-mixin.cjs')({}),
        require('postcss-mixins')({
            mixinsFiles: glob.sync(path.join(vars.dir, 'src/*.css'), {
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
                // eslint-disable-next-line import/no-dynamic-require
                customMedia: require(path.join(mq.dir, 'src/mq.json')),
            },
        }),
        ...(process.env.BUILD_WITHOUT_CSS_VARS === 'true'
            ? [require('postcss-custom-properties')({ preserve: false })]
            : []),
    ],
};
