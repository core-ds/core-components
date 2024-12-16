const path = require('path');
const fs = require('fs');

/**
 * Скрипт предназначен для генерации css файлов с переопределением переменных для темной темы
 * Обрабатывает файлы начинающиеся с "colors-"
 * Скрипт автоматически запустится при обновлении ui-primitives
 */

const processCssFile = (filePath, outputFilePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении файла:', err);
            return;
        }

        // Регулярное выражение для поиска переменных, содержащих "light"
        const lightVariablesRegex = /--color-light-[\w-]+:/g;

        // Фильтрация строк, соответствующих переменным с "light"
        const filteredData = data.match(lightVariablesRegex);

        if (filteredData) {
            // Обработка отфильтрованных данных: заменяем "light" на "dark" и формируем новую переменную с var()
            const newCssContent =
                ':root {\n' +
                filteredData
                    .map((variable) => {
                        // Извлекаем название переменной (без значения)
                        const varName = variable.split(':')[0].trim();

                        // Заменяем "light" на "dark" и формируем строку вида var(--color-dark-...)
                        const newVarName = varName.replace('light', 'dark');

                        if (data.includes(newVarName)) {
                            return `\t${varName}: var(${newVarName});`;
                        }
                        return null;
                    })
                    // Фильтруем значения у которых нет парного "dark" токена
                    .filter((variable) => variable !== null)
                    .join('\n') +
                '\n}';

            if (!newCssContent.match(lightVariablesRegex)) {
                console.log(
                    `Файл ${outputFilePath} не будет записан, так как не содержит парных переменных`,
                );
                return;
            }

            // Запись отфильтрованных данных в новый файл
            fs.writeFile(outputFilePath, newCssContent, (err) => {
                if (err) {
                    console.error('Ошибка при записи в файл:', err);
                } else {
                    console.log('Переменные записаны в файл:', outputFilePath);
                }
            });
        } else {
            console.log(`Не найдено переменных "light" в файле: ${filePath}`);
        }
    });
};

const varsDir = './packages/vars/src';
fs.readdir(varsDir, (err, files) => {
    if (err) {
        console.error('Ошибка при чтении папки:', err);
        return;
    }

    // Фильтруем только CSS файлы, начинающиеся с "color"
    const colorCssFiles = files.filter(
        (file) => file.startsWith('colors') && file.endsWith('.css'),
    );

    if (colorCssFiles.length === 0) {
        console.log('Нет файлов, начинающихся с "color" в папке.');
        return;
    }

    // Обрабатываем исходные файлы
    colorCssFiles.forEach((file, _, array) => {
        const filePath = path.join(varsDir, file);

        if (file.includes('-dark.css')) {
            return;
        }

        const outputFilePath = path.join(varsDir, file.replace('.css', '-dark.css'));
        processCssFile(filePath, outputFilePath);
    });
});
