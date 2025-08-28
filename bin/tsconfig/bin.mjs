/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-shadow */

import dedent from 'dedent';
import fse from 'fs-extra';
import micromatch from 'micromatch';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { argv, cwd, exit } from 'node:process';
import { fileURLToPath } from 'node:url';
import slash from 'slash';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { getPackages } from '../../tools/monorepo.cjs';
import { readPackagesFile } from '../../tools/read-packages-file.cjs';
import { isNonNullable } from '../../tools/utils.cjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));
/**
 * @type {Configuration[]}
 */
const configs = await fse.readJson(path.join(dirname, 'config.json'), { encoding: 'utf8' });

const STORYBOOK_PATH = path.resolve(process.cwd(), '.storybook');
const IGNORED_PACKAGES = await readPackagesFile(path.join(dirname, '.ignored-packages'));
const INTERNAL_PACKAGES = getPackages().packages.filter(
    ({ packageJson: { name } }) => !IGNORED_PACKAGES.includes(name),
);
const INTERNAL_PACKAGES_NAMES = INTERNAL_PACKAGES.map(({ packageJson: { name } }) => name);

await yargs(hideBin(argv))
    .command(
        'generate',
        'Generate tsconfig',
        (yargs) =>
            yargs
                .option('scope', {
                    type: 'array',
                    description: 'Scope of packages to generate tsconfig for',
                    choices: INTERNAL_PACKAGES_NAMES,
                })
                .option('test', {
                    type: 'boolean',
                    description: 'Generate tsconfig for tests',
                    default: false,
                })
                .option('storybook', {
                    type: 'boolean',
                    description: 'Generate tsconfig for storybook',
                    default: false,
                })
                .option('all', {
                    type: 'boolean',
                    description: 'Generate tsconfig for all',
                    default: false,
                }),
        (yargs) =>
            Promise.all(
                [
                    ...(yargs.storybook || yargs.all ? ['storybook'] : []),
                    ...(yargs.test || yargs.all ? ['test'] : []),
                    ...(yargs.all ? INTERNAL_PACKAGES_NAMES : yargs.scope ?? []),
                ].map(async (id) =>
                    Promise.all(
                        configs.map(async (config) => {
                            const options = resolveOptions(config, id);

                            if (options.skip) {
                                return Promise.resolve();
                            }

                            return fse.writeJson(options.out, await makeTsConfig(options), {
                                encoding: 'utf8',
                            });
                        }),
                    ),
                ),
            ),
    )
    .command(
        'check',
        'Check tsconfig',
        (yargs) => yargs,
        async () => {
            const errors = (
                await Promise.all(
                    ['storybook', 'test', ...INTERNAL_PACKAGES_NAMES].map(async (id) => {
                        const result = await Promise.all(
                            configs.map(async (config) => {
                                const options = resolveOptions(config, id);

                                if (options.skip) {
                                    return true;
                                }

                                if (existsSync(options.out)) {
                                    const [expected, actual] = await Promise.all([
                                        makeTsConfig(options),
                                        fse.readJson(options.out, { encoding: 'utf8' }),
                                    ]);

                                    return isEqual(expected, actual);
                                }

                                return false;
                            }),
                        );

                        return [id, result.every((isEqual) => isEqual)];
                    }),
                )
            ).filter(([, isEqual]) => !isEqual);

            if (errors.length === 0) {
                return;
            }

            console.log(dedent`
                Please update tsconfig files, using the following commands:
                    ${errors.map(([id]) => {
                        const args = INTERNAL_PACKAGES_NAMES.includes(id)
                            ? `--scope ${id}`
                            : `--${id}`;

                        return `yarn tsconfig generate ${args}`;
                    }).join(`
                    `)}
            `);

            exit(1);
        },
    )
    .demandCommand()
    .strict()
    .help()
    .parse();

/**
 * @param {string} relativePath
 * @returns {string}
 */
function normalizePath(relativePath) {
    if (relativePath === '') {
        return '.';
    }

    return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
}

/**
 * @param {import('@manypkg/get-packages').Package[]} packages
 * @param {string} dir
 * @returns {Record<string, string[]>}
 */
function generatePaths(packages, dir) {
    return Object.fromEntries(
        packages.flatMap((pkg) => {
            const { name } = pkg.packageJson;
            const prefix = normalizePath(slash(path.relative(dir, pkg.dir)));

            return [
                [name, [`${prefix}/src`]],
                [`${name}/*`, [`${prefix}/src/*`]],
            ];
        }),
    );
}

