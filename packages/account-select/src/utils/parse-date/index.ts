/**
 * Преобразует строку в формате "ММ/ГГ" в объект Date
 * @param expiryString - строка в формате "ММ/ГГ" (например, "12/25")
 * @returns объект Date с последним днем указанного месяца и года
 */
export const parseDate = (expiryString: string): Date => {
    if (!expiryString || !expiryString.includes('/')) {
        throw new Error('Неверный формат даты. Ожидается формат "ММ/ГГ"');
    }

    const [monthStr, yearStr] = expiryString.split('/');
    const month = parseInt(monthStr, 10) - 1; // Месяцы в JS начинаются с 0
    const year = parseInt(yearStr, 10) + 2000; // Добавляем 2000 для получения полного года

    // Проверяем валидность месяца и года
    if (month < 0 || month > 11) {
        throw new Error('Неверный месяц. Должен быть от 01 до 12');
    }

    if (year < 2000 || year > 2099) {
        throw new Error('Неверный год. Должен быть от 00 до 99');
    }

    // Создаем дату на последний день указанного месяца
    return new Date(year, month + 1, 0);
};
