import { existsSync, readFileSync } from 'node:fs';

/**
 * Определяет, содержит ли секция только обновление зависимостей без реальных изменений компонента.
 *
 * В CHANGELOG встречаются два варианта записи косвенных обновлений:
 *   1. Через заголовок:  #### Обновлены зависимости
 *   2. Через список:     - Обновлены зависимости
 *
 * Запись считается «только зависимости», если:
 *   - присутствует текст «Обновлены зависимости»
 *   - И нет ни одной ссылки на PR вида [#1234]
 *
 * Наличие PR-ссылки означает, что в версии было реальное изменение компонента
 * (даже если рядом есть секция обновлений зависимостей).
 */
function isOnlyDependencyUpdate(description) {
    const hasDepsNote = /Обновлены зависимости/.test(description);
    const hasPRReference = /\[#\d+\]/.test(description);

    return hasDepsNote && !hasPRReference;
}

/**
 * Парсит CHANGELOG.md компонента и возвращает записи только для текущего мажора.
 *
 * Алгоритм:
 *   1. Читаем файл и делим его на секции по заголовкам вида "## X.Y.Z".
 *   2. Из currentVersion извлекаем мажорную версию (например "3.2.1" → 3).
 *   3. Оставляем только секции, чей мажор совпадает с текущим.
 *   4. Отбрасываем секции, которые содержат лишь обновление зависимостей —
 *      они не несут информации об изменениях самого компонента.
 *   5. Возвращаем массив { version, description }.
 *
 * @param {string} changelogPath  Абсолютный путь до CHANGELOG.md компонента
 * @param {string} currentVersion Текущая версия из package.json (например "3.2.1")
 * @returns {{ version: string, description: string }[]}
 */
export function parseChangelog(changelogPath, currentVersion) {
    if (!existsSync(changelogPath)) {
        return [];
    }

    const content = readFileSync(changelogPath, 'utf-8');

    // Мажорная версия: "3.2.1" → 3
    const majorVersion = parseInt(currentVersion.split('.')[0], 10);

    /*
     * Разбиваем файл на секции по строкам вида "## X.Y.Z".
     * Lookahead (?=...) оставляет заголовок в начале каждой секции.
     */
    const sections = content.split(/\n(?=## \d+\.\d+\.\d+)/);

    const result = [];

    for (const section of sections) {
        // Извлекаем версию из заголовка секции
        const match = /^## (\d+\.\d+\.\d+)/.exec(section);

        if (!match) {
            continue;
        }

        const version = match[1];

        // Пропускаем версии из других мажорных серий (например 2.x.x или 1.x.x)
        if (parseInt(version.split('.')[0], 10) !== majorVersion) {
            continue;
        }

        // Тело секции — всё, что идёт после строки с версией
        const description = section.slice(match[0].length).trim();

        // Пропускаем записи, в которых нет ничего, кроме обновления зависимостей
        if (isOnlyDependencyUpdate(description)) {
            continue;
        }

        result.push({ version, description });
    }

    return result;
}
