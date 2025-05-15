const path = require('node:path');
const { getPackagesSync } = require('@manypkg/get-packages');

const eslintIgnoredPackages = ['@alfalab/core-components-themes', '@alfalab/core-components-vars'];

const eslintConfigPath = path.join(__dirname, '.eslintrc.cjs');

const packages = getPackagesSync(__dirname).packages.filter(
    ({ packageJson: { name } }) => !eslintIgnoredPackages.includes(name),
);

module.exports = {
    'packages/**/*.{js,jsx,ts,tsx,cjs,mjs}': (filenames) => {
        const sources = filenames.filter((filename) => !/\.(stories|test)\.(ts|js)x?$/.test(filename));

        return packages.reduce((commands, { dir, packageJson: { name } }) => {
            const src = path.join(dir, 'src');
            const files = sources.filter((filename) => filename.startsWith(src));

            if (files.length > 0) {
                commands.push(
                    `lerna exec --stream --scope ${name} -- eslint ${files
                        .map((file) => path.relative(dir, file))
                        .join(' ')} --config ${eslintConfigPath}`,
                );
            }

            return commands;
        }, []);
    },
    '{bin,packages,tools}/**/*.{js,jsx,ts,tsx,cjs,mjs}': ['prettier --write'],
    '*.css': ['prettier --write', 'stylelint'],
};
