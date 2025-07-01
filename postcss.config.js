/* eslint-disable @typescript-eslint/no-var-requires, global-require */

const path = require('path');
const fse = require('fs-extra');
const { globbySync } = require('globby');
const { getPackages } = require('./tools/monorepo.cjs');

const { packages } = getPackages();
const vars = packages.find(({ packageJson: { name } }) => name === '@alfalab/core-components-vars');
const mq = packages.find(({ packageJson: { name } }) => name === '@alfalab/core-components-mq');

module.exports = {
    plugins: [
        require('postcss-import')({}),
        require('postcss-for')({}),
        require('postcss-each')({}),
        require('./tools/postcss/postcss-subtract-mixin.cjs')({}),
        require('postcss-mixins')({
            mixinsFiles: globbySync('src/*.css', {
                ignore: ['**/alfasans-*.css'],
                cwd: vars.dir,
                absolute: true,
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
                customMedia: fse.readJsonSync(path.join(mq.dir, 'src/mq.json'), {
                    encoding: 'utf8',
                }),
            },
        }),
        ...(process.env.BUILD_WITHOUT_CSS_VARS === 'true'
            ? [require('postcss-custom-properties')({ preserve: false })]
            : []),
    ],
};
