import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const EXTENSIONS = ['.ts', '.tsx'];

function toPascalCase(kebabCaseName) {
    return kebabCaseName
        .split('-')
        .map((part) => part[0].toUpperCase() + part.slice(1))
        .join('');
}

function stripComments(content) {
    return content.replace(/\/\/.*$/gm, '');
}

// './Component' -> либо файл './Component.ts(x)', либо папка-barrel с './Component/index.ts'
function resolveModulePath(baseDir, specifier) {
    const resolved = path.resolve(baseDir, specifier);

    for (const ext of EXTENSIONS) {
        if (existsSync(resolved + ext)) {
            return resolved + ext;
        }
    }

    const indexFile = path.join(resolved, 'index.ts');

    return existsSync(indexFile) ? indexFile : null;
}

// name объявлен прямо в этом файле (а не реэкспортирован откуда-то ещё) —
// значит это и есть искомый терминальный файл компонента
function hasLocalDeclaration(content, name) {
    const declRe = new RegExp(`export\\s+(?:default\\s+)?(?:const|function|class|let|var)\\s+${name}\\b`);

    if (declRe.test(content)) return true;

    // export { Name }; — без "from", т.е. реэкспорт локально объявленного идентификатора
    const bareBlockRe = /export\s+\{([^}]*)\}(?!\s*from)/g;
    let match;

    while ((match = bareBlockRe.exec(content))) {
        for (const rawSpec of match[1].split(',')) {
            const spec = rawSpec.replace(/^type\s+/, '').trim();

            if (!spec) continue;

            const asMatch = spec.match(/^(\S+)\s+as\s+(\S+)$/);
            const exportedName = asMatch ? asMatch[2] : spec;

            if (exportedName === name) return true;
        }
    }

    return false;
}

// export { A as Name, ... } from './module' — под каким локальным именем name
// назывался в исходном модуле и откуда реэкспортирован
function findNamedExportSource(content, name) {
    const exportBlockRe = /export\s+\{([^}]*)\}\s+from\s+['"]([^'"]+)['"]/g;

    let match;

    while ((match = exportBlockRe.exec(content))) {
        const [, specifiers, from] = match;

        for (const rawSpec of specifiers.split(',')) {
            const spec = rawSpec.replace(/^type\s+/, '').trim();

            if (!spec) continue;

            const asMatch = spec.match(/^(\S+)\s+as\s+(\S+)$/);
            const [localName, exportedName] = asMatch ? [asMatch[1], asMatch[2]] : [spec, spec];

            if (exportedName === name) {
                return { localName, from };
            }
        }
    }

    return null;
}

// Идёт по цепочке именованных export-ов (включая barrel-файлы вида
// './responsive' -> './responsive/index.ts') в поисках файла, где name объявлен
// по-настоящему, а не просто переэкспортирован.
// `export * from './module'` намеренно не разворачиваем: за такой записью имя
// компонента не проверить, не читая произвольные файлы пакета — такие пакеты
// пропускаем, пока их index.ts не начнёт явно называть публичный компонент.
function resolveExport(filePath, name, visited) {
    if (!filePath || !existsSync(filePath) || visited.has(filePath)) return null;

    visited.add(filePath);

    const content = stripComments(readFileSync(filePath, 'utf-8'));

    if (hasLocalDeclaration(content, name)) {
        return filePath;
    }

    const named = findNamedExportSource(content, name);

    if (named) {
        const nextFile = resolveModulePath(path.dirname(filePath), named.from);

        return resolveExport(nextFile, named.localName, visited);
    }

    return null;
}

/**
 * Находит реальный файл компонента, отталкиваясь от публичного контракта пакета
 * (src/index.ts), а не от структуры папок. Ищет, где по цепочке именованных
 * реэкспортов (`export { X as Y } from './module'`) фактически объявлен
 * PascalCase(packageName). Благодаря этому резолв не зависит от того, насколько
 * глубоко внутри src лежит сам файл компонента.
 */
export function resolveComponentEntry(packageDir, packageName) {
    const indexFile = path.join(packageDir, 'src', 'index.ts');

    return resolveExport(indexFile, toPascalCase(packageName), new Set());
}
