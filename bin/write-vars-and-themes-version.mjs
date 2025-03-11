import fs from 'node:fs/promises';
import path from 'node:path';
import shell from 'shelljs';
import detectIndent from 'detect-indent';

function getPackage(name) {
    const [pkg] = JSON.parse(
        shell.exec(`lerna list --scope ${name} --json`, { silent: true }).stdout,
    );

    return pkg;
}

const packages = JSON.parse(
    shell.exec(
        `lerna list \\
            --ignore @alfalab/core-components \\
            --ignore @alfalab/core-components-codemod \\
            --ignore @alfalab/core-components-config \\
            --ignore @alfalab/core-components-stack-context \\
            --ignore @alfalab/core-components-themes \\
            --ignore @alfalab/core-components-types \\
            --ignore @alfalab/core-components-vars \\
            --json
            --all`,
        { silent: true },
    ).stdout,
);

const themesPkg = getPackage('@alfalab/core-components-themes');
const varsPkg = getPackage('@alfalab/core-components-vars');

for (const { name, version, location } of packages) {
    console.log(`=> Processing ${name}@${version}`);

    const fileLocation = path.join(location, 'package.json');
    const content = await fs.readFile(fileLocation, { encoding: 'utf8' });
    const pkg = JSON.parse(content);

    pkg.themesVersion = themesPkg.version;
    pkg.varsVersion = varsPkg.version;

    await fs.writeFile(
        fileLocation,
        `${JSON.stringify(pkg, null, detectIndent(content).indent)}\n`,
        { encoding: 'utf8' },
    );

    console.log(`=> Done\n`);
}
