import fs from 'fs/promises';
import path from 'path';

/* Плагин генерации js файлов для подключения тем */
export default function inlineThemes() {
    return {
        name: 'inline-themes',
        async transform(_, id) {
            if (/\/packages\/themes\/src\/[^/]+\.ts/.test(id)) {
                const theme = id.split('/').pop().split('.')[0];

                const cssContent = await fs.readFile(
                    path.resolve(path.dirname(id), `../dist/${theme}.css`),
                    'utf8',
                );

                return {
                    code: `export default \`${cssContent}\``,
                    map: { mappings: '' },
                };
            }

            return null;
        },
    };
}
