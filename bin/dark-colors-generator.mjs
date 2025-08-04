import { globby } from 'globby';
import fs from 'node:fs/promises';
import postcss from 'postcss';

/**
 * @returns {import('postcss').AcceptedPlugin}
 */
const postcssLightToDarkColors = () => ({
    postcssPlugin: 'postcss-light-to-dark-colors',
    Once: (root, { Declaration }) => {
        root.walkDecls((decl) => {
            // Check if color is light
            if (/^--color-light-[\w-]+$/.test(decl.prop)) {
                decl.replaceWith(
                    new Declaration({
                        prop: decl.prop,
                        // --color-light-decorative-fuchsia-hover -> --color-dark-decorative-fuchsia-hover
                        value: `var(${decl.prop.replace(/^(--color)-light-(.*)$/, '$1-dark-$2')})`,
                    }),
                );
            } else {
                decl.remove();
            }
        });
    },
});

/**
 * Скрипт предназначен для генерации css файлов с переопределением переменных для темной темы
 * Обрабатывает файлы которые начинаются с "colors-"
 * Скрипт автоматически запустится при обновлении ui-primitives
 * Исключены файлы [colors-bluetint.css, colors-indigo.css] => эти палитры обработаны в themes/src/dark.css
 *
 * PR https://github.com/core-ds/core-components/pull/1514
 */

async function main() {
    const files = await globby('packages/vars/src/colors-*.css', {
        ignore: ['**/colors-bluetint.css', '**/colors-indigo.css', '**/*dark.css'],
    });

    for (const file of files) {
        const content = await fs.readFile(file, { encoding: 'utf8' });
        const result = await postcss(postcssLightToDarkColors()).process(content, { from: file });

        // Find all :root selectors
        const rootSelectors = result.root.nodes.filter(
            (node) => node.type === 'rule' && node.selector === ':root',
        );

        // Check if any :root selector has any declaration
        if (rootSelectors.some((root) => root.nodes.some((node) => node.type === 'decl'))) {
            const outputFile = file.replace(/\.css$/, '-dark.css');

            await fs.writeFile(outputFile, result.css, { encoding: 'utf8' });
            console.log('[+] Переменные записаны в файл:', outputFile);
        } else {
            console.log(`[!] Отсутствуют парные переменные, пропуск файла: ${file}`);
        }
    }
}

await main();
