import * as fs from 'node:fs/promises';
import postcss from 'postcss';
import postcssEach from 'postcss-each';
import postcssFor from 'postcss-for';
import postcssImport from 'postcss-import';

// eslint-disable-next-line import/no-useless-path-segments
import { postcssMixinNames } from '../postcss/index.js';

/**
 * @param {string} file
 * @returns {Promise<string[]>}
 */
export async function getMixinsNames(file) {
    /**
     * @type {string[]}
     */
    const mixins = [];
    const content = await fs.readFile(file, { encoding: 'utf8' });

    await postcss(
        postcssImport(),
        postcssFor(),
        postcssEach(),
        postcssMixinNames({
            importTo: (names) => {
                mixins.push(...names);
            },
        }),
    ).process(content, { from: file });

    return mixins;
}
