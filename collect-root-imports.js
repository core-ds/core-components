const fs = require('fs');
const path = require('path');

// Основная функция для поиска пакетов
function findPackages(dir, level = 1) {
    const result = {};

    // Читаем содержимое директории
    const items = fs.readdirSync(dir, { withFileTypes: true });

    items.forEach(item => {
        if (item.isDirectory()) {
            const itemPath = path.join(dir, item.name);
            const packageJsonPath = path.join(itemPath, 'package.json');

            // Проверяем, содержит ли папка файл package.json
            if (fs.existsSync(packageJsonPath)) {
                // Читаем и парсим package.json
                const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
                let packageName = packageData.name || item.name;

                // Убираем префикс "@alfalab/core-components-" только для первого уровня
                packageName = packageName.replace(/^@alfalab\/core-components-/, '');

                // Ищем папку src внутри этой папки и проверяем подпапки в ней
                const srcPath = path.join(itemPath, 'src');
                if (fs.existsSync(srcPath) && fs.statSync(srcPath).isDirectory()) {
                    result[packageName] = findSubPackages(srcPath);
                } else {
                    result[packageName] = [];
                }
            }
        }
    });

    return result;
}

// Функция для поиска подпакетов в папке src
function findSubPackages(srcDir) {
    const subPackages = [];
    const items = fs.readdirSync(srcDir, { withFileTypes: true });

    items.forEach(item => {
        if (item.isDirectory()) {
            const subPackagePath = path.join(srcDir, item.name, 'package.json');
            if (fs.existsSync(subPackagePath)) {
                const subPackageData = JSON.parse(fs.readFileSync(subPackagePath, 'utf-8'));
                const subPackageName = subPackageData.name || item.name;

                // Оставляем оригинальное название подпакета без удаления префикса
                subPackages.push(subPackageName);
            }
        }
    });

    return subPackages;
}

// Путь к директории packages
const packagesDir = path.join(__dirname, 'packages');

// Поиск пакетов
const packages = findPackages(packagesDir);

// Сохранение первого отчета в JSON-файл
const outputFilePath = path.join(__dirname, 'packages_report.json');
fs.writeFileSync(outputFilePath, JSON.stringify(packages, null, 2));
console.log(`Отчет сохранен в файл: ${outputFilePath}`);

// Создание второго отчета с пакетами, содержащими подпакет "mobile"
const mobilePackages = Object.keys(packages).filter(pkg => packages[pkg].includes('mobile'));

// Сохранение второго отчета в JSON-файл
const mobileOutputFilePath = path.join(__dirname, 'packages_mobile_report.json');
fs.writeFileSync(mobileOutputFilePath, JSON.stringify(mobilePackages, null, 2));
console.log(`Отчет с пакетами, содержащими 'mobile', сохранен в файл: ${mobileOutputFilePath}`);
