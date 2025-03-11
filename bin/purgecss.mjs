import { PurgeCSS } from 'purgecss';
import globby from 'globby';
import fs from 'fs/promises';
import postcss from 'postcss';

/**
 * @returns {import('postcss').AcceptedPlugin}
 */
const removeCommentPlugin = () => ({
    postcssPlugin: 'postcss-remove-comment',
    Once(root) {
        root.walkComments((comment) => {
            comment.remove();
        });
    },
});

/**
 * @returns {import('postcss').AcceptedPlugin}
 */
const removeEmptyRootPlugin = () => ({
    postcssPlugin: 'postcss-remove-empty-root',
    Once(root) {
        root.walkRules((rule) => {
            if (rule.selector === ':root' && rule.nodes.length === 0) {
                rule.remove();
            }
        });
    },
});

async function main() {
    const matches = await globby('dist/**/*.css', { ignore: ['**/src/**/*.css'] });

    await Promise.all(
        matches.map(async (match) => {
            const purge = new PurgeCSS();

            const result = await purge.purge({
                content: ['dist/**/*.js'],
                css: [match],
                variables: true,
                /**
                 * Мы юзаем purgecss только чтобы удалить лишнюю портянку из переменных
                 * Поэтому указываем, что ВООБЩЕ никакие селекторы удалять не нужно
                 */
                whitelistPatterns: [/.*/],
            });

            return Promise.all(
                result.map(async ({ css, file }) => {
                    const postcssResult = await postcss([
                        // удаляем комментарии
                        removeCommentPlugin(),
                        // удаляем пустые блоки :root
                        removeEmptyRootPlugin(),
                    ]).process(css, { from: file });

                    return fs.writeFile(file, postcssResult.css, { encoding: 'utf8' });
                }),
            );
        }),
    );
}

await main();
