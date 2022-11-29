/**
 * !!!
 * Если что-то сломается в этом скрипте CI об этом не узнает и завершиться успешно!
 * !!!
 */

/* eslint-disable no-console */
const shell = require('shelljs');
const parseGitUrl = require('git-url-parse');
const findComponentPath = require('../tools/storybook/findComponentPath');

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
const sourceBranch = shell.exec('git rev-parse --abbrev-ref HEAD', execOptions).stdout.trim();
/** Temporary dir for builded file = branch name + last git commit hash */
const tempOutputDir = sourceBranch.replace(/[^a-zA-Z0-9]/g, '_') + '_' + lastCommitHash;
/** Try to get affected component name from last commit message **/
const lastCommitMessage = shell.exec('git show-branch --no-name HEAD', execOptions).stdout.trim();
/** Parse affected package from last commit message */
const affectedPackage = parseScopeFromCommit(lastCommitMessage);

/** Git remote url */
const gitUrl = shell
    .exec(`git config --get remote.${defaultConfig.gitRemote}.url`, execOptions)
    .stdout.trim();
/** Parsed git url */
const parsedGitUrl = parseGitUrl(gitUrl);
const gitPagesUrl = `https://${parsedGitUrl.owner}.github.io/${parsedGitUrl.name}`;

console.log('Publish storybook demo for github');

console.log('=> Build packages');
shell.exec('BUILD_ESM_ONLY=true yarn build', { fatal: true });

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
}

// The first and only commit to this new Git repo contains all the
// files present with the commit message "Deploy to GitHub Pages".
console.log(`=> Commit changes with message: ${defaultConfig.commitMessage}`);
shell.exec('git add .', execOptions);
shell.exec(`git commit -m "${defaultConfig.commitMessage}"`, execOptions);

const storybookUrl = buildStorybookUrl();

console.log(`=> Storybook deployed to: ${storybookUrl}`);

// store storybook url
shell.exec(`echo ::set-output name=storybook_url::${storybookUrl}`);

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

        const getComponentFolder = () => {
            if (affectedPackage.startsWith('typography')) return 'typography';
            return affectedPackage.replace(/-/g, '');
        };

        const groupPath = findComponentPath(
            packageToComponentName(affectedPackage),
            affectedPackage,
        );

        if (groupPath) {
            url += `/?path=/docs/${groupPath}-${getComponentFolder()}--${affectedPackage}`;
        }
    }

    return encodeURI(url);
}

function parseScopeFromCommit(message) {
    const matches = /^[^\(]*\(([^\)]*)\):.*$/.exec(message);
    if (matches && ['themes', 'vars'].includes(matches[1]) === false) {
        return matches[1];
    }
}
