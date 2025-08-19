import detectIndent from 'detect-indent';
import fse from 'fs-extra';
import fs from 'node:fs/promises';

import { resolveInternal } from '../../tools/resolve-internal.cjs';

async function main() {
    const [themes, vars] = await Promise.all(
        ['@alfalab/core-components-themes', '@alfalab/core-components-vars'].map((pkg) =>
            fse.readJson(resolveInternal(`${pkg}/package.json`, false), { encoding: 'utf8' }),
        ),
    );

    const data = await fs.readFile('package.json', { encoding: 'utf8' });
    const pkg = JSON.parse(data);
    const { indent } = detectIndent(data);

    pkg.themesVersion = themes.version;
    pkg.varsVersion = vars.version;

    await fse.writeJson('package.json', pkg, { spaces: indent, encoding: 'utf8' });

    console.log('Done');
}

await main();
