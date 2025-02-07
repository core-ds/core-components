const path = require('path');
const fs = require('fs');

/**
 * Скрипт предназначен для генерации css файлов с переопределением переменных для темной темы
 * Обрабатывает файлы которые начинаются с "colors-"
 * Скрипт автоматически запустится при обновлении ui-primitives
 * Исключены файлы [colors-bluetint.css, colors-indigo.css] => эти палитры обработаны в themes/src/dark.css
 *
 * PR https://github.com/core-ds/core-components/pull/1514
 */

const varsDir = './packages/vars/src';
const excludedFiles = ['colors-bluetint.css', 'colors-indigo.css'];

const files = fs.readdirSync(varsDir);

// Фильтруем CSS файлы, начинающиеся с "colors"
const colorCssFiles = files.filter((file) => file.startsWith('colors') && file.endsWith('.css'));

if (colorCssFiles.length === 0) {
    console.log('[!] Нет файлов, начинающихся с "colors" в папке.');
    return;
}

// Обрабатываем отфильтрованные исходные файлы
colorCssFiles.forEach((file) => {
    const filePath = path.join(varsDir, file);

    // Отбрасываем уже сгенерированные файлы
    if (file.includes('-dark.css')) {
        return;
    }

    // Отбрасываем фалы исключения
    if (excludedFiles.includes(file)) {
        console.log(`Пропуск файла: ${filePath}`);
        return;
    }

    const outputFilePath = path.join(varsDir, file.replace('.css', '-dark.css'));

    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Регулярное выражение для поиска переменных, содержащих "light"
    const lightVariablesRegex = /--color-light-[\w-]+:/g;

    // Фильтрация строк, соответствующих переменным с "light"
    const filteredData = fileContent.match(lightVariablesRegex);

    if (!filteredData) {
        console.log(`[!] Не найдено переменных "light" в файле: ${filePath}`);
        return;
    }

    // Обработка отфильтрованных данных: заменяем "light" на "dark" и формируем новую переменную с var()
    const newCssContent =
        ':root {\n' +
        filteredData
            .map((variable) => {
                // Извлекаем название переменной (без значения)
                const varName = variable.split(':')[0].trim();

                // Заменяем "light" на "dark" и формируем строку вида var(--color-dark-...)
                const newVarName = varName.replace('light', 'dark');

                if (fileContent.includes(newVarName)) {
                    return `\t${varName}: var(${newVarName});`;
                }
                return null;
            })
            // Фильтруем значения у которых нет парного "dark" токена
            .filter((variable) => variable !== null)
            .join('\n') +
        '\n}';

    if (!newCssContent.match(lightVariablesRegex)) {
        console.log(`[!] Отсутствуют парные переменные, пропуск файла: ${outputFilePath}`);
        return;
    }

    try {
        // Запись отфильтрованных данных в новый файл
        fs.writeFileSync(outputFilePath, newCssContent);
        console.log('[+] Переменные записаны в файл:', outputFilePath);
    } catch (err) {
        console.error('Ошибка при записи в файл:', err);
    }
});
