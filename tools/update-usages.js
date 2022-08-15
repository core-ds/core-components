const axios = require('axios');
const fs = require('fs/promises');
const path = require('path');
const globby = require('globby');

const apiUrl = 'http://digital/design-system-usage/api/stats/component-usages';

async function fetchUsages(component) {
    const fetch = async url => {
        const r = await axios.get(url);
        return r.data.byDateStats.slice(-1)[0]?.core;
    };

    try {
        const [projects, imports] = await Promise.all([
            fetch(`${apiUrl}?component=${component}&calcImports=false`),
            fetch(`${apiUrl}?component=${component}&calcImports=true`),
        ]);

        return {
            projects,
            imports,
        };
    } catch (e) {
        if (e.code === 'ENOTFOUND') {
            console.error('You should connect to the vpn first');
            process.exit(1);
        }

        throw e;
    }
}

async function fetchUsagesForStory(storyPath) {
    const story = await fs.readFile(storyPath, 'utf-8');

    const m = /ComponentHeader\s+name=['"](.*)['"]/gm.exec(story);
    const name = m?.[1];

    if (!name) throw new Error('Invalid story');

    const components = story.includes(`${name}Desktop`)
        ? [`${name}Desktop`, `${name}Mobile`, `${name}Responsive`]
        : [name];

    let usages = {
        projects: 0,
        imports: 0,
    };

    await Promise.all(
        components.map(async component => {
            componentUsages = await fetchUsages(component);

            usages.projects += componentUsages.projects;
            usages.imports += componentUsages.imports;
        }),
    );

    return {
        name,
        usages,
    };
}

async function updateUsages() {
    const files = await globby(
        [path.join(process.cwd(), 'packages') + `/**/src/docs/*.stories.mdx`],
        {},
    );

    const usages = {};

    await Promise.all(
        files.map(async storyPath => {
            try {
                const componentUsages = await fetchUsagesForStory(storyPath);
                usages[componentUsages.name] = componentUsages.usages;

                console.log('[+]', componentUsages);
            } catch (e) {
                console.log(`[!] ${storyPath}: ${e.message}`);
            }
        }),
    );

    await fs.writeFile(
        path.join(process.cwd(), '.storybook/usages.json'),
        JSON.stringify({
            updatedAt: +new Date(),
            ...usages,
        }),
    );
}

updateUsages();