/**
 * @param {Options} options
 * @returns {Promise<Object>}
 */
async function makeTsConfig(options) {
    const { dir, packages, referencesValues: references } = options;
    const tsconfig = await fse.readJson(options.template, { encoding: 'utf8' });

    if (isNonNullable(tsconfig.compilerOptions)) {
        tsconfig.compilerOptions.paths = generatePaths(packages, dir);
    }

    if (options.references) {
        tsconfig.references = references.map((reference) => ({
            path: slash(path.relative(dir, reference)),
        }));
    }

    if (isNonNullable(options.storybook)) {
        const relativeStorybookPath = slash(normalizePath(path.relative(dir, options.storybook)));

        tsconfig.compilerOptions.paths = {
            'storybook/*': [`${relativeStorybookPath}/*`],
            ...tsconfig.compilerOptions.paths,
        };

        if (options.references) {
            tsconfig.references = [{ path: relativeStorybookPath }, ...tsconfig.references];
        }
    }

    if (
        isNonNullable(tsconfig.compilerOptions) &&
        Object.keys(tsconfig.compilerOptions.paths).length === 0
    ) {
        delete tsconfig.compilerOptions.paths;
    }

    if (tsconfig.references?.length === 0) {
        delete tsconfig.references;
    }

    return tsconfig;
}

/**
 * @typedef Options
 * @property {boolean} skip
 * @property {string} dir
 * @property {string} out
 * @property {string} template
 * @property {import('@manypkg/get-packages').Package[]} packages
 * @property {boolean} references
 * @property {string[]} referencesValues
 * @property {string} [storybook]
 */

/**
 * @param {Configuration} config
 * @param {string} id
 * @returns {Options}
 */
// eslint-disable-next-line complexity
function resolveOptions(config, id) {
    const { rules } = config;
    const override = config.override?.[id] ?? {};
    let include = override.include ?? rules.include ?? [];
    const exclude = override.exclude ?? rules.exclude ?? [];
    const referencesValue = override.references ?? rules.references ?? false;
    const references = typeof referencesValue === 'string' || referencesValue;
    const includeDependencies = override.dependencies ?? rules.dependencies ?? false;
    const includeDevDependencies = override.devDependencies ?? rules.devDependencies ?? false;
    const includePeerDependencies = override.peerDependencies ?? rules.peerDependencies ?? false;
    const output = override.out ?? rules.out;
    const skip = override.skip ?? rules.skip ?? false;
    /**
     * @type {string}
     */
    let dir;

    const isInternal = INTERNAL_PACKAGES_NAMES.includes(id);

    if (isInternal) {
        const pkg = INTERNAL_PACKAGES.find(({ packageJson: { name } }) => name === id);
        const {
            packageJson: { dependencies, devDependencies, peerDependencies },
        } = pkg;

        ({ dir } = pkg);
        const all = Object.keys({
            ...(includeDependencies ? dependencies : null),
            ...(includeDevDependencies ? devDependencies : null),
            ...(includePeerDependencies ? peerDependencies : null),
        });

        include = [...include, id, ...all];
    } else {
        dir = id === 'storybook' ? STORYBOOK_PATH : cwd();
    }
    const out = path.resolve(dir, output);
    const packages = INTERNAL_PACKAGES.filter(({ packageJson: { name } }) =>
        micromatch.isMatch(name, include, { ignore: exclude }),
    );
    const referencesValues = references
        ? (isInternal
              ? packages.filter(({ packageJson: { name } }) => !(name === id))
              : packages
          ).map((pkg) =>
              typeof referencesValue === 'string'
                  ? slash(path.join(pkg.dir, referencesValue))
                  : pkg.dir,
          )
        : [];

    return {
        skip,
        dir,
        out,
        packages,
        storybook: override.storybook ?? rules.storybook ? STORYBOOK_PATH : undefined,
        template: path.resolve(dirname, override.template ?? rules.template),
        references,
        referencesValues,
    };
}

/**
 * @template T
 * @param {T} a
 * @param {T} b
 * @returns {boolean}
 */
function isEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * @typedef Rules
 * @property {boolean} [skip]
 * @property {string} template
 * @property {string} out
 * @property {boolean | string} [references]
 * @property {boolean} [storybook]
 * @property {string[]} [exclude]
 * @property {string[]} [include]
 * @property {boolean} [dependencies]
 * @property {boolean} [devDependencies]
 * @property {boolean} [peerDependencies]
 */

/**
 * @typedef Configuration
 * @property {Rules} rules
 * @property {Record<string, Partial<Rules>>} override
 */
