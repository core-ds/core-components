import globby from 'globby';
import fs from 'node:fs/promises';
import path from 'node:path';

async function main() {
    // see tools/rollup/compiled-darkmode-generator.mjs
    const themes = await globby('dist/compiled/*.css');

    if (themes.length === 0) {
        return;
    }

    await fs.mkdir('src/compiled', { recursive: true });

    for (const theme of themes) {
        const content = await fs.readFile(theme, { encoding: 'utf-8' });
        const { name: themeName } = path.parse(theme);

        await fs.writeFile(
            `src/compiled/${themeName}.ts`,
            `// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.\n\nexport default \`${content}\`;\n`,
            { encoding: 'utf-8' },
        );
    }
}

await main();
