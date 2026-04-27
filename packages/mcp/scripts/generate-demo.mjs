import { readFileSync } from 'node:fs';

function compactCode(code) {
    return code
        .split('\n')
        .map((line) => line.trimStart())
        .filter((line, i, arr) => !(line === '' && arr[i - 1] === ''))
        .join('\n')
        .trim();
}

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

        // извлекаем содержимое блока кода
        const codeStart = section.indexOf('\n', codeBlockStart) + 1;
        const codeEnd = section.indexOf('\n```', codeStart);
        const codeContent = section.slice(codeStart, codeEnd);

        // код до //MOBILE — desktop, если //MOBILE нет — весь код
        const mobileSplit = codeContent.search(/^\/\/MOBILE$/m);
        const desktop =
            mobileSplit === -1
                ? compactCode(codeContent)
                : compactCode(codeContent.slice(0, mobileSplit));

        // код после //MOBILE — mobile, если //MOBILE нет — undefined
        const mobile =
            mobileSplit === -1
                ? undefined
                : compactCode(codeContent.slice(mobileSplit + '//MOBILE'.length));

        demos.push({ title, description, desktop, ...(mobile !== undefined && { mobile }) });
    }

    return demos;
}
