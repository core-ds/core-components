import { PurgeCSS } from 'purgecss';
import globby from 'globby';
import fs from 'fs/promises';

const matches = await globby('dist/**/*.css', { ignore: ['**/src/**/*.css'] });

for (const match of matches) {
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

    result.forEach(({ css, file }) => {
        // удаляем пустые блоки :root
        fs.writeFile(file, css.replace(/^:root {\n}\n/gm, ''));
    });
}
