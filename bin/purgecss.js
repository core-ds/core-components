const { PurgeCSS } = require('purgecss');
const glob = require('glob');
const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

const ignorePackages = ['themes', 'vars', 'grid'];

const shouldSkipPath = (path) =>
    ignorePackages.some(
        (package) => path.includes(`dist/${package}`) || path.includes(`packages/${package}`),
    );

// Скипаем purgecss при запуске из лерны внутри пакета
if (shouldSkipPath(process.cwd())) process.exit(0);

const matches = glob.sync('dist/**/*.css');

matches.forEach((match) => {
    const purge = new PurgeCSS();

    // Скипаем purgecss при запуске в рут пакете
    if (shouldSkipPath(match)) return;

    purge
        .purge({
            content: ['dist/**/*.js'],
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
