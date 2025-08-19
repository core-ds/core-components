/* eslint-disable no-param-reassign */
import postcss, { Plugin } from 'postcss';

// Vars for replacement {old-var: new-var}
const replacement = {
    '--color-dynamic-nulled': '--color-light-transparent-default',
    '--color-dynamic-primary-dark': '--color-dark-monochrome-white-8',
    '--color-dynamic-primary-light': '--color-light-monochrome-white-8',
    '--color-dynamic-quaternary-dark': '--color-dark-monochrome-white-32',
    '--color-dynamic-quaternary-light': '--color-light-monochrome-white-32',
    '--color-dynamic-quinary-dark': '--color-dark-monochrome-white-16',
    '--color-dynamic-quinary-light': '--color-light-monochrome-white-16',
    '--color-dynamic-secondary-dark': '--color-dark-monochrome-white-64',
    '--color-dynamic-secondary-light': '--color-light-monochrome-white-64',
    '--color-dynamic-senary-dark': '--color-dark-monochrome-white-12',
    '--color-dynamic-senary-light': '--color-light-monochrome-white-12',
    '--color-dynamic-tertiary-dark': '--color-dark-monochrome-white-48',
    '--color-dynamic-tertiary-light': '--color-light-monochrome-white-48',
    '--color-static-nulled': '--color-light-transparent-default',
    '--color-static-primary-dark': '--color-static-monochrome-black-8',
    '--color-static-primary-light': '--color-static-monochrome-white-8',
    '--color-static-quaternary-dark': '--color-static-monochrome-black-32',
    '--color-static-quaternary-light': '--color-static-monochrome-white-32',
    '--color-static-quinary-dark': '--color-static-monochrome-black-16',
    '--color-static-quinary-light': '--color-static-monochrome-white-16',
    '--color-static-secondary-dark': '--color-static-monochrome-black-64',
    '--color-static-secondary-light': '--color-static-monochrome-white-64',
    '--color-static-senary-dark': '--color-static-monochrome-black-12',
    '--color-static-senary-light': '--color-static-monochrome-white-12',
    '--color-static-tertiary-dark': '--color-static-monochrome-black-48',
    '--color-static-tertiary-light': '--color-static-monochrome-white-48',
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
