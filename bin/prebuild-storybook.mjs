import globby from 'globby';
import path from 'node:path';
import fs from 'fs/promises';
import shell from 'shelljs';

const packages = JSON.parse(shell.exec(`lerna list --json --all`, { silent: true }).stdout);

const previews = (
    await Promise.all(packages.map(({ location }) => globby(`${location}/**/*preview-snap.png`)))
).reduce((a, b) => a.concat(b));

await Promise.all(
    previews.map((previewPath) => {
        const targetPath = path.join('.storybook/public/images', path.basename(previewPath));

        return fs.cp(previewPath, targetPath);
    }),
);
