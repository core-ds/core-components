import getChangesets from '@changesets/read';
import { getPackages } from '@manypkg/get-packages';
import { pascalCase } from 'change-case';
import fs from 'node:fs/promises';
import path from 'node:path';

async function main() {
    const cwd = process.cwd();
    const { packages } = await getPackages(cwd);
    const rootPackage = packages.find(
        ({ packageJson }) => packageJson.name === '@alfalab/core-components',
    );
    const dependencies = Object.keys({
        ...rootPackage.packageJson.dependencies,
        ...rootPackage.packageJson.peerDependencies,
    });

    for (const { id, releases, summary } of await getChangesets(cwd)) {
        if (releases.some((release) => dependencies.includes(release.name))) {
            if (releases.every((release) => release.name !== '@alfalab/core-components')) {
                const type =
                    (
                        releases.find((release) => release.type === 'major') ??
                        releases.find((release) => release.type === 'minor')
                    )?.type ?? 'patch';

                releases.push({ name: '@alfalab/core-components', type });
            }
            const names = releases
                .filter((release) => release.name.startsWith('@alfalab/core-components-'))
                .map((release) =>
                    pascalCase(release.name.replace('@alfalab/core-components-', '')),
                );
            const headingLevel = 5;
            const nextSummary = summary.startsWith('#'.repeat(headingLevel))
                ? summary.replace(new RegExp(`#{${headingLevel}}\\s+.+\\n+`), '')
                : summary;

            const file = path.join(cwd, '.changeset', `${id}.md`);
            const content = `
---
${releases.map((release) => `'${release.name}': ${release.type}`).join('\n')}
---

${names.length ? `${'#'.repeat(headingLevel)} ${names.join(', ')}` : ''}

${nextSummary}
`.trimStart();

            await fs.writeFile(file, content, { encoding: 'utf8' });
        }
    }
}

await main();
