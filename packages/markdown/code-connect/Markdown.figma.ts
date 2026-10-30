// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=494-8370
// source=packages/markdown/src/index.ts
// component=Markdown
import figma from 'figma';
const instance = figma.selectedInstance;
const tag = instance.getEnum('Tag', {
    '# [h1] desktop': '#',
    '## [h2] desktop': '##',
    '### [h3] desktop': '###',
    '#### [h4] desktop': '####',
    '# [h1] mobile': '#',
    '## [h2] mobile': '##',
    '### [h3] mobile': '###',
    '#### [h4] mobile': '####',
    'p [paragraph]': '',
    '> [quote]': '>',
    '! [img]': 'image',
    '- [listDashed]': '-',
    '1. [listNumbered]': '1.',
    '❌ • [listBulleted]': 'deprecated',
});
const platform = instance.getEnum('Tag', {
    '# [h1] desktop': 'desktop',
    '## [h2] desktop': 'desktop',
    '### [h3] desktop': 'desktop',
    '#### [h4] desktop': 'desktop',
    '# [h1] mobile': 'mobile',
    '## [h2] mobile': 'mobile',
    '### [h3] mobile': 'mobile',
    '#### [h4] mobile': 'mobile',
    'p [paragraph]': 'responsive',
    '> [quote]': 'responsive',
    '! [img]': 'responsive',
    '- [listDashed]': 'responsive',
    '1. [listNumbered]': 'responsive',
    '❌ • [listBulleted]': 'responsive',
});
if (tag === undefined || !platform || tag === 'deprecated')
    throw new Error('Устаревший или неизвестный Tag Markdown');
const component =
    platform === 'desktop'
        ? 'MarkdownDesktop'
        : platform === 'mobile'
          ? 'MarkdownMobile'
          : 'Markdown';
// Простое содержимое экранируется как Markdown-текст, чтобы property не меняло Tag.
const value = instance.getString('✎ Value');
const escaped = value.replace(/([\\`*_{}\[\]()#+.!>|-])/g, '\\$1');
const markdown = tag ? `${tag} ${escaped}` : escaped;
export default {
    id: 'core-markdown',
    imports: [
        `import { ${component} } from '@alfalab/core-components/markdown${platform === 'responsive' ? '' : '/' + platform}';`,
    ],
    example:
        tag === 'image'
            ? figma.code`function Example({ imageUrl }: { imageUrl: string }) { return <Markdown>{${JSON.stringify('![' + value.replace(/([\\\[\]])/g, '\\$1') + '](')} + imageUrl.replaceAll(' ', '%20').replaceAll('(', '%28').replaceAll(')', '%29') + ')'}</Markdown>; }`
            : figma.code`<${component}>{${JSON.stringify(markdown)}}</${component}>`,
    metadata: { nestable: false },
};
