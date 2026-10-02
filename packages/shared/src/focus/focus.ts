import { isIOS } from '../os';

/**
 * Единая политика: можно ли программно фокусировать текстовое поле
 * (вызов `focus()` или атрибут `autoFocus`) на текущей платформе.
 *
 * В iOS программный фокус вне синхронного обработчика пользовательского события
 * не открывает клавиатуру, но DOM-фокус применяется и поле получает фокусные стили.
 * Это намеренная политика WebKit, а не баг.
 * https://bugs.webkit.org/show_bug.cgi?id=195884
 */
function canProgrammaticallyFocus() {
    return !isIOS();
}

/**
 * Возвращает значение `autoFocus` с учетом платформы:
 * `true`, только если автофокус запрошен и разрешен политикой `canProgrammaticallyFocus`.
 *
 * @example <input autoFocus={mergeAutoFocus(autoFocus)} />
 */
export function mergeAutoFocus(autoFocus?: boolean) {
    return Boolean(autoFocus) && canProgrammaticallyFocus();
}

/**
 * Программно фокусирует текстовое поле, если это разрешено политикой `canProgrammaticallyFocus`.
 * Безопасно принимает `null`/`undefined`, например `ref.current`.
 *
 * @example programmaticFocus(inputRef.current, { preventScroll: true });
 */
export function programmaticFocus(
    element: HTMLInputElement | HTMLTextAreaElement | null | undefined,
    options?: FocusOptions,
) {
    if (element && canProgrammaticallyFocus()) {
        element.focus(options);
    }
}
