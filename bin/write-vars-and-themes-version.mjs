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
            --ignore @balafla/core-components \\
            --ignore @balafla/core-components-codemod \\
            --ignore @balafla/core-components-config \\
            --ignore @balafla/core-components-stack-context \\
            --ignore @balafla/core-components-themes \\
            --ignore @balafla/core-components-types \\
            --ignore @balafla/core-components-vars \\
            --json
            --all`,
        { silent: true },
    ).stdout,
);

const themesPkg = getPackage('@balafla/core-components-themes');
const varsPkg = getPackage('@balafla/core-components-vars');

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
