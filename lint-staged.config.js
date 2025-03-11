const path = require('node:path');
const { getPackagesSync } = require('@manypkg/get-packages');

const eslintIgnoredPackages = ['@alfalab/core-components-themes', '@alfalab/core-components-vars'];

const packages = getPackagesSync(__dirname).packages.filter(
    ({ packageJson: { name } }) => !eslintIgnoredPackages.includes(name),
);

module.exports = {
    'packages/*/src/?(**/)*.{js,jsx,ts,tsx,cjs,mjs}': (filenames) =>
        packages.reduce((commands, { dir, packageJson: { name } }) => {
            const src = path.join(dir, 'src');
            const files = filenames
                .filter((filename) => filename.startsWith(src))
                .map((file) => `'${path.relative(dir, file)}'`);

            if (files.length > 0) {
                const filesStr = files.join(' ');
                const config = path.relative(dir, path.join(__dirname, '.eslintrc.cjs'));

                commands.push(
                    `
                    lerna exec --stream --scope ${name} -- "eslint ${filesStr} --config ${config}"
                    `.trim(),
                );
            }

            return commands;
        }, []),
    '*.{js,jsx,ts,tsx,cjs,mjs,json}': 'prettier --write',
    'bin/tsconfig/templates/tsconfig*.json': 'yarn tsconfig check',
    'packages/*/{package,tsconfig}.json': 'yarn tsconfig check',
    '*.css': ['prettier --write', 'stylelint'],
};
