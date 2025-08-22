const path = require('node:path');
const fs = require('fs/promises');

/**
 * @param {import('node:fs').PathLike | import('node:fs/promises').FileHandle} p
 */
async function readJson(p) {
    const content = await fs.readFile(p, { encoding: 'utf8' });

    return JSON.parse(content);
}

module.exports = async () => {
    const targetFile = await readJson(path.join(process.cwd(), 'target/package-sizes.json'));
    const currentFile = await readJson(path.join(process.cwd(), 'current/package-sizes.json'));

    let shouldComment = false;

    const targetComponents = Object.keys(targetFile);
    const currentComponents = Object.keys(currentFile);

    const table = [...new Set([...targetComponents, ...currentComponents])]
        .sort((a, b) => a.localeCompare(b))
        .reduce((acc, packageName) => {
            const entryPoints = [
                ...new Set([
                    ...Object.keys(targetFile[packageName] ?? {}),
                    ...Object.keys(currentFile[packageName] ?? {}),
                ]),
            ];

            let result = acc;

            entryPoints.forEach((entryPoint) => {
                const now = currentFile[packageName]?.[entryPoint] ?? 0;
                const before = targetFile[packageName]?.[entryPoint] ?? 0;
                const diff = now - before;

                if (Math.abs(diff) >= 1) {
                    shouldComment = true;
                    result += `| ${packageName}/${entryPoint} | ${now} ${
                        diff > 0
                            ? `(+${diff.toFixed(2)} KB ❌)`
                            : `(-${(diff * -1).toFixed(2)} KB ✅)`
                    } |\n`;
                }
            });

            return result;
        }, '## Bundle size report\n| Entry point | Size (minified) |\n| --- | --- |\n');

    return shouldComment ? table : '';
};
