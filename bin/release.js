const readChangesets = require('@changesets/read').default;
const semver = require('semver');
const path = require('path');
const fs = require('fs-extra');
const detectIndent = require('detect-indent');
const git = require('@changesets/git');
const logger = require('@changesets/logger');
const shell = require('shelljs');
const { getCommitsThatAddFiles } = require('@changesets/git');
const {
    getLinesFromSummary,
    getGithubLinks,
} = require('../tools/changesets/changelogFunctions').default;

const cwd = process.cwd();
const execOptions = { silent: false, fatal: true };

const config = {
    changelogPath: 'CHANGELOG.md',
    packageJsonPath: 'package.json',
    gitUsername: 'core-ds-bot',
    gitEmail: 'ds@gitmax.tech',
};

function escapeShellChars(str) {
    return str.replace(/["`$]/g, '\\$&');
}

function setupGit() {
    shell.exec(`git config user.name "${config.gitUsername}"`, execOptions);
    shell.exec(`git config user.email "${config.gitEmail}"`, execOptions);
    shell.exec('git config lfs.allowincompletepush true', execOptions);
    shell.exec('git config commit.gpgsign false', execOptions);
}

async function getChangesets() {
    const changesets = await readChangesets(cwd);
    const paths = (changesets || []).map(cs => `.changeset/${cs.id}.md`);
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

function groupByReleaseType(changesets) {
    return changesets.reduce(
        (result, cs) => {
            cs.releases.forEach(rel => {
                if (!result[rel.type][rel.name]) {
                    result[rel.type][rel.name] = { summaries: [], links: [] };
                }

                result[rel.type][rel.name].summaries.push(cs.summary);
                result[rel.type][rel.name].links.push(cs.links || null);
            });

            return result;
        },
        { major: {}, minor: {}, patch: {} },
    );
}

function generateChangesForVersionTypeMarkdown(obj, type) {
    if (Object.keys(obj).length) {
        let markdown = `### ${type} Changes\n\n`;

        Object.keys(obj).forEach((packageName, idx) => {
            markdown += `${idx !== 0 ? '\n\n\n' : ''}#### \`${packageName}\`\n`;

            obj[packageName].summaries.forEach((summary, idx) => {
                const links = obj[packageName].links[idx];
                const lines = getLinesFromSummary(summary, links, idx);

                markdown += lines;
            });
        });

        markdown += '\n\n';

        return markdown;
    }

    return null;
}

async function updateChangelogAndPackageJson(changesets) {
    const { major, minor, patch } = groupByReleaseType(changesets);

    const nextReleaseType = (() => {
        if (Object.keys(major).length > 0) return 'major';
        if (Object.keys(minor).length > 0) return 'minor';
        if (Object.keys(patch).length > 0) return 'patch';

        return 'none';
    })();

    if (nextReleaseType !== 'none') {
        const nextVersion = getNextVersion(nextReleaseType);

        const notes = [
            `## ${nextVersion}\n`,
            generateChangesForVersionTypeMarkdown(major, 'Major'),
            generateChangesForVersionTypeMarkdown(minor, 'Minor'),
            generateChangesForVersionTypeMarkdown(patch, 'Patch'),
        ]
            .filter(line => line)
            .join('\n');

        await updatePackageVersion(nextVersion);

        await updateChangelog(notes);

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
    shell.exec('git commit -n -m "chore: publish root package"', execOptions);

    // копирую package.json в сборку корневого пакета
    shell.exec('cp package.json dist/package.json', execOptions);

    // делаю корневой пакет публичным
    shell.exec(
        'yarn json -f dist/package.json -I -e "delete this.private" -e "delete this.workspaces"',
        execOptions,
    );

    logger.log('=> Publish root package');
    shell.cd('dist');
    const publishRet = shell.exec(`npm publish --userconfig "${path.join(cwd, '.npmrc')}"`, {
        ...execOptions,
        maxBuffer: 1024 * 1024 * 100,
    });
    shell.cd('..');

    if (publishRet.stdout.indexOf(`+ @alfalab/core-components@${nextVersion}`) !== -1) {
        const nextReleaseTag = `v${nextVersion}`;
        logger.log(`=> Create tag ${nextReleaseTag}`);
        await git.tag(nextReleaseTag, cwd);

        logger.log('=> Push changes');
        shell.exec(
            `git push "https://${config.gitUsername}:${process.env.GITHUB_TOKEN}@github.com/core-ds/core-components.git"`,
            execOptions,
        );
        shell.exec('git push --follow-tags', execOptions);

        logger.log('=> Create github release');
        shell.exec(
            `gh release create ${nextReleaseTag} --title "${nextReleaseTag}" --notes "${escapeShellChars(
                notes,
            )}" --target master`,
            execOptions,
        );

        return true;
    } else {
        logger.error(publishRet.stderr);
    }

    return false;
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
        setupGit();

        logger.log('Release root package');
        const released = await releaseRoot();

        if (released) {
            logger.log('\n\nRelease packages');
            await releasePackages();
        } else {
            logger.info('no new version is released');
        }
    } catch (e) {
        logger.error(e.message);

        throw e;
    }
})();
