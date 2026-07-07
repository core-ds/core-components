import { existsSync, readFileSync } from 'node:fs';

/**
 * Извлекает из секции версии все блоки изменений, относящихся к указанному компоненту.
 *
 * Структура секции:
 *   ### Minor/Patch Changes
 *     #### [#PR](url)          ← ссылка на PR
 *       ##### ComponentName    ← имя компонента (может быть списком: "Slider, SliderInput")
 *         - описание изменений
 *
 * @param {string} versionSection  Текст одной секции версии (## 50.X.X ...)
 * @param {string} componentName   Имя компонента (например "Button")
 * @returns {string[]}             Массив текстовых блоков с изменениями
 */
function extractComponentBlocks(versionSection, componentName) {
    const lines = versionSection.split('\n');

    let prRef = null;
    let collecting = false;
    let buffer = [];
    const blocks = [];

    const flush = () => {
        const content = buffer.join('\n').trim();

        if (collecting && content) {
            blocks.push(prRef ? `#### ${prRef}\n\n${content}` : content);
        }

        buffer = [];
        collecting = false;
    };

    for (const line of lines) {
        if (line.startsWith('#### ')) {
            flush();
            prRef = /^#### \[#\d+\]/.test(line) ? line.slice('#### '.length) : null;
            continue;
        }

        if (line.startsWith('##### ')) {
            flush();
            const heading = line.slice('##### '.length).trim();

            collecting = heading.split(/\s*,\s*/).some((n) => n.trim() === componentName);

            continue;
        }

        if (/^#{2,3} /.test(line)) {
            flush();
            prRef = null;
            continue;
        }

        if (collecting && !/^<sup>/.test(line)) {
            buffer.push(line);
        }
    }

    flush();

    return blocks;
}

/**
 * Парсит корневой CHANGELOG.md монорепозитория и возвращает записи изменений
 * для указанного компонента в рамках текущей мажорной версии.
 *
 * Алгоритм:
 *   1. Читаем файл и определяем текущую мажорную версию по первому вхождению ## X.Y.Z.
 *   2. Делим файл на секции по заголовкам вида "## X.Y.Z".
 *   3. Оставляем только секции текущего и предыдущего мажоров (например 50 и 49).
 *   4. В каждой секции ищем все блоки `##### ComponentName` и собираем их содержимое.
 *   5. Возвращаем массив { version, description }.
 *
 * @param {string} changelogPath   Путь до корневого CHANGELOG.md
 * @param {string} componentName   Отображаемое имя компонента (например "Button")
 * @returns {{ version: string, description: string }[]}
 */
export function parseChangelog(changelogPath, componentName) {
    if (!existsSync(changelogPath)) {
        return [];
    }

    const content = readFileSync(changelogPath, 'utf-8');

    const firstMatch = /^## (\d+)\.\d+\.\d+/m.exec(content);

    if (!firstMatch) {
        return [];
    }

    const currentMajor = parseInt(firstMatch[1], 10);
    const prevMajor = currentMajor - 1;

    const sections = content.split(/\n(?=## \d+\.\d+\.\d+)/);
    const result = [];

    for (const section of sections) {
        const versionMatch = /^## (\d+\.\d+\.\d+)/.exec(section);

        if (!versionMatch) {
            continue;
        }

        const version = versionMatch[1];
        const major = parseInt(version.split('.')[0], 10);

        if (major !== currentMajor && major !== prevMajor) {
            continue;
        }

        const blocks = extractComponentBlocks(section, componentName);

        if (blocks.length === 0) {
            continue;
        }

        result.push({ version, description: blocks.join('\n\n') });
    }

    return result;
}
