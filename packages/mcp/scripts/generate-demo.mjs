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
        const hasCodeBlock = section.includes('```jsx live');
        if (!hasCodeBlock) continue;

        demos.push({ title });
    }

    return demos;
}
