const { getInfo } = require('@changesets/get-github-info');

const repo = 'core-ds/core-components';

function getLinesFromSummary(summary, links, idx = 0) {
    const hasLinks = !!links;
    const [firstLine, ...futureLines] = summary.split('\n').map(l => l.trimRight());

    let returnVal = `${idx !== 0 ? '\n' : ''}- ${hasLinks ? `${links.pull}: ` : ''}${firstLine}${
        hasLinks ? `. Thanks ${links.user}` : ''
    }`;

    if (futureLines.length > 0) {
        returnVal += `\n${futureLines.map(l => `  ${l}`).join('\n')}`;
    }

    return returnVal;
}

async function getReleaseLine(changeset) {
    const links = await getGithubLinks([changeset.commit]);

    return getLinesFromSummary(changeset.summary, links[0]);
}

async function getGithubLinks(commits) {
    return Promise.all(
        commits.map(async commit => {
            if (commit) {
                const info = await getInfo({ repo, commit });

                return info.links;
            }

            return null;
        }),
    );
}

async function getDependencyReleaseLine(changesets, dependenciesUpdated) {
    if (dependenciesUpdated.length === 0) return '';

    const changesetLinks = await Promise.all(
        changesets.map(async changeset => {
            const links = await getGithubLinks([changeset.commit]);
            const hasLinks = !!links && !!links[0];

            return `- Updated dependencies${hasLinks ? ` [${links[0].pull}]` : ''}`;
        }),
    );

    const updatedDependenciesList = dependenciesUpdated.map(
        dependency => `  - ${dependency.name}@${dependency.newVersion}`,
    );

    return [...changesetLinks, ...updatedDependenciesList].join('\n');
}

const defaultChangelogFunctions = {
    getReleaseLine,
    getDependencyReleaseLine,
    getLinesFromSummary,
    getGithubLinks,
};

module.exports.default = defaultChangelogFunctions;
