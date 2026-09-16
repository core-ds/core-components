const { getInfo } = require('@changesets/get-github-info');

const getLinesFromSummary = (summary, prLink, showPrLink = true) => {
    let returnVal = `<sup><time>${new Date().toLocaleDateString('ru-RU')}</time></sup>\n\n`;

    if (showPrLink) {
        returnVal += `#### ${prLink}\n\n`;
    }

    const [firstLine, ...futureLines] = summary.split('\n').map((l) => l.trimEnd());

    const hasFutureLines = futureLines.length > 0;

    returnVal += `${
        hasFutureLines || firstLine.trim().startsWith('-') ? firstLine : `- ${firstLine}`
    }`;

    if (hasFutureLines) {
        returnVal += `\n${futureLines.join('\n')}`;
    }

    returnVal += '\n\n';

    return returnVal;
};

/**
 * @type {import('@changesets/types').ChangelogFunctions['getReleaseLine']}
 */
const getReleaseLine = async (changeset, _, { repo }) => {
    const links = await getGithubLinks([changeset.commit], repo);

    return getLinesFromSummary(
        changeset.summary,
        links[0]?.pull || links[0]?.commit?.replace(/`/g, '') || '#',
    );
};

async function getGithubLinks(commits, repo) {
    return Promise.all(
        commits.map(async (commit) => {
            if (commit) {
                const info = await getInfo({ repo, commit });

                return info.links;
            }

            return null;
        }),
    );
}

/**
 * @type {import('@changesets/types').ChangelogFunctions['getDependencyReleaseLine']}
 */
const getDependencyReleaseLine = (_, dependenciesUpdated) => {
    if (dependenciesUpdated.length === 0) return '';

    const firstLine = '#### Обновлены зависимости';

    const updatedDependenciesList = dependenciesUpdated.map(
        (dependency) => `  - ${dependency.name}@${dependency.newVersion}`,
    );

    return [firstLine, ...updatedDependenciesList].join('\n');
};

/**
 * @type {import('@changesets/types').ChangelogFunctions}
 */
const defaultChangelogFunctions = {
    getReleaseLine,
    getDependencyReleaseLine,
};

module.exports.default = defaultChangelogFunctions;
