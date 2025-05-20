module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tools/jest/setupScreenshotsTests.ts'],
    modulePathIgnorePatterns: ['dist'],
    globals: {
        'ts-jest': {
            babelConfig: {
                plugins: [
                    '@babel/plugin-proposal-optional-chaining',
                    '@babel/plugin-proposal-nullish-coalescing-operator',
                ],
            },
            tsconfig: 'tsconfig.test.json',
        },
    },
    moduleNameMapper: {
        '@alfalab/core-components-(.*)/(.*)$': '<rootDir>/packages/$1/src/$2',
        '@alfalab/core-components-(.*)$': '<rootDir>/packages/$1/src',
        '\\.css$': 'identity-obj-proxy',
    },
    testMatch: ['**/*.screenshots.test.ts?(x)'],
    maxWorkers: 5,
    testTimeout: 200000,
};
