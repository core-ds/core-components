import { getElementWindow } from '@alfalab/core-components-shared';

export function findActiveIndex(translate: number, snaps: number[], sizes: number[]): number {
    const [MIN_TRANSLATE] = snaps;
    const MAX_TRANSLATE = snaps[snaps.length - 1];
    const nextTranslate = clamp(translate, MIN_TRANSLATE, MAX_TRANSLATE);

    switch (nextTranslate) {
        case MAX_TRANSLATE:
            return snaps.length - 1;
        case MIN_TRANSLATE:
            return 0;
        default:
            return snaps.findIndex((snap, index) => nextTranslate - snap <= sizes[index] / 2);
    }
}

export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export function sum(a: number, b: number): number {
    return a + b;
}

export function getStylePropertyValue(element: Element, property: string): string {
    const win = getElementWindow(element);

    return win.getComputedStyle(element).getPropertyValue(property);
}
