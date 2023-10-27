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
    maxArchiveVersions: 10,
};

shell.exec(`git config user.name "${defaultConfig.gitUsername}"`, execOptions);
shell.exec(`git config user.email "${defaultConfig.gitEmail}"`, execOptions);

// Disable GPG signing
shell.exec('git config commit.gpgsign false', execOptions);

const remoteBranches = shell.exec('git branch -r', execOptions).stdout.trim();

/** List of remote branches */
const branchesList = remoteBranches.split('\n').map((branch) =>
    branch
        .replace('origin/', '')
        .trim()
        .replace(/[^a-zA-Z0-9]/g, '_'),
);

// Checkout to gh-pages
console.log('=> Switch to gh-pages branch');
shell.exec(`git checkout ${defaultConfig.targetBranch}`, execOptions);

// Pull gh-page file
console.log('=> Pull gh-pages branch');
shell.exec(`git pull -f ${defaultConfig.gitRemote} ${defaultConfig.targetBranch}`, execOptions);

/** Current git branch */
const currentBranch = shell.exec('git rev-parse --abbrev-ref HEAD', execOptions).stdout.trim();

if (currentBranch === defaultConfig.targetBranch) {
    const directories = shell
        .exec(`ls -d */`, execOptions)
        .stdout.trim()
        .replace(/\//g, '')
        .split('\n');

    const shouldRemove = directories.filter(
        (directory) =>
            !defaultConfig.excluded_directories.includes(directory) &&
            !branchesList.some((branchName) => directory.indexOf(branchName) === 0) &&
            !isMajorArchiveBranch(directory),
    );

    const archiveVersions = directories.filter((d) => isMajorArchiveBranch(d)).sort();
    const archiveForRemove = archiveVersions.slice(
        0,
        Math.max(archiveVersions.length - defaultConfig.maxArchiveVersions, 0),
    );

    shouldRemove.push(...archiveForRemove);

    console.log('=> should remove', shouldRemove);

    /** Trying to delete directories */
    console.log('=> Trying to delete directories');
    shouldRemove.forEach((directory) => {
        shell.exec(`rm -rf ${directory}`, execOptions);
    });

    console.log(`=> Commit changes with message: ${defaultConfig.commitMessage}`);
    shell.exec('git add .', execOptions);
    shell.exec('git reset node_modules', execOptions);
    shell.exec(`git commit -m "${defaultConfig.commitMessage} [skip ci]"`, execOptions);

    console.log('=> Push changes');
    shell.exec(
        `git push -q "https://${defaultConfig.gitUsername}:${process.env.GITHUB_TOKEN}@github.com/core-ds/core-components.git"`,
        execOptions,
    );
} else {
    console.log(`Failed to switch to ${defaultConfig.targetBranch}`);
}

function isMajorArchiveBranch(branchName) {
    return /^v\d+\.\d+\.\d+$/.test(branchName);
}
