/**
 * !!!
 * Если что-то сломается в этом скрипте CI об этом не узнает и завершиться успешно!
 * !!!
 */

/* eslint-disable no-console */
const shell = require('shelljs');
const parseGitUrl = require('git-url-parse');
const fs = require('fs');

/** Config for github */
const defaultConfig = {
    gitUsername: 'core-ds-bot',
    gitEmail: 'ds@gitmax.tech',
    commitMessage: 'Deploy Storybook to GitHub Pages',
    gitRemote: 'origin',
    targetBranch: 'gh-pages',
};
/** Dir for merged storybook file */
const ghMergeDir = 'storybook-demo';
/** Custom option for shell.exec */
const execOptions = {
    silent: true,
    fatal: true,
};

const lastCommitHash = shell.exec('git rev-parse HEAD', execOptions).stdout.trim();
/** Current git branch */
const sourceBranch =
    process.env.BRANCH_NAME ||
    process.env.GITHUB_HEAD_REF ||
    process.env.GITHUB_REF_NAME ||
    shell.exec('git rev-parse --abbrev-ref HEAD', execOptions).stdout.trim();

console.log('BRANCH_NAME', process.env.BRANCH_NAME);

console.log(`Source branch = ${sourceBranch}`);

/** Temporary dir for builded file = branch name + last git commit hash */
const tempOutputDir = isMajorArchiveBranch(sourceBranch)
    ? sourceBranch
    : sourceBranch.replace(/[^a-zA-Z0-9]/g, '_') + '_' + lastCommitHash;
/** Try to get affected component name from last commit message **/

console.log(`pr head sha = ${process.env.PR_LAST_COMMIT_SHA}`);

const lastCommitMessage = process.env.PR_LAST_COMMIT_SHA
    ? shell.exec(`git log --format=%B -n 1 ${process.env.PR_LAST_COMMIT_SHA}`).stdout.trim()
    : shell.exec('git show-branch --no-name HEAD', execOptions).stdout.trim();
console.log(`Last commit message = ${lastCommitMessage}`);

/** Parse affected package from last commit message */
const affectedPackage = parseScopeFromCommit(lastCommitMessage);
console.log(`Affected package = ${affectedPackage}`);

/** Git remote url */
const gitUrl = shell
    .exec(`git config --get remote.${defaultConfig.gitRemote}.url`, execOptions)
    .stdout.trim();
/** Parsed git url */
const parsedGitUrl = parseGitUrl(gitUrl);
const gitPagesUrl = `https://${parsedGitUrl.owner}.github.io/${parsedGitUrl.name}`;

console.log('Publish storybook demo for github');

console.log('=> Build packages');
shell.exec('BUILD_MODERN_ONLY=true yarn build', { fatal: true });

console.log('=> Copy components preview to public dir');
shell.exec(
    'find packages/ -type f | grep -i preview-snap.png$ | xargs -i cp {} .storybook/public/images',
    { fatal: true },
);

console.log('=> Build storybook', { fatal: true });
shell.exec(`BUILD_STORYBOOK_FROM_DIST=true yarn build-storybook -o ${tempOutputDir}`, {
    fatal: true,
});
shell.exec(`STORYBOOK_BUILD_DIR=${tempOutputDir} node bin/generate-docs-urls.js`);

// Prepare temporary gh-pages dir
console.log('=> Prepare temporary dir');
shell.rm('-rf', `./${ghMergeDir}`);
shell.mkdir(ghMergeDir);

// Go to the temporary directory and create a *new* Git repo
shell.cd(ghMergeDir);
shell.exec('git init', execOptions);
// Inside this git repo we'll pretend to be a new user
shell.exec(`git config user.name "${defaultConfig.gitUsername}"`, execOptions);
shell.exec(`git config user.email "${defaultConfig.gitEmail}"`, execOptions);

// Disable GPG signing
shell.exec('git config commit.gpgsign false', execOptions);

// Pull gh-page file
console.log('=> Pull storybook file');
shell.exec(`git pull -f -q ${gitUrl} ${defaultConfig.targetBranch}`, execOptions);

// Merge builded storybook
console.log('=> Merge builded storybook');

shell.cp('-rf', `../${tempOutputDir}`, `./`);

if (sourceBranch === 'master') {
    shell.rm('-rf', `./master`);
    shell.mv('-f', `./${tempOutputDir}`, `./master`);
    saveArchiveVersionsJson();
}

// The first and only commit to this new Git repo contains all the
// files present with the commit message "Deploy to GitHub Pages".
console.log(`=> Commit changes with message: ${defaultConfig.commitMessage}`);
shell.exec('git add .', execOptions);
shell.exec(`git commit -m "${defaultConfig.commitMessage}"`, execOptions);

const storybookUrl = buildStorybookUrl();

console.log(`=> Storybook deployed to: ${storybookUrl}`);

// store storybook url
shell.exec(`echo "storybook_url=${storybookUrl}" >> $GITHUB_OUTPUT`);

function buildStorybookUrl() {
    const branchFolder = sourceBranch === 'master' ? 'master' : tempOutputDir;

    let url = `${gitPagesUrl}/${branchFolder}`;

    if (affectedPackage) {
        const packageToComponentName = (string) => {
            return string
                .split('-')
                .map((substr) => substr.charAt(0).toUpperCase() + substr.slice(1))
                .join('');
        };

        url += `/?path=/docs/${packageToComponentName(affectedPackage).toLowerCase()}--docs`;
    }

    return encodeURI(url);
}

function parseScopeFromCommit(message) {
    const matches = /^[^\(]*\(([^\)]*)\):.*$/.exec(message);
    if (matches && ['themes', 'vars'].includes(matches[1]) === false) {
        return matches[1];
    }
}

function isMajorArchiveBranch(branchName) {
    return /^v\d+\.\d+\.\d+$/.test(branchName);
}

function saveArchiveVersionsJson() {
    const directories = shell
        .exec(`ls -d */`, execOptions)
        .stdout.trim()
        .replace(/\//g, '')
        .split('\n');

    const archiveList = directories.filter((directory) => isMajorArchiveBranch(directory)).sort();
    fs.writeFileSync('./master/archive-versions.json', JSON.stringify(archiveList));
}
