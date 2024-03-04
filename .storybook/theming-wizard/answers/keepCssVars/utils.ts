import { Answers } from '.storybook/theming-wizard/types';

export const darkModeExample = () => `
import darkMode from '@alfalab/core-components/themes/dark';

<>
    {mode === 'dark' && <style>{darkMode}</style>}
    {this.renderPage()}
</>
`;

export const cssImportsExample = (answers: Answers) => {
    const cssImports: string[] = [
        "@import '@alfalab/core-components/vars/index.css';",
        answers.product !== 'default'
            ? `@import '@alfalab/core-components/themes/${answers.product}.css';`
            : '',
    ].filter(Boolean);

    return `/* app.css */\n${cssImports.join('\n')}`;
};
