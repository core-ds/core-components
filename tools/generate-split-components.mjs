import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import slash from 'slash';
import { glob } from 'tinyglobby';

// Запуск => node tools/generate-split-components.mjs

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = path.dirname(currentFilename);

const ROOT_DIR = path.resolve(currentDirname, '..');
const OUTPUT_FILE = path.resolve(ROOT_DIR, 'generate-split-components.json');

const SPLIT_TAG = '@splitComponent';

/**
 * Извлекает все именованные экспорты из файла (кроме типов)
 * @param {string} content - Содержимое файла
 * @returns {string[]} Массив имен экспортируемых сущностей
 */
const extractAllNamedExports = (content) => {
    const names = new Set();

    for (const m of content.matchAll(/export\s+const\s+(\w+)/g)) {
        names.add(m[1]);
    }

    for (const m of content.matchAll(/export\s+function\s+(\w+)/g)) {
        names.add(m[1]);
    }

    for (const m of content.matchAll(/export\s+(?!type\b)\{([^}]+)\}/g)) {
        const parts = m[1].split(',');

        for (const part of parts) {
            const name = part
                .trim()
                .split(/\s+as\s+/)
                .pop()
                .trim();

            if (name) names.add(name);
        }
    }

    return Array.from(names);
};

/**
 * Единая функция обработки файла
 * @param {string} filePath - Путь к файлу
 * @returns {Array<{name: string, platform: string}>}
 */
const processFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');

    // Обрабатываем только файлы с тегом @splitComponent
    if (!content.includes(SPLIT_TAG)) return [];

    // Ищем платформу сразу после тега
    const tagLineMatch = new RegExp(new RegExp(String.raw`${SPLIT_TAG}\s+([^\s\n*]+)`)).exec(
        content,
    );

    if (!tagLineMatch) {
        console.warn(
            `[SplitComponents] Пропущен файл ${filePath}: ` +
                `указан тег ${SPLIT_TAG}, но не указана платформа.`,
        );

        return [];
    }

    const tagContent = tagLineMatch[1].toLowerCase();
    let platform = null;

    // Проверяем, содержит ли строка ключевое слово платформы
    if (tagContent.includes('desktop')) {
        platform = 'desktop';
    } else if (tagContent.includes('mobile')) {
        platform = 'mobile';
    }

    if (!platform) {
        console.warn(
            `[SplitComponents] Пропущен файл ${filePath}: ` +
                `не удалось определить платформу из "${tagLineMatch[1]}". ` +
                "Укажите строку, содержащую 'desktop' или 'mobile'.",
        );

        return [];
    }

    // Извлекаем экспорты и привязываем их к валидной платформе
    const allExports = extractAllNamedExports(content);

    return allExports.map((name) => ({ name, platform }));
};

/**
 * Формирует относительный путь к исходнику
 * @param {string} pkgDir - Директория пакета
 * @param {string} filePath - Полный путь к файлу
 * @returns {string} Относительный путь
 */
const formatImportPath = (pkgDir, filePath) => {
    const relativePath = path.relative(pkgDir, filePath);

    return `./${slash(relativePath)}`;
};

/**
 * Основная функция генерации JSON
 * @returns {Promise<Array>} Сгенерированный массив данных
 */
const generateSplitComponentsJson = async () => {
    const pkgJsonPaths = await glob('packages/*/package.json', {
        cwd: ROOT_DIR,
        absolute: true,
    });

    pkgJsonPaths.sort((a, b) => a.localeCompare(b));

    const result = [];

    for (const pkgJsonPath of pkgJsonPaths) {
        let pkgName = null;

        try {
            const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));

            pkgName = pkgJson.name;
        } catch {
            // pkgName остаётся null
        }

        if (pkgName) {
            const pkgDir = path.dirname(pkgJsonPath);
            const componentNameDir = path.basename(pkgDir);

            const allComponentFiles = await glob('src/**/*.{tsx,jsx}', {
                cwd: pkgDir,
                absolute: true,
            });

            allComponentFiles.sort((a, b) => a.localeCompare(b));

            const pkgImports = [];

            for (const filePath of allComponentFiles) {
                const parsedComponents = processFile(filePath);

                for (const component of parsedComponents) {
                    const sourcePath = formatImportPath(pkgDir, filePath);
                    const atomPath = `${pkgName}/${component.platform}`;
                    const importPath = `@alfalab/core-components/${componentNameDir}/${component.platform}`;

                    pkgImports.push({
                        componentName: component.name,
                        sourcePath,
                        atomPath,
                        importPath,
                    });
                }
            }

            if (pkgImports.length > 0) {
                result.push({
                    packageName: pkgName,
                    imports: pkgImports,
                });
            }
        }
    }

    const newJsonContent = `${JSON.stringify(result, null, 4)}\n`;
    let needWrite = true;

    if (fs.existsSync(OUTPUT_FILE)) {
        const oldJsonContent = fs.readFileSync(OUTPUT_FILE, 'utf8');

        if (oldJsonContent === newJsonContent) {
            needWrite = false;
        }
    }

    if (needWrite) {
        fs.writeFileSync(OUTPUT_FILE, newJsonContent, 'utf8');
        console.log(`JSON сгенерирован: ${OUTPUT_FILE}`);
    } else {
        console.log('JSON не изменился, запись пропущена');
    }

    console.log(`Найдено пакетов со split-компонентами: ${result.length}`);

    return result;
};

if (process.argv[1] === currentFilename) {
    try {
        await generateSplitComponentsJson();
    } catch (error) {
        console.error(error);
    }
}
