import { Answers } from ".storybook/theming-wizard/types";

export const withoutAruiScriptsExample = (answers: Answers) => {
    const settings: Record<string, any> = {
        preserve: false,
    };

    if (answers.product !== 'default') {
        settings.importFrom = `./node_modules/@balafla/core-components/themes/${answers.product}.css`;
    }

    return `postcssCustomProperties(${JSON.stringify(settings, null, 4)})`;
};

export const aruiScriptsExample = (answers: Answers) => {
    return JSON.stringify(
        {
            keepCssVars: false,
            componentsTheme: `./node_modules/@balafla/core-components/themes/${answers.product}.css`,
        },
        null,
        4,
    );
};
