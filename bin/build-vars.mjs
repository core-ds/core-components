import { globby } from 'globby';
import handlebars from 'handlebars';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import exportCustomVariables, {
    defaultAssigner,
    defaultPropertySetAssigner,
} from 'postcss-export-custom-variables';
import postcssImport from 'postcss-import';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const renderVariables = handlebars.compile(
    await fs.readFile(path.join(dirname, 'templates/css-vars-module.hbs'), { encoding: 'utf8' }),
    { noEscape: true },
);

const renderStyles = handlebars.compile(
    await fs.readFile(path.join(dirname, 'templates/css-styles-module.hbs'), { encoding: 'utf8' }),
    { noEscape: true },
);

const CSS_REGEXP = /\.css$/;

function createExportOptions(destination) {
    const deprecated = {};

    function collectDeprecated(assigner) {
        return function decoratedAssigner(name, value, node) {
            const result = assigner(name, value, node);
            const next = node.next();

            if (next && next.type === 'comment' && next.text === 'deprecated') {
                Object.assign(
                    deprecated,
                    ...Object.keys(result).map((varName) => ({ [varName]: true })),
                );
            }

            return result;
        };
    }

    return {
        customMediaQueryAssigner: collectDeprecated(defaultAssigner),
        customPropertyAssigner: collectDeprecated(defaultAssigner),
        customPropertySetAssigner: collectDeprecated(defaultPropertySetAssigner),
        customSelectorAssigner: collectDeprecated(defaultAssigner),
        exporter: (variables, options) => cssVarsExporter(variables, options, deprecated),
        destination,
    };
}

async function cssVarsExporter(rawVariables, options, deprecated = {}) {
    const variables = Object.fromEntries(
        Object.entries(rawVariables).map(([name, value]) => {
            // regexp source https://github.com/csstools/postcss-export-custom-variables/blob/ce15caa33e52cca56b0b95cebfc9f32f3a8e6923/index.js#L112
            const valueString = JSON.stringify(value).replace(/(^|{|,)"(.+?)":/g, '$1$2:');

            return [name, valueString];
        }),
    );

    return fs.writeFile(options.destination, renderVariables({ variables, deprecated }), {
        encoding: 'utf8',
    });
}

async function buildCssIndex() {
    const matches = await globby('src/*index.css');

    return Promise.all(
        matches.map(async (cssPath) => {
            const css = await fs.readFile(cssPath, { encoding: 'utf8' });
            const destination = cssPath.replace(CSS_REGEXP, '.ts');

            return postcss([
                postcssImport({}),
                exportCustomVariables(createExportOptions(destination)),
            ]).process(css, { from: cssPath });
        }),
    );
}

async function buildPalettes() {
    const matches = await globby('src/{colors,shadows}*.css');

    return Promise.all(
        matches.map(async (cssPath) => {
            const css = await fs.readFile(cssPath, { encoding: 'utf8' });
            const destination = cssPath.replace(CSS_REGEXP, '.module.ts');
            const result = await postcss([
                exportCustomVariables(createExportOptions(destination)),
            ]).process(css, { from: cssPath });

            return fs.writeFile(
                cssPath.replace(CSS_REGEXP, '.ts'),
                renderStyles({ styles: result.css }),
                { encoding: 'utf8' },
            );
        }),
    );
}

async function main() {
    await Promise.all([buildCssIndex(), buildPalettes()]);
}

await main();
