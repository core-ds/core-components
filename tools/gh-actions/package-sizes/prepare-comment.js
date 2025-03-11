module.exports = async () => {
    const path = require('node:path');
    const targetFile = require(path.join(process.cwd(), 'target/package-sizes.json'));
    const currentFile = require(path.join(process.cwd(), 'current/package-sizes.json'));

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

            entryPoints.forEach((entryPoint) => {
                const now = currentFile[packageName]?.[entryPoint] ?? 0;
                const before = targetFile[packageName]?.[entryPoint] ?? 0;

                if (Math.abs(now - before) >= 1) {
                    shouldComment = true;
                    acc += `| ${packageName}/${entryPoint} | ${now} ${
                        now - before > 0
                            ? `(+${(now - before).toFixed(2)} KB ❌)`
                            : `(-${(before - now).toFixed(2)} KB ✅)`
                    } |\n`;
                }
            });

            return acc;
        }, '## Bundle size report\n| Entry point | Size (minified) |\n| --- | --- |\n');

    return shouldComment ? table : '';
};
