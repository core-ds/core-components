import postcss from 'postcss';
import { globSync } from 'tinyglobby';
import path from 'node:path';
import fs from 'node:fs/promises';

describe('themes', () => {
    const files = globSync('*.css', {
        ignore: '**/dark.css',
        cwd: path.resolve(__dirname, '..', 'dist'),
        absolute: true,
    }).map((file) => path.parse(file));

    const noFiles = files.length === 0;

    if (noFiles) {
        console.warn('themes must be built first');
    }

    // skip test if there's no files
    const testFn = noFiles ? xtest : test;

    testFn.each(files)("$name theme's variables must be resolved", async ({ dir, base }) => {
        const file = path.join(dir, base);
        const content = await fs.readFile(file, { encoding: 'utf8' });
        const root = postcss.parse(content, { from: file });

        root.walkDecls((decl) => {
            // RegExp is based on https://github.com/csstools/postcss-export-custom-variables/blob/ce15caa33e52cca56b0b95cebfc9f32f3a8e6923/index.js#L8
            const match = decl.value.match(/^var\((--[_a-zA-Z]+[_a-zA-Z0-9-]*)\)$/);

            if (match) {
                const [, name] = match;
                const callback = jest.fn();

                root.walkDecls(name, callback);

                expect(callback).toHaveBeenCalledTimes(1);
            }
        });
    });
});
