import globby from 'globby';
import path from 'node:path';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import postcss from 'postcss';
import postcssColorMod from 'postcss-color-mod-function';
import postcssImport from 'postcss-import';
import postcssMixins from 'postcss-mixins';

/**
 * @returns {import('postcss').AcceptedPlugin}
 */
const postcssMixinToRoot = () => ({
    postcssPlugin: 'postcss-mixin-to-root',
    Once(root, { Rule }) {
        root.walkAtRules((atrule) => {
            if (atrule.name === 'define-mixin') {
                atrule.replaceWith(
                    new Rule({ selector: ':root', raws: atrule.raws, nodes: atrule.nodes }),
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
    const colors = globby.sync(
        path.join(process.env.LERNA_ROOT_PATH, 'packages/vars/src/colors-*.css'),
        { ignore: '**/*-indigo.css' },
    );

    const content = await readFile(cssFile, { encoding: 'utf8' });

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
    const getImports = () => {
        if (cssFile.includes('dark.css')) return [];

        return globby.sync(path.join(process.env.LERNA_ROOT_PATH, 'packages/vars/src/*.css'), {
            absolute: true,
            ignore: [
                '**/colors-!(@(addons|bluetint|monochrome|transparent)).css',
                '**/shadows-!(bluetint).css',
                '**/*@(index|dark).css',
            ],
        });
    };

    const content = await readFile(cssFile, { encoding: 'utf8' });

    const result = await postcss([
        // добавляем импорты переменных
        postcssAddImports({ files: getImports() }),
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

(async function main() {
    // Переходим в папку с мисинами и парсим темы
    const themes = globby.sync('src/mixins/*.css');

    for (const themeFile of themes) {
        const { name: themeName } = path.parse(themeFile);
        // Извлекаем переменные из файлов с миксинами и генерируем css-файлы, записывая переменные в :root
        const cssFiles = globby.sync(`src/mixins/?*/${themeName}.css`);

        for (let cssFile of cssFiles) {
            const componentName = path.basename(path.dirname(cssFile));

            await mkdir(`dist/${componentName}`, { recursive: true });

            const content = await processComponentTheme(cssFile);

            await writeFile(`dist/${componentName}/${themeName}.css`, content);
        }

        const content = await processRootTheme(themeFile);
        await writeFile(`dist/${themeName}.css`, content);
    }
})();
