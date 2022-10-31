/* eslint-disable no-param-reassign */
import postcss, { Plugin } from 'postcss';

// Vars for replacement {old-var: new-var}
const replacement = {
    '--color-light-border-secondary-inverted': '--color-light-border-underline',
    '--color-light-border-tertiary-inverted': '--color-light-border-underline-inverted',
    '--color-light-graphic-neutral': '--color-light-graphic-quaternary',
    '--color-light-bg-neutral': '--color-light-bg-quaternary',
    '--color-dark-graphic-neutral': '--color-dark-graphic-quaternary',
    '--color-dark-bg-neutral': '--color-dark-bg-quaternary',
    '--color-static-bg-neutral-light': '--color-static-bg-quaternary-light',
    '--color-static-bg-neutral-dark': '--color-static-bg-quaternary-dark',
};

const plugin = (): Plugin => {
    const processed = Symbol('processed');

    return {
        postcssPlugin: 'ReplaceColorTokens',
        Declaration: (decl) => {
            if (decl[processed]) {
                return;
            }
            if (decl.value.includes('--color-')) {
                const fullVars = decl.value.match(/--color[\w-]+/g) || [];
                const values = fullVars.map(
                    (color) => color.match(/([\w-]+?)(?=-tint|-alpha|-shade|$)/g)[0],
                );

                values.forEach((value) => {
                    if (replacement[value]) {
                        decl.value = decl.value.replace(value, replacement[value]);
                    }
                });
            }
            decl[processed] = true;
        },
    };
};

export default function transformer(file) {
    return postcss([plugin()]).process(file.source).css;
}
