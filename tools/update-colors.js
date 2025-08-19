const fs = require('fs');
const glob = require('glob');
const path = require('path');
const postcss = require('postcss');
const postcssColorMod = require('postcss-color-mod-function');

const uiPrimitivesPath = path.dirname(require.resolve('ui-primitives/package.json'));

const colorMods = require('./color-mods.json');

const UNDERSCORE_RE = /_/g;
const DASH = '-';

const colorsDir = path.join(uiPrimitivesPath, 'styles');
const deprecatedPalettes = ['colors.json', 'colors_indigo.json'];

glob(path.join(colorsDir, 'colors*.json'), {}, (err, files) => {
    files.forEach((pathname) => {
        const colors = requireColors(pathname);

        generateColorMods(colors);

        let css = '';
        const isDeprecatedPalette = deprecatedPalettes.some((palette) =>
            pathname.includes(palette),
        );

        Object.entries(colors).forEach(([color, token]) => {
            let value = token.hex && token.hex.length <= 7 ? token.hex : token.rgba;
            css += `    ${buildVarName(color)}: ${value};${
                token.deprecated || isDeprecatedPalette ? ' /* deprecated */' : ''
            }\n`;
        });

        const cssPath = path.resolve(
            __dirname,
            '../packages/vars/src',
            path.basename(pathname).replace('.json', '.css').replace('_', '-'),
        );

        postcss([
            postcssColorMod({
                unresolved: 'throw',
            }),
        ])
            .process(`:root {\n${css}}\n`, { from: cssPath })
            .then((result) => {
                fs.writeFileSync(cssPath, result.css);

                if (pathname.includes('indigo')) {
                    buildDarkThemeVars(colors);
                }
            });
    });
});

function buildDarkThemeVars(colors) {
    const mixinsDir = path.resolve(__dirname, '../packages/themes/src/mixins');
    const varsDir = path.resolve(__dirname, '../packages/themes/src');
    const fileName = 'dark.css';

    let mixin = '@define-mixin theme-dark {\n';
    let vars = ':root {';

    Object.keys(colors).forEach((color) => {
        if (/^light-/.test(color) === false) return;

        const pair = color
            .replace(/^light-/, 'dark-')
            .replace(/-(shade|tint)-/, (v) => (v === '-shade-' ? '-tint-' : '-shade-'));

        if (colors[pair] && !color.endsWith('-old')) {
            const varName = `    ${buildVarName(color)}: var(--color-${pair});\n`;
            vars += varName;
            mixin += varName;
        } else {
            console.warn(`No pair found for '${color}' color.`);
        }
    });

    vars += '}';
    mixin += '}';

    fs.writeFileSync(path.join(mixinsDir, fileName), mixin);
    fs.writeFileSync(path.join(varsDir, fileName), vars);
}

function requireColors(pathname) {
    return Object.entries(require(pathname)).reduce((acc, [name, value]) => {
        acc[name.replace(UNDERSCORE_RE, DASH)] = value;
        return acc;
    }, {});
}

function generateColorMods(colors) {
    Object.entries(colors).forEach(([colorName, token]) => {
        const modsConfig = getModsConfig(colorName);

        if (!modsConfig) return;

        Object.entries(modsConfig).forEach(([mod, modValues]) => {
            modValues.forEach((modValue) => {
                const generatedColorName = `${colorName}-${mod}-${modValue}`;

                const colorValue = token.hex.length <= 7 ? token.hex : token.rgba;

                if (['tint', 'shade'].includes(mod) && token.hex.length > 7) {
                    colors[generatedColorName] = {
                        hex: '',
                        rgba: `color-mod(${colorValue} blenda(${
                            mod === 'tint' ? 'white' : 'black'
                        } ${modValue}%))`,
                        deprecated: true,
                    };
                } else {
                    colors[generatedColorName] = {
                        hex: '',
                        rgba: `color-mod(${colorValue} ${mod}(${modValue}%))`,
                        deprecated: true,
                    };
                }
            });
        });
    });
}

function getModsConfig(colorName) {
    const config = colorMods[colorName.replace('dark-', 'light-')];

    if (!config) return null;

    const isDark = colorName.startsWith('dark-');

    if (isDark) {
        return Object.entries(config).reduce((acc, [mod, modValue]) => {
            acc[invertMod(mod)] = modValue;

            return acc;
        }, {});
    } else {
        return config;
    }
}

function invertMod(mod) {
    if (mod === 'tint') return 'shade';
    if (mod === 'shade') return 'tint';
    return mod;
}

function buildVarName(colorName) {
    return `--color-${colorName}`;
}
