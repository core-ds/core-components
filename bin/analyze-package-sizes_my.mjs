import * as esbuild from 'esbuild';
import globby from 'globby';
import shell from 'shelljs';
import fs from 'node:fs';
import { Project } from 'ts-morph';
import path from 'path';
import ts from 'typescript';
import ProgressBar from 'progress';

// import { parseImports } from 'parse-imports'

/**
 * Получает список всех экспортов из TypeScript файла, включая реэкспорты.
 * @param {string} filePath - Путь к файлу
 * @param {Set<string>} visitedFiles - Для предотвращения циклов при рекурсивных вызовах
 * @returns {string[]} Список имен экспортов
 */
function getExports(filePath, visitedFiles = new Set()) {
	const absoluteFilePath = path.resolve(filePath);

	// Проверяем, что файл ещё не обрабатывался
	if (visitedFiles.has(absoluteFilePath)) return [];
	visitedFiles.add(absoluteFilePath);

	// Создаем программу TypeScript
	const program = ts.createProgram([absoluteFilePath], {});
	const checker = program.getTypeChecker();
	const sourceFile = program.getSourceFile(absoluteFilePath);

	// console.info({filePath, absoluteFilePath})

	if (!sourceFile) {
		throw new Error(`Файл не найден: ${absoluteFilePath}`);
	}

	const exports = new Set();

	ts.forEachChild(sourceFile, (node) => {
		// Обрабатываем именованные экспорты: export { x, y } или export const x = ...
		if (ts.isExportDeclaration(node)) {
			if (node.exportClause) {
				node.exportClause.elements.forEach((element) => {
					exports.add(element.name.text);
				});
			}
			// Реэкспорты: export * from './module'
			if (node.moduleSpecifier) {
				const modulePath = resolveModulePath(node.moduleSpecifier.text, absoluteFilePath);
				if (modulePath) {
					const reexports = getExports(modulePath, visitedFiles);
					reexports.forEach((exp) => exports.add(exp));
				}
			}
		}

		// Экспорт через export const/let/function/class
		if (ts.isVariableStatement(node) || ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) {
			const modifiers = node.modifiers || [];
			const isExported = modifiers.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);

			if (isExported && node.name) {
				exports.add(node.name.text);
			}
		}

		// Default экспорт: export default ...
		if (ts.isExportAssignment(node)) {
			exports.add("default");
		}
	});

	return Array.from(exports);
}

/**
 * Разрешает путь модуля для реэкспорта с учетом доступных расширений.
 * @param {string} moduleSpecifier - Спецификатор модуля
 * @param {string} currentFilePath - Текущий обрабатываемый файл
 * @returns {string} Абсолютный путь к модулю
 */
function resolveModulePath(moduleSpecifier, currentFilePath) {
	const dir = path.dirname(currentFilePath);
	let fullPath = path.resolve(dir, moduleSpecifier);

	// Проверяем наличие файла с нужным расширением
	const extensions = ["/package.json", "/index.ts", "/index.tsx", ".ts", ".tsx", ".js", ".jsx"];
	for (const ext of extensions) {
		if (fs.existsSync(fullPath + ext)) {
			return fullPath + ext;
		}
	}

	// Если модуль уже содержит расширение и файл существует, возвращаем его
	if (fs.existsSync(fullPath)) {
		return fullPath;
	}

	console.error(`Не удалось найти модуль: ${moduleSpecifier} (по пути: ${fullPath})`);

	return null;
}

const sortingBundleSizeMap = (data) => {
// Функция для подсчёта суммы значений второго уровня
	const calculateSum = (obj) => {
		return Object.values(obj).reduce((sum, value) => sum + value, 0);
	};

// Преобразование объекта в массив с вычислением суммы для каждого ключа первого уровня
	const sortableData = Object.entries(data).map(([key, value]) => ({
		key,
		sum: calculateSum(value),
		details: value
	}));

// Сортировка ключей первого уровня по убыванию суммы
	const sortedData = sortableData.sort((a, b) => b.sum - a.sum);

// Преобразование обратно в объект, если нужно
	const sortedObject = Object.fromEntries(
		sortedData.map(({ key, details }) => [key, details])
	);

    return sortedObject;
};

