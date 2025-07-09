import detectIndent from 'detect-indent';
import fse from 'fs-extra';
import fs from 'node:fs/promises';
import path from 'node:path';
import * as process from 'node:process';

import { getPackages } from '../tools/monorepo.cjs';

async function main() {
    const { packages } = getPackages();

    const themes = packages.find(
        ({ packageJson: { name } }) => name === '@alfalab/core-components-themes',
    );
    const vars = packages.find(
        ({ packageJson: { name } }) => name === '@alfalab/core-components-vars',
    );

    const jsonLocation = path.join(process.cwd(), 'package.json');
    const pkg = await fse.readJson(jsonLocation, { encoding: 'utf8' });
    const { name, version } = pkg;

    console.log(`=> Processing ${name}@${version}`);

    const { indent } = detectIndent(await fs.readFile(jsonLocation, { encoding: 'utf8' }));

    pkg.themesVersion = themes.packageJson.version;
    pkg.varsVersion = vars.packageJson.version;

    await fse.writeJson(jsonLocation, pkg, { spaces: indent, encoding: 'utf8' });

    console.log('=> Done\n');
}

await main();
