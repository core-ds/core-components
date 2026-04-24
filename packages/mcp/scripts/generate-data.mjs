import { withCustomConfig } from 'react-docgen-typescript';
import path, { resolve } from 'node:path';
import { createIndexDir } from './create-index-dir.mjs';
import { getComponentEntryPoints } from './get-component-entry-points.mjs';
import * as fs from 'node:fs';


function main() {
    const files = getComponentEntryPoints();

    const versionDir = createIndexDir();

    // const parser = withCustomConfig(
    //     resolve(process.cwd(), 'tsconfig.react-docgen-typescript.json'),
    //     {},
    // );
    //
    // const docs = parser.parse(files);

    files.forEach((file) => {
        const dirname = path.dirname(file);
        const packageName = dirname.split('/')[1];

        fs.writeFileSync(
            resolve(versionDir, `${packageName}.json`),
            JSON.stringify(
                {
                    packageName: packageName,
                },
                null,
                2,
            ),
        );
    });
}

main();
