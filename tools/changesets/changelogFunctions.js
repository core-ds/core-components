const { getInfo } = require('@changesets/get-github-info');

const repo = 'core-ds/core-components';

const getLinesFromSummary = (summary, prLink, showPrLink = true, isRootChangelog = false) => {
    let returnVal = showPrLink ? `### ${prLink}\n\n` : '';
    if (isRootChangelog) {
        returnVal += '#### Что изменилось\n';
    }

    const [firstLine, ...futureLines] = summary.split('\n').map((l) => l.trimRight());

    returnVal += `${firstLine.trim().startsWith('-') ? firstLine : `- ${firstLine}`}`;

    if (futureLines.length > 0) {
        returnVal += `\n${futureLines.map((l) => `${l}<br />`).join('\n')}`;
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
