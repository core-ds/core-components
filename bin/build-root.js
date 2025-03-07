const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');
const globby = require('globby');

const packagesDir = path.resolve(__dirname, '..', 'packages');
const targetDir = path.resolve(__dirname, '..', 'dist');

async function buildRoot() {
    const t0 = performance.now();
    const packages = await getPackages();

    await copyPackages(packages, targetDir);

    for (const package of packages) {
        const dir = path.join(targetDir, package);
        const files = await findJsFiles(dir);

        for (const file of files) {
            const code = await fs.readFile(file, 'utf8');
            const result = replaceCoreImportsToRelative(code, dir, file);

            if (result.changed) {
                await fs.writeFile(file, result.code);
            }
        }
    }

    const t1 = performance.now();
    const elapsed = Math.round((t1 - t0) / 1000);

    console.log(`Root build finished in ${elapsed}s`);
}

async function findJsFiles(dir) {
    return globby(path.join(dir, '**/*.{js,ts}'));
}

function replaceCoreImportsToRelative(code, packageDir, file) {
    const fileDir = path.dirname(file);

    const regex = /['"](@alfalab\/core-components-(.*))['"]/g;

    const matches = code.matchAll(regex);

    let changed = false;

    for (const match of matches) {
        changed = true;
        const relativeFilePath = path.relative(packageDir, fileDir);

        const levelUpCount = relativeFilePath.split(path.sep).filter(Boolean).length + 1;

        const relativeImportPath = path.relative(
            fileDir,
            path.join(fileDir, `..${path.sep}`.repeat(levelUpCount), match[2]),
        );

        code = code.replace(match[1], relativeImportPath);
    }

    return { code, changed };
}

async function copyPackages(packages, targetDir) {
    for (const package of packages) {
        const packageDir = path.join(packagesDir, package);
        const distPath = path.join(packageDir, 'dist');

        await fs.cp(distPath, path.join(targetDir, package), { recursive: true });
    }
}

async function getPackages() {
    return fs.readdir(packagesDir).then((dirs) =>
        dirs.filter((dir) => {
            const packageDir = path.join(packagesDir, dir);
            const packageJsonPath = path.join(packageDir, 'package.json');
            const distPath = path.join(packageDir, 'dist');

            return fsSync.existsSync(packageJsonPath) && fsSync.existsSync(distPath);
        }),
    );
}

buildRoot();
