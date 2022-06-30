/**
 * Расчет нового положения каретки.
 * @param phonePart Шаблон с которым сравнивается новое значение. (Часть телефона без маски с учетом удаленных и добавленных цифр).
 * @param newVal Новый отформатированный телефон.
 */
export function calculateCaretPos(phonePart: string, newVal: string) {
    let newCaretPosition = 0;

    for (let idx = 0; idx < phonePart.length; idx++) {
        const digit = phonePart.charAt(idx);

        if (digit !== newVal.charAt(newCaretPosition)) {
            idx -= 1;
        }

        newCaretPosition += 1;

        // Если произошла непредвиденная ситуация, то прерываем цикл и ставим каретку в самый конец номера.
        if (newCaretPosition > newVal.length) {
            newCaretPosition = newVal.length;
            break;
        }
    }

    return newCaretPosition;
}
