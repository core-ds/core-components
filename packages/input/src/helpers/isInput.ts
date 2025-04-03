// Инпуты, которые не вызывают появления клавиатуры
const NON_TEXT_INPUT_TYPES = new Set([
    'checkbox',
    'radio',
    'range',
    'color',
    'file',
    'image',
    'button',
    'submit',
    'reset',
]);

/**
 * Проверяет, является ли элемент текстовым полем ввода, которое может получать ввод с клавиатуры.
 *
 * @param element - DOM-элемент для проверки. Может быть null для безопасной обработки.
 * @returns {boolean}
 *   - `true` если элемент:
 *     * Текстовое поле ввода (`<input type="text|email|password...>`)
 *     * Элемент `<textarea>`
 *     * Редактируемый элемент (contenteditable)
 *   - `false` во всех остальных случаях, включая:
 *     * Null/undefined на входе
 *     * Не-инпуты
 *     * Нетекстовые поля ввода (чекбоксы, радиокнопки и др.)
 */
export function isInput(
    element: Element | null,
): element is HTMLInputElement | HTMLTextAreaElement {
    if (!element) return false;

    const { nodeName } = element;

    if (nodeName === 'INPUT') {
        return !NON_TEXT_INPUT_TYPES.has((element as HTMLInputElement).type);
    }
    if (nodeName === 'TEXTAREA') {
        return true;
    }

    return 'isContentEditable' in element && (element as HTMLElement).isContentEditable;
}
