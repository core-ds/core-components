import { parseDate } from './index';

describe('parseDate', () => {
    it('should parse valid date string correctly', () => {
        const result = parseDate('12/25');
        expect(result.getFullYear()).toBe(2025);
        expect(result.getMonth()).toBe(11); // Декабрь (0-индексирован)
        expect(result.getDate()).toBe(31); // Последний день декабря
    });

    it('should handle single digit month and year', () => {
        const result = parseDate('01/23');
        expect(result.getFullYear()).toBe(2023);
        expect(result.getMonth()).toBe(0); // Январь
        expect(result.getDate()).toBe(31); // Последний день января
    });

    it('should create date with last day of month', () => {
        const february = parseDate('02/24'); // 2024 - високосный год
        expect(february.getDate()).toBe(29);

        const februaryNonLeap = parseDate('02/23'); // 2023 - не високосный
        expect(februaryNonLeap.getDate()).toBe(28);

        const april = parseDate('04/25');
        expect(april.getDate()).toBe(30); // Апрель имеет 30 дней
    });

    describe('Error cases', () => {
        it('should throw error for empty string', () => {
            expect(() => parseDate('')).toThrow('Неверный формат даты. Ожидается формат "ММ/ГГ"');
        });

        it('should throw error for string without slash', () => {
            expect(() => parseDate('1225')).toThrow(
                'Неверный формат даты. Ожидается формат "ММ/ГГ"',
            );
        });

        it('should throw error for invalid month', () => {
            expect(() => parseDate('00/25')).toThrow('Неверный месяц. Должен быть от 01 до 12');
            expect(() => parseDate('13/25')).toThrow('Неверный месяц. Должен быть от 01 до 12');
        });

        it('should throw error for invalid year', () => {
            expect(() => parseDate('12/100')).toThrow('Неверный год. Должен быть от 00 до 99');
        });
    });

    const validTestCases: Array<[string, number, number, number]> = [
        ['01/25', 2025, 0, 31], // Январь
        ['02/24', 2024, 1, 29], // Февраль високосный
        ['02/23', 2023, 1, 28], // Февраль обычный
        ['03/25', 2025, 2, 31], // Март
        ['04/25', 2025, 3, 30], // Апрель
        ['05/25', 2025, 4, 31], // Май
        ['06/25', 2025, 5, 30], // Июнь
        ['07/25', 2025, 6, 31], // Июль
        ['08/25', 2025, 7, 31], // Август
        ['09/25', 2025, 8, 30], // Сентябрь
        ['10/25', 2025, 9, 31], // Октябрь
        ['11/25', 2025, 10, 30], // Ноябрь
        ['12/25', 2025, 11, 31], // Декабрь
    ];

    it.each(validTestCases)(
        'should parse %s to correct date',
        (input, expectedYear, expectedMonth, expectedDate) => {
            const result = parseDate(input);
            expect(result.getFullYear()).toBe(expectedYear);
            expect(result.getMonth()).toBe(expectedMonth);
            expect(result.getDate()).toBe(expectedDate);
        },
    );

    const invalidTestCases: Array<[string, string]> = [
        ['', 'Неверный формат даты. Ожидается формат "ММ/ГГ"'],
        ['1225', 'Неверный формат даты. Ожидается формат "ММ/ГГ"'],
        ['00/25', 'Неверный месяц. Должен быть от 01 до 12'],
        ['13/25', 'Неверный месяц. Должен быть от 01 до 12'],
    ];

    it.each(invalidTestCases)('should throw error for %s', (input, expectedError) => {
        expect(() => parseDate(input)).toThrow(expectedError);
    });
});
