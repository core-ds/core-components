/* eslint-disable @typescript-eslint/no-var-requires, global-require */

const fse = require('fs-extra');
const { globSync } = require('tinyglobby');
const { resolveInternal } = require('./tools/resolve-internal.cjs');

module.exports = {
    plugins: [
        require('postcss-import')({}),
        require('postcss-for')({}),
        require('postcss-each')({}),
        require('./tools/postcss/postcss-subtract-mixin.cjs')({}),
        require('postcss-mixins')({
            mixinsFiles: globSync('src/*.css', {
                ignore: ['src/alfasans-{index,typography}.css'],
                cwd: resolveInternal('@alfalab/core-components-vars'),
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
                customMedia: fse.readJsonSync(
                    resolveInternal('@alfalab/core-components-mq/src/mq.json', false),
                    { encoding: 'utf8' },
                ),
            },
        }),
    ],
};
