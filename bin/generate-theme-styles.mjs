/* eslint-disable import/no-extraneous-dependencies */
import { toPlatformPath, toPosixPath } from '@actions/core';
import fs from 'node:fs/promises';
import path from 'node:path';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssMixins from 'postcss-mixins';
import resolve from 'resolve';

import { postcssRemoveComment } from '@alfalab/core-components-internal-tools/postcss';
import { getMixinsNames } from '@alfalab/core-components-internal-tools/utils';

/**
 * @typedef MixinToClassPluginOptions
 * @property {(mixinName: string) => string} [mixinToClass]
 * @property {string[]} mixins
 */

/**
 * @type {Required<MixinToClassPluginOptions>}
 */
const defaultOptions = {
    mixinToClass: (name) => name.replace(/[-_]([a-z])/g, (_, $1) => $1.toUpperCase()),
    mixins: [],
};

/**
 * @type {import('postcss').PluginCreator<MixinToClassPluginOptions>}
 */
const postcssMixinToClass = ({
    mixins = defaultOptions.mixins,
    mixinToClass = defaultOptions.mixinToClass,
} = defaultOptions) => ({
    postcssPlugin: 'postcss-mixin-to-class',
    Once: (root, helpers) => {
        root.walkAtRules((atRule) => {
            const [name] = atRule.params.split(/\s/);

            if (mixins.includes(name)) {
                const className = mixinToClass(name);

                atRule.after(
                    helpers.postcss.rule({ selector: `.${className}`, nodes: atRule.nodes }),
                );
            }
        });
    },
});

postcssMixinToClass.postcss = true;

/**
 * @typedef AddImportPluginOptions
 * @property {string[]} paths
 */

/**
 * @type {import('postcss').PluginCreator<AddImportPluginOptions>}
 */
const postcssAddImport = ({ paths } = {}) => ({
    postcssPlugin: 'postcss-add-import',
    Once: (root, helpers) => {
        const dirname = path.dirname(root.source?.input.file);
        const normalPaths = paths.map((p) => {
            let resolvedPath;

            if (path.isAbsolute(p)) {
                resolvedPath = p;
            } else {
                try {
                    resolve.sync(p, { basedir: dirname });

                    return p;
                } catch {
                    resolvedPath = path.resolve(toPlatformPath(p));
                }
            }

            const relative = toPosixPath(path.relative(dirname, resolvedPath));

            return relative.startsWith('.') ? relative : `./${relative}`;
        });

        root.prepend(
            ...normalPaths.map((p) => helpers.atRule({ name: 'import', params: `'${p}'` })),
        );
    },
});

async function generateTypography() {
    const mixinsNames = await getMixinsNames(
        resolve.sync('@alfalab/core-components-vars/src/typography.css'),
    );
    const file = path.resolve(toPlatformPath('src/typography.css'));
    const content = await fs.readFile(file, { encoding: 'utf8' });
    const result = await postcss(
        postcssImport(),
        postcssMixinToClass({ mixins: mixinsNames }),
        postcssAddImport({
            paths: ['src/index.css'],
        }),
        postcssMixins(),
        postcssRemoveComment(),
    ).process(content, { from: file });
    const outFile = path.resolve(toPlatformPath('src/styles.module.css'));

    await fs.writeFile(outFile, result.css, { encoding: 'utf8' });
}

await generateTypography();
