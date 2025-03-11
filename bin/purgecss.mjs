import { PurgeCSS } from 'purgecss';
import globby from 'globby';
import fs from 'fs/promises';
import path from 'path';

const IGNORED_PACKAGES = ['themes', 'vars', 'grid'];

const shouldSkipPath = (packagePath) =>
    IGNORED_PACKAGES.some((packageName) => packagePath.includes(path.join('packages', packageName)));

// Скипаем purgecss для пакетов в ignorePackages списке
if (shouldSkipPath(process.cwd())) {
    process.exit(0);
}

// Ищем css внутри пакета в packages
globby.sync('dist/**/*.css', { ignore: ['**/src/**/*.css'] }).forEach((match) => {
    const purge = new PurgeCSS();

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
                fs.writeFile(file, css);
            });
        })
        .catch((err) => {
            console.log(err);
        });
});
