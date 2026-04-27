import { readFileSync } from 'node:fs';

export function generateDemo(docPath) {
    const content = readFileSync(docPath, 'utf-8');

    // формат демо {title: Заголовок, description: Описание демо, desktop: код для desktop, mobile: код для mobile }
    return [];
}
