import fs from 'node:fs';
import path from 'node:path';

import { globSync } from 'tinyglobby';
import ts from 'typescript';

const { dirname } = import.meta;
const repoRoot = path.resolve(dirname, '../../..');

function toPascalCase(packageName) {
    return packageName
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
}

// import-спецификатор из `export { X } from './y'` не содержит расширения и может
// указывать как на файл, так и на директорию с index.ts/index.tsx внутри
function resolveModuleFile(baseDir, specifier) {
    const resolved = path.resolve(baseDir, specifier);

    const candidates = [
        `${resolved}.ts`,
        `${resolved}.tsx`,
        path.join(resolved, 'index.ts'),
        path.join(resolved, 'index.tsx'),
    ];

    return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

// `export const Foo = ...`, `export function Foo() {}`, `export class Foo {}`
function isDirectExportNamed(statement, componentName) {
    if (!ts.canHaveModifiers(statement)) {
        return false;
    }

    const isExported = ts
        .getModifiers(statement)
        ?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);

    if (!isExported) {
        return false;
    }

    if (ts.isVariableStatement(statement)) {
        return statement.declarationList.declarations.some(
            (declaration) =>
                ts.isIdentifier(declaration.name) && declaration.name.text === componentName,
        );
    }

    if ((ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) && statement.name) {
        return statement.name.text === componentName;
    }

    return false;
}

// Ищет в index.ts именованный экспорт с именем componentName и возвращает файл,
// в котором реально определён компонент (а не сам index.ts с кучей чужих экспортов —
// иначе react-docgen-typescript мог случайно задокументировать не тот компонент).
// `export * from ...` намеренно не разворачивается: не зная, что лежит в дочернем
// модуле, пришлось бы рекурсивно парсить весь граф реэкспортов; если у пакета нет
// явного именованного экспорта компонента — считаем, что энтрипоинта пока нет.
function findComponentEntryFile(indexFilePath, componentName) {
    const sourceFile = ts.createSourceFile(
        indexFilePath,
        fs.readFileSync(indexFilePath, 'utf-8'),
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS,
    );

    for (const statement of sourceFile.statements) {
        // `export const Foo = ...` — компонент объявлен прямо в index.ts
        if (isDirectExportNamed(statement, componentName)) {
            return indexFilePath;
        }

        if (!ts.isExportDeclaration(statement) || !statement.exportClause) {
            // `export * from '...'` и `export * as X from '...'` — пропускаем,
            // не разворачивая (см. комментарий к функции)
            continue;
        }

        if (statement.isTypeOnly || !ts.isNamedExports(statement.exportClause)) {
            continue;
        }

        const matched = statement.exportClause.elements.find(
            (element) => !element.isTypeOnly && element.name.text === componentName,
        );

        if (!matched) {
            continue;
        }

        if (!statement.moduleSpecifier || !ts.isStringLiteral(statement.moduleSpecifier)) {
            // `export { X as componentName };` без `from` — X переэкспортирован
            // из локальной области видимости самого index.ts
            return indexFilePath;
        }

        // `export { X as componentName } from './y'` — идём резолвить реальный файл
        return resolveModuleFile(path.dirname(indexFilePath), statement.moduleSpecifier.text);
    }

    return null;
}

export function getComponentEntryPoints() {
    console.log('🔍  Search for components...');

    const indexFiles = globSync(['packages/*/src/index.ts'], {
        cwd: repoRoot,
        ignore: [
            'packages/*-private/**',
            'packages/*-v1/**',
            'packages/alert/**',
            'packages/badge/**',
            'packages/calendar-input/**',
            'packages/date-input/**',
            'packages/date-range-input/**',
            'packages/date-time-input/**',
            'packages/intl-phone-input/**',
            'packages/loader/**',
            'packages/time-input/**',
        ],
    });

    const files = indexFiles
        .map((indexFile) => {
            const indexFilePath = path.resolve(repoRoot, indexFile);
            const packageName = indexFile.split('/')[1];
            const componentName = toPascalCase(packageName);

            return findComponentEntryFile(indexFilePath, componentName);
        })
        .filter(Boolean);

    console.log(`📦  Found ${files.length} components`);

    return files;
}
