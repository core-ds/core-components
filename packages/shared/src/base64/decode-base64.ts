/**
 * Декодирует строку в формате base64 в обычную строку (UTF-8).
 *
 * Поддерживает два окружения:
 * - Node.js: через глобальный объект Buffer (доступен без импортов)
 * - Браузер: через Web API atob + decodeURIComponent
 *
 * Простой atob не подходит для UTF-8, потому что он возвращает строку
 * в Latin-1 (один байт = один символ). Кириллица и другие многобайтовые
 * символы требуют явного перекодирования через percent-encoding.
 *
 * @param value - строка в формате base64
 * @returns декодированная строка в UTF-8
 *
 * @example
 * decodeBase64('SGVsbG8=')         // 'Hello'
 * decodeBase64('0J/RgNC40LLQtdGC') // 'Привет'
 */
export const decodeBase64 = (value: string): string => {
    /*
     * В Node.js глобальный Buffer всегда доступен; в браузере его нет.
     * Проверяем typeof, чтобы не получить ReferenceError в браузере.
     */
    if (typeof Buffer !== 'undefined') {
        /*
         * Buffer.from принимает base64-строку и сразу декодирует байты,
         * toString('utf-8') собирает из них корректную UTF-8 строку.
         */
        return Buffer.from(value, 'base64').toString('utf-8');
    }

    /*
     * atob — браузерный Web API, декодирует base64 в бинарную строку Latin-1:
     * каждый символ строки соответствует одному байту (charCode 0–255).
     * Для ASCII это уже готовый результат, но UTF-8 символы (кириллица и др.)
     * закодированы как последовательности байт, которые нужно собрать вручную.
     */
    return decodeURIComponent(
        atob(value)
            // Разбиваем бинарную строку на массив отдельных символов (байт).
            .split('')
            /*
             * Каждый символ превращаем в percent-encoded байт вида '%XX',
             * где XX — шестнадцатеричный код символа (charCodeAt возвращает число,
             * toString(16) переводит в hex, padStart добавляет ведущий ноль для однозначных кодов).
             */
            .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
            // Соединяем массив '%XX' обратно в одну строку вида '%D0%9F%D1%80%D0%B8...'
            .join(''),
        // decodeURIComponent читает percent-encoding и собирает из байт правильные UTF-8 символы.
    );
};
