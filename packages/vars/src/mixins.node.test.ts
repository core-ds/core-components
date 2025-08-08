import postcss, { Plugin } from 'postcss';
import fs from 'node:fs/promises';
import path from 'node:path';
import { glob } from 'tinyglobby';
import postcssImport from 'postcss-import';

interface Options {
    importTo?: (names: string[]) => void;
}

function postcssMixinNames(options: Options = {}): Plugin {
    return {
        postcssPlugin: 'postcss-mixin-names',
        prepare: () => {
            const names: string[] = [];

            return {
                Once: (root) => {
                    root.walkAtRules((atRule) => {
                        if (atRule.name === 'define-mixin') {
                            const [name] = atRule.params.split(/\s/);

                            names.push(name);
                        }
                    });
                },
                OnceExit: () => {
                    options.importTo?.(names);
                },
            };
        },
    };
}

async function getMixinNames(file: string) {
    let mixins: string[] = [];
    const content = await fs.readFile(file, { encoding: 'utf8' });

    // @ts-expect-error
    await postcss([
        postcssImport({}),
        postcssMixinNames({
            importTo: (names) => {
                mixins = names;
            },
        }),
    ]).process(content, { from: file });

    return mixins;
}

describe('mixins', () => {
    test('all typographies must have the same mixins', async () => {
        const entryPoints = await glob('*typography.css', { absolute: true, cwd: __dirname });
        const mixinsList = await Promise.all(entryPoints.map(getMixinNames));

        expect(mixinsList).not.toHaveLength(0);

        mixinsList.forEach((mixins) => {
            expect(mixins).toBeInstanceOf(Array);
            expect(mixins).not.toHaveLength(0);
        });

        mixinsList.forEach((mixins, index, arr) => {
            if (index === arr.length - 1) {
                return;
            }

            expect(mixins).toEqual(expect.arrayContaining(arr.at(index + 1)!));
        });
    });

    test.each`
        file                | ignored
        ${'typography.css'} | ${['row_limit']}
    `(
        "`no-dynamic-mixins-index.css` shouldn't contain `$file` mixins",
        async ({ file, ignored }: { file: string; ignored: string[] }) => {
            const dynamicMixins = (await getMixinNames(path.resolve(__dirname, file))).filter(
                (name) => !ignored.includes(name),
            );
            const nonDynamicMixins = await getMixinNames(
                path.resolve(__dirname, 'no-dynamic-mixins-index.css'),
            );

            expect(dynamicMixins).not.toHaveLength(0);
            expect(nonDynamicMixins).toBeInstanceOf(Array);
            expect(nonDynamicMixins).not.toEqual(expect.arrayContaining(dynamicMixins));
        },
    );
});
