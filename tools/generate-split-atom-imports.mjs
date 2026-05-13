import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'tinyglobby';
import { Project } from 'ts-morph';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = path.dirname(currentFilename);

const ROOT_DIR = path.resolve(currentDirname, '..');
const OUTPUT_FILE = path.resolve(ROOT_DIR, 'packages', 'root', 'split-atom-imports.json');

const SPLIT_IMPORT_TAG = '@hasSplitImport';
const ATOM_IMPORT_TAG = '@hasAtomImport';

const project = new Project({
    compilerOptions: {
        jsx: 2,
    },
});

/**
 * Извлекает именованные экспорты через AST
 * @param {string} filePath - Путь к файлу
 * @returns {{ splitExports: string[], atomExports: string[] }}
 */
const extractTaggedExports = (filePath) => {
    const splitExports = new Set();
    const atomExports = new Set();
    const atomDeclaredNames = new Set();

    const sourceFile = project.addSourceFileAtPath(filePath);
    const fullText = sourceFile.getFullText();

    // Вспомогательная функция для проверки тегов в JSDoc
    const checkDocs = (docs) => ({
        hasAtom: docs.some((d) => d.getInnerText().includes(ATOM_IMPORT_TAG)),
        hasSplit: docs.some((d) => d.getInnerText().includes(SPLIT_IMPORT_TAG)),
    });

    // Вспомогательная функция для обработки объявлений (переменные и функции)
    const processDeclaration = (decl, hasAtom, hasSplit, isExported) => {
        const name = decl.getName();

        if (name) {
            if (hasAtom) {
                atomDeclaredNames.add(name);
                if (isExported) atomExports.add(name);
            }
            if (hasSplit && isExported) splitExports.add(name);
        }
    };

    // Шаг 1: Обрабатываем переменные (const, let, var)
    for (const varStmt of sourceFile.getVariableStatements()) {
        const { hasAtom, hasSplit } = checkDocs(varStmt.getJsDocs());

        if (hasAtom || hasSplit) {
            const isExported = varStmt.isExported();

            varStmt
                .getDeclarations()
                .forEach((decl) => processDeclaration(decl, hasAtom, hasSplit, isExported));
        }
    }

    // Шаг 2: Обрабатываем функции
    for (const funcDecl of sourceFile.getFunctions()) {
        const { hasAtom, hasSplit } = checkDocs(funcDecl.getJsDocs());

        if (hasAtom || hasSplit) {
            processDeclaration(funcDecl, hasAtom, hasSplit, funcDecl.isExported());
        }
    }

    // Шаг 3: Обрабатываем export { A, B as C }
    for (const exportDecl of sourceFile.getExportDeclarations()) {
        if (!exportDecl.isTypeOnly()) {
            const triviaText = fullText.substring(exportDecl.getFullStart(), exportDecl.getStart());
            const blockSplit = triviaText.includes(SPLIT_IMPORT_TAG);

            for (const element of exportDecl.getNamedExports()) {
                // Пропускаем типовой спецификатор экспорта
                if (!element.isTypeOnly()) {
                    const originalName = element.getName();
                    const aliasNode = element.getAliasNode();
                    const exportedName = aliasNode ? aliasNode.getText() : originalName;

                    if (blockSplit) splitExports.add(exportedName);
                    if (atomDeclaredNames.has(originalName)) atomExports.add(exportedName);
                }
            }
        }
    }

    project.removeSourceFile(sourceFile);

    return {
        splitExports: Array.from(splitExports),
        atomExports: Array.from(atomExports),
    };
};

/**
 * Единая функция обработки файла
 * @param {string} filePath - Путь к файлу
 * @returns {{ splitExports: string[], atomExports: string[] } | null}
 */
const processFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');

    if (!content.includes(SPLIT_IMPORT_TAG) && !content.includes(ATOM_IMPORT_TAG)) {
        return null;
    }

    return extractTaggedExports(filePath);
};

/**
 * Основная функция генерации JSON
 * @returns {Promise<object>} Сгенерированный объект данных
 */
const generateSplitAtomImportsJson = async () => {
    const pkgJsonPaths = await glob('packages/*/package.json', {
        cwd: ROOT_DIR,
        absolute: true,
    });

    pkgJsonPaths.sort((a, b) => a.localeCompare(b));

    const globalSplitImports = [];
    const globalAtomImports = [];

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

            const allComponentFiles = await glob('src/**/*.{tsx,jsx,ts,js}', {
                cwd: pkgDir,
                absolute: true,
                ignore: [
                    // Тесты
                    '**/__tests__/**',
                    '**/*.test.*',
                    '**/*.spec.*',
                    // Скриншоты
                    '**/__image_snapshots__/**',
                    '**/__snapshots__/**',
                    '**/screenshots/**',
                    '**/*.screenshots.*',
                    '**/*.screenshot.*',
                    // Storybook
                    '**/*.stories.*',
                    '**/stories/**',
                ],
            });

            allComponentFiles.sort((a, b) => a.localeCompare(b));

            const pkgSplitImports = [];
            const pkgAtomImports = [];

            for (const filePath of allComponentFiles) {
                const parsedComponents = processFile(filePath);

                if (parsedComponents) {
                    pkgSplitImports.push(...parsedComponents.splitExports);
                    pkgAtomImports.push(...parsedComponents.atomExports);
                }
            }

            const uniqueSplit = [...new Set(pkgSplitImports)];
            const uniqueAtom = [...new Set(pkgAtomImports)];

            if (uniqueSplit.length > 0) {
                globalSplitImports.push({
                    packageName: pkgName,
                    imports: uniqueSplit,
                });
            }

            if (uniqueAtom.length > 0) {
                globalAtomImports.push({
                    packageName: pkgName,
                    imports: uniqueAtom,
                });
            }
        }
    }

    const result = {
        splitImports: globalSplitImports,
        atomImports: globalAtomImports,
    };

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

    console.log(
        `Пакетов с splitImports: ${globalSplitImports.length}, с atomImports: ${globalAtomImports.length}`,
    );

    return result;
};

if (process.argv[1] === currentFilename) {
    console.time('generateSplitAtomImportsJson');
    try {
        await generateSplitAtomImportsJson();
    } catch (error) {
        console.error(error);
    } finally {
        console.timeEnd('generateSplitAtomImportsJson');
    }
}