async function getNamedExports(filePath) {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(filePath);
    return sourceFile.getExportSymbols().map((symbol) => symbol.getName());
}

const packages = shell.exec(
    `lerna list \\
        --ignore @alfalab/core-components-codemod \\
        --ignore @alfalab/core-components-vars \\
        --ignore @alfalab/core-components-themes \\
        --all`,
    { silent: true },
).stdout;

const packageList = packages
    .split('\n')
    .map((pkg) => pkg.trim())
    .filter(Boolean)
    .map((pkg) => pkg.replace('@alfalab/core-components-', ''));

const ENTRY_POINTS = [
    'desktop',
    'mobile',
    'responsive',
    'circle',
    'super-ellipse',
    'rectangle',
    'no-shape',
    'shared',
    'collapsible',
];

const makeFileName = (packageName, name, path) =>
    path.substring(('./packages/').length).replace(/[^a-z\d-]/gi, '_') +
    '.' +
    name;

async function calculateBundleSize(packageName) {
    const entryPoints = await globby([
        `./packages/${packageName}/src/{${ENTRY_POINTS.join(',')}}/index.ts`,
        `./packages/${packageName}/src/index.ts`,
    ]);

    const entryPointsNamed = [];

	// const imports = [...(await parseImports(code))]
	//
	// console.info(entryPoints)


    for (const filePath of entryPoints) {
        // const namedExports = await getNamedExports(filePath);
		let namedExports
		try {
			namedExports = getExports(filePath);
		} catch (e) {console.error(e)}

		// console.info(filePath, namedExports, namedExports2)

        if (namedExports.length) {
            for (const exportName of namedExports) {
                try {
                    const virtualPath =
                        './.temp/' + makeFileName(packageName, exportName, filePath) + '.ts';
                    fs.writeFileSync(virtualPath, `export { ${exportName} } from '.${filePath}';`);
                    entryPointsNamed.push(virtualPath);
                } catch (e) {
                    console.error(e);
                }
            }
        } else {
            entryPointsNamed.push(filePath);
        }
    }

	// console.info(entryPointsNamed)

    const result = await esbuild.build({
        entryPoints: entryPointsNamed,
        bundle: true,
        write: false,
        legalComments: 'none',
        outdir: `packages/${packageName}`,
        minify: true,
        minifyWhitespace: true,
        minifyIdentifiers: true,
        minifySyntax: true,
        sourcemap: false,
        treeShaking: true,
        target: 'esnext',
        format: 'esm',
        external: ['react', 'react-dom', '*.css'],
        metafile: true,
    });

    // Debug, показывает размер всех зависимостей пакета
    // if (packageName === 'date-range-input') {
    //     console.log();
    // }

    const bundleSizeMap = Object.keys(result.metafile.outputs).reduce((acc, path) => {
        const pathParts = path.split('/');
        const entry =
            pathParts.slice(-2)[0] === packageName
                ? pathParts.slice(-1)[0]
                : pathParts.slice(-2)[0];

        acc[entry.endsWith('.js') ? entry : entry + '.js'] = +(
            result.metafile.outputs[path].bytes / 1024
        ).toFixed(1);

        return acc;
    }, {});

    // Сортируем ключи по алфавиту, иначе выводятся в случайном порядке
    return Object.keys(bundleSizeMap)
        .sort()
        .reduce((obj, key) => {
            obj[key] = bundleSizeMap[key];
            return obj;
        }, {});
}

async function run() {
    const bar = new ProgressBar('[:bar] :percent', { total: packageList.length });
    let timer = setInterval(function () {
        bar.tick();
        if (bar.complete) {
            console.log('\ncomplete\n');
            clearInterval(timer);
        }
    }, 1000);

    const bundleSizeMap = {};
    // console.info(packageList.length)
    while (packageList.length > 0) { // 120 пакетов
        const pkgName = packageList.pop();

        bundleSizeMap[pkgName] = await calculateBundleSize(pkgName);
    }

    const sorted = sortingBundleSizeMap(bundleSizeMap);
    // console.info(2, sorted);

    await fs.promises.writeFile(
        './.storybook/package-sizes.json',
        JSON.stringify(sorted, null, 4),
    );
}

run()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
