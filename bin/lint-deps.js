const depcheck = require('depcheck');
const path = require('path');
const shell = require('shelljs');

const packages = shell.exec(
    `lerna list \\
        --ignore @alfalab/core-components-codemod \\
        --ignore @alfalab/core-components-vars \\
        --ignore @alfalab/core-components-themes \\
        --ignore @alfalab/core-components-scrollbar \\
        --ignore @alfalab/stack-context \\
        --all`,
    { silent: true },
).stdout;

const packageList = packages
    .split('\n')
    .map((pkg) => pkg.trim())
    .filter(Boolean)
    .map((pkg) => pkg.replace('@alfalab/core-components-', ''));

const options = {
    ignorePatterns: [
        // files matching these patterns will be ignored
        'dist',
        'node_modules',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.stories.tsx',
    ],
    ignoreMatches: ['tslib'],
    parsers: {
        // the target parsers
        '**/*.js': depcheck.parser.es6,
        '**/*.jsx': depcheck.parser.jsx,
        '**/*.ts': depcheck.parser.typescript,
        '**/*.tsx': depcheck.parser.typescript,
    },
    detectors: [
        // the target detectors
        depcheck.detector.importDeclaration,
        depcheck.detector.typescriptImportType,
        depcheck.detector.exportDeclaration,
    ],
};

async function run() {
    let result = null;

    while (packageList.length > 0) {
        const pkgName = packageList.pop();

        const { dependencies, missing } = await depcheck(
            path.resolve(process.cwd(), `./packages/${pkgName}`),
            options,
        );

        if (dependencies.length > 0 || Object.keys(missing).length > 0) {
            if (!result) {
                result = {};
            }

            result[pkgName] = { unusedDeps: dependencies, missingDeps: missing };
        }
    }

    return result;
}

run()
    .then((res) => {
        if (res) {
            console.log('Found unused or missing dependencies:\n');
            Object.keys(res).forEach((pkgName) => {
                console.log(pkgName + ':');
                if (res[pkgName].unusedDeps.length > 0) {
                    console.log('Unused dependencies:');
                    res[pkgName].unusedDeps.forEach((depName) => {
                        console.log('  ', depName);
                    });
                }

                if (Object.keys(res[pkgName].missingDeps).length > 0) {
                    console.log('Missing dependencies:');
                    Object.keys(res[pkgName].missingDeps).forEach((depName) => {
                        console.log('  ', depName);
                        res[pkgName].missingDeps[depName].forEach((fileName) => {
                            console.log('     ', fileName);
                        });
                    });
                }

                console.log('\n');
            });

            // TODO нужен process.exit(1). Сейчас depcheck не проверяет /mobile, /desktop, так как там есть package.json. https://github.com/depcheck/depcheck/issues/704
        } else {
            console.log('No unused dependencies found.');
        }

        process.exit(0);
    })
    .catch((e) => {
        console.error('lint-deps error:', e);

        process.exit(1);
    });
