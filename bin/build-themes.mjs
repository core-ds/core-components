import { globby } from 'globby';
import path from 'node:path';
import fs from 'node:fs/promises';
import postcss from 'postcss';
import postcssColorMod from 'postcss-color-mod-function';
import postcssImport from 'postcss-import';
import postcssMixins from 'postcss-mixins';
import * as process from 'node:process';
import { getPackages } from '@manypkg/get-packages';
import { fileURLToPath } from 'node:url';
import handlebars from 'handlebars';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { packages } = await getPackages(process.cwd());
const vars = packages.find(({ packageJson: { name } }) => name === '@alfalab/core-components-vars');

const renderStyles = handlebars.compile(
    await fs.readFile(path.join(__dirname, 'templates/css-styles-module.hbs'), {
        encoding: 'utf8',
    }),
    { noEscape: true },
);

/**
 * @returns {import('postcss').AcceptedPlugin}
 */
const postcssMixinToRoot = () => ({
    postcssPlugin: 'postcss-mixin-to-root',
    Once(root, { Rule }) {
        root.walkAtRules((atRule) => {
            if (atRule.name === 'define-mixin') {
                atRule.replaceWith(
                    new Rule({ selector: ':root', raws: atRule.raws, nodes: atRule.nodes }),
                );
            }
        });
    },
});

/**
 * @param {Object} options
 * @param {string[]} options.files
 * @returns {import('postcss').AcceptedPlugin}
 */
const postcssAddImports = ({ files }) => ({
    postcssPlugin: 'postcss-add-imports',
    Once(root, { AtRule }) {
        root.prepend(
            files.map((filePath) => new AtRule({ name: 'import', params: `'${filePath}'` })),
        );
    },
});

/**
 * @param {string} cssFile
 * @returns {Promise<string>}
 */
const processComponentTheme = async (cssFile) => {
    const colors = await globby(path.join(vars.dir, 'src/colors-*.css'), {
        ignore: ['**/*-indigo.css'],
    });

    const content = await fs.readFile(cssFile, { encoding: 'utf8' });

    const result = await postcss([
        postcssImport({}),
        postcssColorMod({
            unresolved: 'throw',
            importFrom: colors,
        }),
        postcssMixinToRoot(),
    ]).process(content, { from: cssFile });

    return result.css;
};

/**
 * @param {string} cssFile
 * @returns {Promise<string>}
 */
const processRootTheme = async (cssFile) => {
    /**
     * В каждый файл с темой необходимо импортировать переменные
     * Это необходимо, так как некоторые проекты используют arui-scripts, который под капотом использует postcss-custom-properties
     * 'postcss-custom-properties' - заменяет переменные значениями, что без дублирования импортов переменных будет приводить к потере значений
     */
    const getImports = async () => {
        if (cssFile.includes('dark.css')) return [];

        return globby(path.join(vars.dir, 'src/*.css'), {
            absolute: true,
            ignore: [
                '**/colors-!(@(addons|bluetint|monochrome|transparent)).css',
                '**/shadows-!(bluetint).css',
                '**/*@(index|dark).css',
            ],
        });
    };

    const content = await fs.readFile(cssFile, { encoding: 'utf8' });

    const result = await postcss([
        // добавляем импорты переменных
        postcssAddImports({ files: await getImports() }),
        // меняем миксин на :root
        postcssMixinToRoot(),
        postcssImport({}),
        postcssMixins({}),
        postcssColorMod({
            unresolved: 'throw',
        }),
    ]).process(content, { from: cssFile });

    return result.css;
};

async function main() {
    // Переходим в папку с мисинами и парсим темы
    const themes = await globby('src/mixins/*.css');

    for (const themeFile of themes) {
        const { name: themeName } = path.parse(themeFile);
        // Извлекаем переменные из файлов с миксинами и генерируем css-файлы, записывая переменные в :root
        const cssFiles = await globby(`src/mixins/*/${themeName}.css`);

        for (const cssFile of cssFiles) {
            const componentName = path.basename(path.dirname(cssFile));

            await fs.mkdir(`dist/${componentName}`, { recursive: true });

            const content = await processComponentTheme(cssFile);

            await fs.writeFile(`dist/${componentName}/${themeName}.css`, content, {
                encoding: 'utf8',
            });
        }

        const content = await processRootTheme(themeFile);
        await fs.writeFile(`dist/${themeName}.css`, content, { encoding: 'utf8' });
        await fs.writeFile(`src/${themeName}.ts`, renderStyles({ styles: content }), {
            encoding: 'utf8',
        });
    }
}

await main();
