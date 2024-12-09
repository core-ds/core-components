const fs = require('fs');
const path = require('path');

// Путь к папке packages
const packagesDir = path.join(__dirname, 'packages');

// Функция для получения всех зависимостей из package.json
function collectDependencies(packagePath) {
    const dependencies = {};

    // Проверяем, существует ли package.json
    const packageJsonPath = path.join(packagePath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) return dependencies;

    // Читаем и парсим package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    // Собираем dependencies и peerDependencies
    ['dependencies', 'peerDependencies'].forEach((section) => {
        if (packageJson[section]) {
            for (const [dep, version] of Object.entries(packageJson[section])) {
                // Исключаем зависимости, начинающиеся с "@alfalab/"
                if (!dep.startsWith('@alfalab/')) {
                    if (!dependencies[dep]) {
                        dependencies[dep] = { count: 0, versions: [] };
                    }
                    dependencies[dep].count += 1;

                    // Добавляем версию, если её ещё нет в массиве
                    if (!dependencies[dep].versions.includes(version)) {
                        dependencies[dep].versions.push(version);
                    }
                }
            }
        }
    });

    return dependencies;
}

// Главная функция
function aggregateDependencies() {
    const aggregatedDependencies = {};

    // Считываем все папки в packages
    const packages = fs.readdirSync(packagesDir).filter((file) => {
        const fullPath = path.join(packagesDir, file);
        return fs.statSync(fullPath).isDirectory();
    });

    // Проходим по каждой папке пакета
    packages.forEach((packageName) => {
        const packagePath = path.join(packagesDir, packageName);
        const dependencies = collectDependencies(packagePath);

        // Агрегируем зависимости
        for (const [dep, data] of Object.entries(dependencies)) {
            if (!aggregatedDependencies[dep]) {
                aggregatedDependencies[dep] = { count: 0, versions: [] };
            }
            aggregatedDependencies[dep].count += data.count;

            // Объединяем версии
            aggregatedDependencies[dep].versions = [
                ...new Set([...aggregatedDependencies[dep].versions, ...data.versions]),
            ].sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
        }
    });

    return aggregatedDependencies;
}

// Выполнение и вывод результата
const result = aggregateDependencies();
console.log(JSON.stringify(result, null, 2));
