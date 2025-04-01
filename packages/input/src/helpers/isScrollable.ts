export function isScrollable(element: Element): boolean {
    if (!element) {
        return false;
    }

    const style = window.getComputedStyle(element);

    return (
        style.overflow === 'auto' ||
        style.overflow === 'scroll' ||
        style.overflowY === 'auto' ||
        style.overflowY === 'scroll'
    );
}
