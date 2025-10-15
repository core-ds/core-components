/* eslint-disable import/no-extraneous-dependencies */
import { toPlatformPath } from '@actions/core';
import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';
import fse from 'fs-extra';
import fs from 'node:fs/promises';
import path from 'node:path';
import postcss from 'postcss';
import postcssEach from 'postcss-each';
import postcssFor from 'postcss-for';
import postcssImport from 'postcss-import';

import {
    postcssRemoveComment,
    postcssRemoveEmptyRoot,
} from '@alfalab/core-components-internal-tools/postcss';

async function buildIndex() {
    const file = path.resolve(toPlatformPath('src/index.css'));
    const content = await fs.readFile(file, { encoding: 'utf8' });
    const result = await postcss(
        postcssImport(),
        postcssFor(),
        postcssEach(),
        postcssRemoveComment(),
        postcssRemoveEmptyRoot(),
    ).process(content, {
        from: file,
    });
    const outFile = path.resolve(toPlatformPath('dist/index.css'));

    await fse.ensureDir(path.dirname(outFile));
    await fs.writeFile(outFile, result.css, { encoding: 'utf8' });
}

async function buildMixins() {
    const file = path.resolve(toPlatformPath('src/mixins.css'));
    const content = await fs.readFile(file, { encoding: 'utf8' });
    const result = await postcss(
        postcssImport(),
        postcssFor(),
        postcssEach(),
        purgeCSSPlugin({ variables: true, safelist: [/.*/] }),
        postcssRemoveComment(),
        postcssRemoveEmptyRoot(),
    ).process(content, {
        from: file,
    });
    const outFile = path.resolve(toPlatformPath('dist/mixins.css'));

    await fse.ensureDir(path.dirname(outFile));
    await fs.writeFile(outFile, result.css, { encoding: 'utf8' });
}

async function main() {
    await Promise.all([buildIndex(), buildMixins()]);
}

await main();
