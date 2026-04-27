import { existsSync, readFileSync } from 'node:fs';

/**
 * Извлекает описание компонента из Component.docs.mdx.
 * Ищет тег <ComponentHeader name='...' children='...' /> и возвращает значение children.
 */
export function extractComponentDescription(docPath) {
    if (!existsSync(docPath)) {
        return '';
    }

    const content = readFileSync(docPath, 'utf-8');

    const componentHeaderMatch =
        /<ComponentHeader\s+[^>]*children=['"]([^'"]*)['"][^>]*\s*\/>/.exec(content);

    return componentHeaderMatch ? componentHeaderMatch[1] : '';
}
