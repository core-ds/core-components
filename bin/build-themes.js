const shell = require('shelljs');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const postcss = require('postcss');
const postcssColorMod = require('postcss-color-mod-function');
const postcssImport = require('postcss-import');
const postcssMixins = require('postcss-mixins');

const replaceMixinToRoot = (css) => css.replace(/@define-mixin.*$/m, ':root {');

const createColorsByPaletteFilter = () => {
    return (filePath) => !filePath.includes('indigo');
};

const processComponentTheme = (cssFile) => {
    const colors = glob
        .sync(path.resolve(__dirname, '../packages/vars/src/colors-*.css'))
        .filter(createColorsByPaletteFilter());

    const content = fs.readFileSync(cssFile, 'utf-8');

    return postcss([
        postcssImport({}),
        postcssColorMod({
            unresolved: 'throw',
            importFrom: colors,
        }),
    ])
        .process(content, { from: cssFile, to: cssFile })
        .then((result) => result.css);
};

const processRootTheme = (cssFile) => {
    const ignorePattern = [
        '**/colors-x5.css',
        '**/colors-decorative.css',
        '**/colors-pfm.css',
        '**/colors-qualitative.css',
        '**/colors-sequential.css',
        '**/colors-students.css',
    ];

    // Добавляем импорты переменных, меняем миксин на :root
    const content = replaceMixinToRoot(fs.readFileSync(cssFile, 'utf-8'));

    return postcss([
        postcssImport({}),
        postcssMixins({}),
        postcssColorMod({
            unresolved: 'throw',
        }),
    ])
        .process(content, { from: cssFile, to: cssFile })
        .then((result) => result.css);
};

(async () => {
    // Удаляем файл с дефолтной темой, его публиковать не нужно
    shell.rm('dist/default.css');

    // Переходим в папку с мисинами и парсим темы
    shell.cd('dist/mixins');

    const themes = glob.sync('./*.css', {});

    for (const themeFile of themes) {
        const theme = path.basename(themeFile).replace('.css', '');

        // Извлекаем переменные из файлов с миксинами и генерируем css-файлы, записывая переменные в :root
        const cssFiles = glob.sync(`./?*/${theme}.css`, { absolute: true });

        for (let cssFile of cssFiles) {
            const content = await processComponentTheme(cssFile);

            const component = path.basename(path.dirname(cssFile));

            fs.writeFileSync(cssFile, content);

            shell.mkdir('-p', `../css/${component}`);

            fs.writeFileSync(`../css/${component}/${theme}.css`, replaceMixinToRoot(content));
        }

        const content = await processRootTheme(themeFile);
        fs.writeFileSync(`../css/${theme}.css`, content);
    }

    // Переносим сгенерированные css-файлы в /dist
    shell.cd('../');
    shell.cp('-R', './css/.', './');
    shell.rm('-rf', './css');
})();
