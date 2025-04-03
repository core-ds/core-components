import { isScrollable } from './isScrollable';

/**
 * Находит ближайший родительский элемент с возможностью прокрутки.
 *
 * @param element - Элемент, от которого начинается поиск. Может быть null.
 * @returns {Element}
 *   - Ближайший родительский элемент с возможностью прокрутки
 *   - Если такой не найден, возвращает document.scrollingElement или document.documentElement
 *   - Если передан null, вернет корневой элемент документа
 */
export function findScrollableParent(element: Element | null): Element {
    let current = element;

    if (current && isScrollable(current)) {
        current = current.parentElement;
    }

    while (current && !isScrollable(current)) {
        current = current.parentElement;
    }

    return current || document.scrollingElement || document.documentElement;
}
