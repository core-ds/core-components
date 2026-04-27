import { existsSync, readFileSync } from 'node:fs';

/**
 * Извлекает описание компонента из Component.docs.mdx.
 * Ищет атрибут children='...' внутри <ComponentHeader> и возвращает его значение.
 */
export function extractComponentDescription(docPath) {
    if (!existsSync(docPath)) {
        return '';
    }

    const content = readFileSync(docPath, 'utf-8');

    const match = /children=['"]([^'"]*)['"]/.exec(content);

    return match ? match[1] : '';
}
