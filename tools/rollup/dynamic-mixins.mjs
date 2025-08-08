import fs from 'node:fs/promises';
import postcss from 'postcss';
import postcssImport from 'postcss-import';

import postcssMixinNames from '../postcss/postcss-mixin-names.cjs';
import { resolveInternal } from '../resolve-internal.cjs';

/**
 * @param {string} p
 * @returns {Promise<string[]>}
 */
async function getMixins(p) {
    let mixins;
    const content = await fs.readFile(p, { encoding: 'utf8' });

    await postcss([
        postcssImport({}),
        postcssMixinNames({
            importTo: (names) => {
                mixins = names;
            },
        }),
    ]).process(content, { from: p });

    return mixins;
}

export const dynamicMixins = (
    await getMixins(resolveInternal('@alfalab/core-components-vars/src/typography.css', false))
).filter((name) => !(name === 'row_limit'));
