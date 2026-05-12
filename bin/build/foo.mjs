import fse from 'fs-extra';

const pkg = await fse.readJson('./package.json', { encoding: 'utf8' });

console.log('pkg', pkg.name);

pkg.scripts ??= {};

pkg.scripts['ts-build'] = 'rollup -c ../../tools/rollup/rollup.config.mjs --silent';

await fse.writeJson('./package.json', pkg, { encoding: 'utf8', spaces: 4 });
