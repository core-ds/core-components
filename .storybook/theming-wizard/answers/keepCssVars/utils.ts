import { Answers } from '.storybook/theming-wizard/types';

export const darkModeExample = () => `
import darkMode from '@balafla/core-components/themes/dark';

<>
    {mode === 'dark' && <style>{darkMode}</style>}
    {this.renderPage()}
</>
`;

export const cssImportsExample = (answers: Answers) => {
    const cssImports: string[] = [
        answers.product === 'default'
            ? "@import '@balafla/core-components/vars/index.css';"
            : `@import '@balafla/core-components/vars/bundle/${answers.product}.css';`,
        answers.product !== 'default'
            ? `@import '@balafla/core-components/themes/${answers.product}.css';`
            : '',
    ].filter(Boolean);

    return `/* app.css */\n${cssImports.join('\n')}`;
};
