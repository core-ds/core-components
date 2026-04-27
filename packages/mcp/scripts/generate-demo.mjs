import { readFileSync } from 'node:fs';

export function generateDemo(docPath) {
    const content = readFileSync(docPath, 'utf-8');

    // формат демо {title: Заголовок, description: Описание демо, desktop: код для desktop, mobile: код для mobile }
    const demos = [];

    // разбиваем по заголовкам второго уровня
    const sections = content.split(/^## /m).slice(1);

    for (const section of sections) {
        // первая строка — заголовок
        const titleEnd = section.indexOf('\n');
        const title = section.slice(0, titleEnd).trim();

        // проверяем, есть ли в секции jsx live блок
        const codeBlockStart = section.indexOf('```jsx live');
        if (codeBlockStart === -1) continue;

        // текст между заголовком и блоком кода
        const description = section.slice(titleEnd, codeBlockStart).trim();

        demos.push({ title, description });
    }

    return demos;
}
