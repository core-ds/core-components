/**
 * Позволяет проверить что цифры были вставлены до или после знака плюс [+]
 * @description +7 123 => paste 222 => +2227 123
 * @description +7 123 => paste 222 => 222+7 123
 */
export const checkInsertBefore = (baseNumber: string | undefined, modifiedNumber: string) => {
    if (baseNumber) {
        try {
            /** Удаляем лишние символы */
            // +7 123 => 7123
            const base = baseNumber.replace(/\s+/g, '').replace('+', '');
            // +7 123 => +7123
            const modified = modifiedNumber.replace(/\s+/g, '');

            /**
             * Числа вставлены между [+] и номером
             * +7 123 => paste 222 => +2227 123
             */
            const afterPlusPattern = new RegExp(`^\\+\\d*${base}$`);

            if (afterPlusPattern.test(modified)) {
                return true;
            }

            /**
             * Числа вставлены перед [+]
             * +7 123 => paste 222 => 222+7 123
             */
            const beforePlusPattern = new RegExp(`^\\d*\\+${base}$`);

            if (beforePlusPattern.test(modified)) {
                return true;
            }

            return false;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('checkInsertAtBeginning', e);
        }
    }

    return false;
};
