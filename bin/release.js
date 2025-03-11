const logger = require('@changesets/logger');
const shell = require('shelljs');

const execOptions = { silent: false, fatal: true };

const isGenerateChangelogOnly = process.env.GENERATE_CHANGELOG_ONLY === 'true';

const gitConfig = {
    userName: 'core-ds-bot',
    email: 'ds@gitmax.tech',
};

function setupGit() {
    logger.log('Setup git');
    shell.exec(`git config user.name "${gitConfig.userName}"`, execOptions);
    shell.exec(`git config user.email "${gitConfig.email}"`, execOptions);
    shell.exec('git config lfs.allowincompletepush true', execOptions);
    shell.exec('git config commit.gpgsign false', execOptions);
}

function releasePackages() {
    logger.log('Release packages');
    logger.log('=> bump packages version');
    shell.exec('yarn changeset version', { fatal: true });

    logger.log('=> write vars and themes version to package.json');
    shell.exec('yarn write-vars-and-themes-version', { fatal: true });

    logger.log('=> publish packages');
    shell.exec(`yarn changeset publish`, { fatal: true });

    logger.log('=> Commit changed files');
    shell.exec('git add .', execOptions);
    // Не добавляем .npmrc в коммит.
    shell.exec('git reset .npmrc', execOptions);
    shell.exec('git commit -n -m "chore: publish packages"', execOptions);

    logger.log('=> Push changes');
    shell.exec(
        `git push "https://${gitConfig.userName}:${process.env.GITHUB_TOKEN}@github.com/core-ds/core-components.git"`,
        execOptions,
    );
    shell.exec('git push --follow-tags', execOptions);
}

function main() {
    try {
        if (!isGenerateChangelogOnly) {
            setupGit();
        }

        releasePackages();
    } catch (e) {
        logger.error(e.message);

        throw e;
    }
}

main();
