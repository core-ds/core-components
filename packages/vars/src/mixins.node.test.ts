import path from 'node:path';
import { globSync } from 'tinyglobby';
import { getMixinsNames } from '@alfalab/core-components-internal-tools/utils';

describe('mixins', () => {
    const typographyFiles = globSync('*typography.css', { absolute: true, cwd: __dirname });

    test('some typographies must be defined', async () => {
        expect(typographyFiles.length).toBeGreaterThan(1);
    });

    test('all typographies must have the same set of mixins', async () => {
        const mixinsList = await Promise.all(typographyFiles.map(getMixinsNames));

        expect.assertions(mixinsList.length + (mixinsList.length === 2 ? 0 : 1));

        mixinsList.forEach((mixins, index, arr) => {
            if (index === arr.length - 1) {
                return;
            }

            expect(mixins).toEqual(expect.arrayContaining(arr.at(index + 1)!));
            // symmetric check
            expect(arr.at(index + 1)).toEqual(expect.arrayContaining(mixins));
        });
    });

    test.each(typographyFiles.map((file) => path.relative(__dirname, file)))(
        `"no-typography-index.css" shouldn't contain %p mixins`,
        async (file) => {
            const mixins = await getMixinsNames(path.resolve(__dirname, file));
            const nonMixins = await getMixinsNames(
                path.resolve(__dirname, 'no-typography-index.css'),
            );

            expect(mixins).not.toHaveLength(0);
            expect(nonMixins).toBeInstanceOf(Array);
            expect(nonMixins).not.toEqual(expect.arrayContaining(mixins));
        },
    );
});
