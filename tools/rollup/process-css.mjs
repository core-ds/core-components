import globby from 'globby';
import postcss from 'postcss';
import path from 'path';
import { checkOrCreateDir, readFile, writeFile } from './common.mjs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const postcssConfig = require(path.join(process.env.LERNA_ROOT_PATH, 'postcss.config'));

async function generateCssFile(source, options) {
    const dest = path.resolve(source).replace('src', `dist/${options.folder}`);
    let { plugins } = postcssConfig;

    if (options.noCommonVars) {
        plugins = plugins.map((plugin) =>
            plugin.postcssPlugin === 'postcss-import'
                ? require('postcss-import')({
                      warnOnEmpty: false,
                      load: async (filename, importOptions) => {
                          if (filename.includes('/vars/src/index.css')) {
                              // TODO: warnOnEmpty добавлен только в 16й версии postcss-import. Но для нее требуется node >= 18
                              // В текущей версиии postcss-import импорт пустого файла вызывает ошибку
                              // https://github.com/postcss/postcss-import/issues/84
                              return '/* */';
                          }

                          return readFile(filename, 'utf-8');
                      },
                  })
                : plugin,
        );
    }

    // replace `typography.css` mixins by `alfasans-typography.css` mixins
    if (/\/alfasans-.*\.css$/.test(source)) {
        plugins = plugins.map((plugin) =>
            plugin.postcssPlugin === 'postcss-mixins'
                ? require('postcss-mixins')({
                      mixinsFiles: globby.sync(
                          path.join(process.env.LERNA_ROOT_PATH, 'packages/vars/src/*.css'),
                          { ignore: ['**/@(index|typography).css'] },
                      ),
                  })
                : plugin,
        );
    }

    const content = await readFile(source, 'utf-8');

    const result = await postcss(plugins).process(content, { from: source });

    await checkOrCreateDir(path.dirname(dest));

    await writeFile(dest, result.css);
}

export default function processCss(options = {}) {
    return {
        name: 'process-css',
        buildEnd: async () => {
            const dist = path.resolve(`dist/${options.folder}`);

            await checkOrCreateDir(dist);

            try {
                const matchedPaths = await globby('src/**/*.css');

                await Promise.all(matchedPaths.map((source) => generateCssFile(source, options)));
            } catch (error) {
                //
                console.log(error);
            }
        },
    };
}
