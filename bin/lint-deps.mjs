import depcheck from 'depcheck';
import * as process from 'node:process';
import { getPackages } from '@manypkg/get-packages';

const { detector, parser } = depcheck;

const IGNORED_PACKAGES = [
    '@alfalab/core-components',
    '@alfalab/core-components-codemod',
    '@alfalab/core-components-vars',
    '@alfalab/core-components-themes',
    '@alfalab/core-components-scrollbar',
];

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
        '**/*.js': parser.es6,
        '**/*.jsx': parser.jsx,
        '**/*.ts': parser.typescript,
        '**/*.tsx': parser.typescript,
    },
    detectors: [
        // the target detectors
        detector.importDeclaration,
        detector.typescriptImportType,
        detector.exportDeclaration,
    ],
};

const packages = (await getPackages(process.cwd())).packages.filter(
    ({ packageJson: { name } }) => !IGNORED_PACKAGES.includes(name),
);

const result = (
    await Promise.all(
        packages.map(async ({ dir, packageJson: { name } }) => ({
            name,
            results: await depcheck(dir, options),
        })),
    )
).reduce((result, { name, results: { dependencies, missing } }) => {
    if (dependencies.length > 0 || Object.keys(missing).length > 0) {
        result[name] = { unusedDeps: dependencies, missingDeps: missing };
    }

    return result;
}, {});

if (Object.keys(result).length === 0) {
    console.log('No unused dependencies found.');
}

console.log('Found unused or missing dependencies:\n');

Object.entries(result).forEach(([pkgName, { unusedDeps, missingDeps }]) => {
    console.log(pkgName + ':');
    if (unusedDeps.length > 0) {
        console.log('Unused dependencies:');
        unusedDeps.forEach((depName) => {
            console.log('  ', depName);
        });
    }

    if (Object.keys(missingDeps).length > 0) {
        console.log('Missing dependencies:');
        Object.keys(missingDeps).forEach((depName) => {
            console.log('  ', depName);
            missingDeps[depName].forEach((fileName) => {
                console.log('     ', fileName);
            });
        });
    }
});

// TODO нужен process.exit(1). Сейчас depcheck не проверяет /mobile, /desktop, так как там есть package.json. https://github.com/depcheck/depcheck/issues/704
