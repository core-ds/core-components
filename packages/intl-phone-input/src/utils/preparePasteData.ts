/**
 * Подготовка данных для вставки из буфера обмена.
 * @param phoneValue Телефон уже введённый в поле ввода.
 * @param phoneFromBuffer Текст номера телефона из буфера обмена.
 * @param input Input в который осуществляется вставка.
 */
export function preparePasteData(
    phoneValue: string,
    phoneFromBuffer: string,
    selectionStart?: number,
    selectionEnd?: number,
) {
    const trimNuber = phoneFromBuffer.trim();
    const cutNumberWithPlus = trimNuber.replace(/[^+\d]/g, '');
    const isTextHavePlus = cutNumberWithPlus[0] === '+';
    const cutNumber = trimNuber.replace(/[^\d]/g, '');
    const isRuNumberInBuffer = cutNumber[0] === '7' || cutNumber[0] === '8';
    let resultNumber = '';

    // вставка в поле c "+"
    if (phoneValue === '+') {
        resultNumber = `+${cutNumber}`;
        // вставка в поле, в которое введена часть номера
    } else if (phoneValue) {
        const startText = phoneValue.substring(0, selectionStart || 0);
        const endText = phoneValue.substring(selectionEnd || 0);
        const isSelectPlus = selectionStart === 0 && selectionEnd !== 0;

        if (selectionStart === 0 && selectionEnd === 0 && !isTextHavePlus) {
            resultNumber = `+${cutNumber}${phoneValue.substring(1)}`.replace(/[^+\d]/g, '');
        } else if (!isTextHavePlus && !isSelectPlus) {
            resultNumber = `${startText}${cutNumber}${endText}`.replace(/[^+\d]/g, '');
        } else if (isTextHavePlus && isSelectPlus) {
            resultNumber = `${cutNumberWithPlus}${endText}`.replace(/[^+\d]/g, '');
        }
        // вставка в пустое поле
    } else if (!phoneValue) {
        // вставка номера начинающегося с "+" в пустое поле
        if (isTextHavePlus) {
            resultNumber = cutNumberWithPlus;
            // вставка номера начинающегося с "7" или "8" в пустое поле
        } else if (isRuNumberInBuffer) {
            resultNumber = `+7${cutNumber.substring(1)}`;
            // вставка номера начинающегося НЕ с "7", "8", "+" в пустое поле
        } else {
            resultNumber = `+7${cutNumber}`;
        }
    }

    return resultNumber;
}
