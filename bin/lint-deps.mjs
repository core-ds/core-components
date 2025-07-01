import depcheck from 'depcheck';
import * as process from 'node:process';

const { detector, parser } = depcheck;

/**
 * @type {depcheck.Options}
 */
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

async function main() {
    const { dependencies, missing } = await depcheck(process.cwd(), options);

    if ([dependencies, Object.keys(missing)].every((deps) => deps.length === 0)) {
        return;
    }

    console.log('Found unused or missing dependencies:\n');

    if (dependencies.length > 0) {
        console.log('Unused dependencies:');
        dependencies.forEach((name) => {
            console.log(`${' '.repeat(2)}${name}`);
        });
    }

    if (Object.keys(missing).length > 0) {
        console.log('Missing dependencies:');
        Object.entries(missing).forEach(([name, fileNames]) => {
            console.log(`${' '.repeat(2)}${name}`);
            fileNames.forEach((fileName) => {
                console.log(`${' '.repeat(4)}${fileName}`);
            });
        });
    }

    process.exit(1);
}

await main();
