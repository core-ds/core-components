const { PurgeCSS } = require('purgecss');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

const ignorePackages = ['themes', 'vars', 'grid'];

const cwd = process.cwd();
const pkgPath = path.resolve(cwd, 'package.json');
const pkgName = require(pkgPath).name.replace('@alfalab/core-components-', '');

const shouldSkipPath = (path) =>
    ignorePackages.some(
        (package) => path.includes(`dist/${package}`) || path.includes(`packages/${package}`),
    );

// Скипаем purgecss для пакетов в ignorePackages списке
if (shouldSkipPath(cwd)) process.exit(0);

// Ищем css внутри пакета в packages и в root бандле
const matches = glob.sync(`{dist/**/*.css,../../dist/${pkgName}/**/*.css}`, {
    ignore: '**/src/**/*.css',
});

matches.forEach((match) => {
    const purge = new PurgeCSS();

    const isRootPkg = match.startsWith('../../dist');

    purge
        .purge({
            content: [isRootPkg ? `../../dist/${pkgName}/**/*.js` : 'dist/**/*.js'],
            css: [match],
            variables: true,
            /**
             * Мы юзаем purgecss только чтобы удалить лишнюю портянку из переменных
             * Поэтому указываем, что ВООБЩЕ никакие селекторы удалять не нужно
             */
            whitelistPatterns: [/.*/],
        })
        .then((result) => {
            result.forEach(({ css, file }) => {
                // удаляем пустые блоки :root
                css = css.replace(/^:root {\n}\n/gm, '');
                writeFile(file, css);
            });
        })
        .catch((err) => {
            console.log(err);
        });
});
