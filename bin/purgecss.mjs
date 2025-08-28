import fs from 'fs/promises';

import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';
import postcss from 'postcss';
import { glob } from 'tinyglobby';

/**
 * @returns {import('postcss').AcceptedPlugin}
 */
const removeCommentPlugin = () => ({
    postcssPlugin: 'postcss-remove-comment',
    OnceExit(root) {
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
    OnceExit(root) {
        root.walkRules(':root', (rule) => {
            if (rule.nodes.length === 0) {
                rule.remove();
            }
        });
    },
});

async function main() {
    const cssFiles = await glob('dist/**/*.css', { ignore: ['**/src/**/*.css'] });

    await Promise.all(
        cssFiles.map(async (cssFile) => {
            const css = await fs.readFile(cssFile, { encoding: 'utf8' });

            const result = await postcss([
                purgeCSSPlugin({
                    content: ['dist/**/*.js'],
                    variables: true,
                    /**
                     * Мы юзаем purgecss только чтобы удалить лишнюю портянку из переменных
                     * Поэтому указываем, что ВООБЩЕ никакие селекторы удалять не нужно
                     */
                    safelist: [/.*/],
                }),
                // удаляем комментарии
                removeCommentPlugin(),
                // удаляем пустые блоки :root
                removeEmptyRootPlugin(),
            ]).process(css, { from: cssFile });

            return fs.writeFile(cssFile, result.css, { encoding: 'utf8' });
        }),
    );
}

await main();
