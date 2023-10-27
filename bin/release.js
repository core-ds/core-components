const readChangesets = require('@changesets/read').default;
const semver = require('semver');
const path = require('path');
const fs = require('fs-extra');
const detectIndent = require('detect-indent');
const git = require('@changesets/git');
const logger = require('@changesets/logger');
const shell = require('shelljs');
const { getCommitsThatAddFiles } = require('@changesets/git');
const { getLinesFromSummary, getGithubLinks } =
    require('../tools/changesets/changelogFunctions').default;

const cwd = process.cwd();
const execOptions = { silent: false, fatal: true };

const isGenerateChangelogOnly = process.env.GENERATE_CHANGELOG_ONLY === 'true';

const config = {
    changelogPath: 'CHANGELOG.md',
    packageJsonPath: 'package.json',
    gitUsername: 'core-ds-bot',
    gitEmail: 'ds@gitmax.tech',
};

const REL_TYPE_TO_RU = {
    major: 'Мажорное',
    minor: 'Минорное',
    patch: 'Патчи',
};

const NEW_COMPONENT_PHRASE = 'новый компонент';

let nextReleaseType = 'none';
const currentPackageVersion = getRootPkg().version;

function escapeShellChars(str) {
    return str.replace(/["`$]/g, '\\$&');
}

function setupGit() {
    shell.exec(`git config user.name "${config.gitUsername}"`, execOptions);
    shell.exec(`git config user.email "${config.gitEmail}"`, execOptions);
    shell.exec('git config lfs.allowincompletepush true', execOptions);
    shell.exec('git config commit.gpgsign false', execOptions);
}

function startCreatingArchiveDemo() {
    logger.log('=> Start creating archive demo');

    shell.exec(
        `curl -X POST https://api.github.com/repos/core-ds/core-components/dispatches \\
          -H 'Accept: application/vnd.github.everest-preview+json' \\
          -u '${config.gitUsername}:${process.env.GITHUB_TOKEN}' \\
          --data '{"event_type": "create_archive_demo", "client_payload": {"tag": "v${currentPackageVersion}"}}'`,
    );
}

async function getChangesets() {
    const changesets = await readChangesets(cwd);
    const paths = (changesets || []).map((cs) => `.changeset/${cs.id}.md`);
    const commits = await getCommitsThatAddFiles(paths, cwd);
    const links = await getGithubLinks(commits);

    return changesets.map((cs, i) => ({ ...cs, commit: commits[i], links: links[i] }));
}

function getRootPkg() {
    const currentPkg = path.join(cwd, config.packageJsonPath);

    return require(currentPkg);
}

function getNextVersion(type) {
    const pkg = getRootPkg();

    return semver.inc(pkg.version, type);
}

async function updatePackageVersion(nextVersion) {
    const pkgRaw = await fs.readFile(config.packageJsonPath, 'utf-8');
    const pkg = getRootPkg();
    pkg.version = nextVersion;
    const indent = detectIndent(pkgRaw).indent || '  ';
    const stringified = JSON.stringify(pkg, null, indent) + (pkgRaw.endsWith('\n') ? '\n' : '');
    return fs.writeFile(config.packageJsonPath, stringified);
}

async function updateChangelog(notes) {
    const changelog = fs.readFileSync(config.changelogPath);
    const fd = fs.openSync(config.changelogPath, 'w+');
    const buffer = Buffer.from(notes);

    fs.writeSync(fd, buffer, 0, buffer.length, 0);
    fs.writeSync(fd, changelog, 0, changelog.length, buffer.length);
    await fs.close(fd);
}

function groupByReleaseType(cs) {
    const newComponentPhraseIdx = cs.summary
        .toLowerCase()
        .replace(/ {2,}/g, ' ')
        .indexOf(NEW_COMPONENT_PHRASE);

    return cs.releases.reduce(
        (result, rel) => {
            const packageName = rel.name.replace('@alfalab/core-components-', '');

            // Новые компоненты публикуем миноркой, а не мажоркой.
            if (rel.type === 'major' && ~newComponentPhraseIdx) {
                const simplify = (str = '') => str.replace(/[^a-zA-Z]/g, '').toLowerCase();

                const newPackage = cs.summary
                    .slice(newComponentPhraseIdx + NEW_COMPONENT_PHRASE.length)
                    .trim()
                    .split(' ')[0];

                if (simplify(packageName) === simplify(newPackage)) {
                    result.minor.push(packageName);

                    return result;
                }
            }

            result[rel.type].push(packageName);

            return result;
        },
        { major: [], minor: [], patch: [] },
    );
}

function groupByPullRequest(changesets) {
    return changesets.reduce((result, cs) => {
        const prLink = [cs.links?.pull || cs.links?.commit?.replace(/`/g, '') || '#'];

        if (!result[prLink]) {
            result[prLink] = { summaries: [], relTypes: [] };
        }

        result[prLink].summaries.push(cs.summary);

        result[prLink].relTypes.push(groupByReleaseType(cs));

        return result;
    }, {});
}

function hasReleaseType(groupedCs, type) {
    return Object.keys(groupedCs).some((key) =>
        groupedCs[key].relTypes.some((el) => el[type].length > 0),
    );
}

function getLinesAboutChangedPackages(relTypes) {
    let returnVal = '#### Влияние на компоненты';

    Object.keys(relTypes).forEach((relType) => {
        const packages = relTypes[relType];
        if (packages.length > 0) {
            returnVal += `\n- ${REL_TYPE_TO_RU[relType]}<br />${packages
                .map((p, idx) => ((idx + 1) % 5 === 0 ? `\`${p}\`<br />` : `\`${p}\``))
                .join(' ')}`;

            returnVal += '\n\n';
        }
    });

    return returnVal;
}

function generateChanges(groupedCs, nextVersion) {
    let markdown = `## ${nextVersion}\n`;
    markdown += `\n<sup><time>${new Date().toLocaleDateString('ru-RU')}</time></sup>\n`;

    Object.keys(groupedCs).forEach((prLink) => {
        groupedCs[prLink].summaries.forEach((summary, idx) => {
            if (idx > 0) {
                markdown += '<br />\n';
            }

            markdown += '\n';

            markdown += getLinesFromSummary(summary, prLink, idx === 0, true);
            markdown += getLinesAboutChangedPackages(groupedCs[prLink].relTypes[idx]);
        });
    });

    markdown += '\n\n';

    return markdown;
}

async function updateChangelogAndPackageJson(changesets) {
    const groupedCs = groupByPullRequest(changesets);

    nextReleaseType = (() => {
        if (hasReleaseType(groupedCs, 'major')) return 'major';
        if (hasReleaseType(groupedCs, 'minor')) return 'minor';
        if (hasReleaseType(groupedCs, 'patch')) return 'patch';

        return 'none';
    })();

    if (nextReleaseType !== 'none') {
        const nextVersion = getNextVersion(nextReleaseType);
        const notes = generateChanges(groupedCs, nextVersion);

        await updateChangelog(notes);

        if (isGenerateChangelogOnly) return null;

        await updatePackageVersion(nextVersion);

        return { nextVersion, notes };
    }

    return null;
}

async function releaseRoot() {
    logger.log('=> find changesets files');
    const changesets = await getChangesets();

    if (!changesets || changesets.length === 0) return false;

    logger.log('=> update Changelog.md and package.json');
    const updateResult = await updateChangelogAndPackageJson(changesets);
    const { nextVersion, notes } = updateResult || {};

    if (!nextVersion) return false;

    await git.add(config.packageJsonPath, cwd);
    await git.add(config.changelogPath, cwd);

    logger.log('=> Commit changed files');
    shell.exec('git commit -n -m "chore: publish root package [skip ci]"', execOptions);

    const nextReleaseTag = `v${nextVersion}`;
    logger.log(`=> Create tag ${nextReleaseTag}`);
    await git.tag(nextReleaseTag, cwd);

    logger.log('=> Push changes');
    const pushResult = shell.exec(
        `git push "https://${config.gitUsername}:${process.env.GITHUB_TOKEN}@github.com/core-ds/core-components.git"`,
        execOptions,
    );

    if (pushResult.code !== 0) {
        logger.error(pushResult.stderr);

        throw new Error('Failed to push changes');
    }

    shell.exec('git push --follow-tags', execOptions);

    logger.log('=> Create github release');
    shell.exec(
        `gh release create ${nextReleaseTag} --title "${nextReleaseTag}" --notes "${escapeShellChars(
            notes.replace('<br />', '\n'),
        )}" --target master`,
        execOptions,
    );

    logger.log('=> Publish root package');
    // копирую package.json в сборку корневого пакета
    shell.exec('cp package.json dist/package.json', execOptions);

    // делаю корневой пакет публичным
    shell.exec(
        'yarn json -f dist/package.json -I -e "delete this.private" -e "delete this.workspaces"',
        execOptions,
    );
    shell.cd('dist');
    const publishRet = shell.exec(`npm publish --userconfig "${path.join(cwd, '.npmrc')}"`, {
        ...execOptions,
        maxBuffer: 1024 * 1024 * 100,
    });
    shell.cd('..');

    if (publishRet.stdout.indexOf(`+ @alfalab/core-components@${nextVersion}`) !== -1) {
        return true;
    }

    throw new Error('Failed to publish root package, please revert the last commit');
}

async function releasePackages() {
    logger.log('=> bump packages version');
    shell.exec('yarn changeset version', { fatal: true });

    logger.log('=> copy package.json to dist');
    shell.exec('yarn lerna exec -- yarn copyfiles package.json dist', execOptions);

    logger.log('=> publish packages');
    shell.exec(`yarn changeset publish`, { fatal: true });

    logger.log('=> Commit changed files');
    shell.exec('git add .', execOptions);
    // Не добавляем .npmrc в коммит.
    shell.exec('git reset .npmrc', execOptions);
    shell.exec('git commit -n -m "chore: publish packages"', execOptions);

    logger.log('=> Push changes');
    shell.exec(
        `git push "https://${config.gitUsername}:${process.env.GITHUB_TOKEN}@github.com/core-ds/core-components.git"`,
        execOptions,
    );
    shell.exec('git push --follow-tags', execOptions);
}

(async () => {
    try {
        logger.log('Setup git');
        if (!isGenerateChangelogOnly) {
            setupGit();
        }

        logger.log('Release root package');
        const released = await releaseRoot();

        if (released) {
            logger.log('\n\nRelease packages');
            await releasePackages();

            if (nextReleaseType === 'major') {
                startCreatingArchiveDemo();
            }
        } else {
            logger.info('no new version is released');
        }
    } catch (e) {
        logger.error(e.message);

        throw e;
    }
})();
