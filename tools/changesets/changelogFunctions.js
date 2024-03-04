const { getInfo } = require('@changesets/get-github-info');

const repo = 'core-ds/core-components';

const getLinesFromSummary = (summary, prLink, showPrLink = true, isRootChangelog = false) => {
    let returnVal = '';

    if (!isRootChangelog) {
        returnVal += `<sup><time>${new Date().toLocaleDateString('ru-RU')}</time></sup>\n\n`;
    }

    if (showPrLink) {
        returnVal += `### ${prLink}\n\n`;
    }

    if (isRootChangelog) {
        returnVal += '#### Что изменилось\n';
    }

    const [firstLine, ...futureLines] = summary.split('\n').map((l) => l.trimRight());

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

const getReleaseLine = async (changeset) => {
    const links = await getGithubLinks([changeset.commit]);

    return getLinesFromSummary(
        changeset.summary,
        links[0]?.pull || links[0]?.commit?.replace(/`/g, '') || '#',
    );
};

async function getGithubLinks(commits) {
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

const getDependencyReleaseLine = (changesets, dependenciesUpdated) => {
    if (dependenciesUpdated.length === 0) return '';

    const firstLine = '- Обновлены зависимости';

    const updatedDependenciesList = dependenciesUpdated.map(
        (dependency) =>
            `  - ${dependency.name.replace('@alfalab/core-components-', '')}@${
                dependency.newVersion
            }`,
    );

    return [firstLine, ...updatedDependenciesList].join('\n');
};

const defaultChangelogFunctions = {
    getReleaseLine,
    getDependencyReleaseLine,
    getLinesFromSummary,
    getGithubLinks,
};

module.exports.default = defaultChangelogFunctions;
