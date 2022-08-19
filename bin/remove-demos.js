/* eslint-disable no-console */
const shell = require('shelljs');

const execOptions = {
    silent: true,
    fatal: true,
};

const defaultConfig = {
    gitUsername: 'core-ds-bot',
    gitEmail: 'ds@gitmax.tech',
    commitMessage: 'Removed unused demos',
    gitRemote: 'origin',
    targetBranch: 'gh-pages',
    excluded_directories: ['node_modules'],
};

shell.exec(`git config user.name "${defaultConfig.gitUsername}"`, execOptions);
shell.exec(`git config user.email "${defaultConfig.gitEmail}"`, execOptions);

// Disable GPG signing
shell.exec('git config commit.gpgsign false', execOptions);

const remoteBranches = shell.exec('git branch -r', execOptions).stdout.trim();

/** List of remote branches */
const branchesList = remoteBranches.split('\n').map(branch =>
    branch
        .replace('origin/', '')
        .trim()
        .replace(/[^a-zA-Z0-9]/g, '_'),
);

// Fetch gh-pages branch
console.log('=> Fetch gh-pages branch');
shell.exec(`git fetch ${defaultConfig.gitRemote} ${defaultConfig.targetBranch}`, execOptions);

// Checkout to gh-pages
console.log('=> Checkout to gh-pages');
shell.exec(`git checkout ${defaultConfig.targetBranch}`, execOptions);

/** Current git branch */
const currentBranch = shell.exec('git rev-parse --abbrev-ref HEAD', execOptions).stdout.trim();
const currentBranch2 = shell.exec('git name-rev --name-only HEAD', execOptions).stdout.trim();

console.log('currentBranch', currentBranch);
console.log('currentBranch2', currentBranch2);
console.log('targetBranch', defaultConfig.targetBranch);

console.log('isEqual', currentBranch === defaultConfig.targetBranch);

if (currentBranch === defaultConfig.targetBranch) {
    const directories = shell
        .exec(`ls -d */`, execOptions)
        .stdout.trim()
        .replace(/\//g, '')
        .split('\n');

    const shouldRemove = directories.filter(
        directory =>
            !defaultConfig.excluded_directories.includes(directory) &&
            !branchesList.some(branchName => directory.indexOf(branchName) === 0),
    );

    console.log('=> should remove', shouldRemove);

    /** Trying to delete directories */
    console.log('=> Trying to delete directories');
    shouldRemove.forEach(directory => {
        shell.exec(`rm -rf ${directory}`, execOptions);
    });

    console.log(`=> Commit changes with message: ${defaultConfig.commitMessage}`);
    shell.exec('git add .', execOptions);
    shell.exec('git reset node_modules', execOptions);
    shell.exec(`git commit -m "${defaultConfig.commitMessage}"`, execOptions);

    console.log('=> Push changes');
    shell.exec(
        `git push -q "https://${defaultConfig.gitUsername}:${process.env.GITHUB_TOKEN}@github.com/core-ds/core-components.git"`,
        execOptions,
    );
} else {
    console.log(`Failed to switch to ${defaultConfig.targetBranch}`);
}
