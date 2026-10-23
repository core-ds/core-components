export type Rect = { x: number; y: number; width: number; height: number };

/** Объединяет соседние фрагменты одной строки, не закрашивая межстрочные промежутки. */
export const mergeRects = (rects: Rect[]): Rect[] => {
    const result: Rect[] = [];

    rects
        .filter(({ width, height }) => width > 0 && height > 0)
        .sort((first, second) => first.y - second.y || first.x - second.x)
        .forEach((rect) => {
            const previous = result[result.length - 1];

            if (
                previous &&
                Math.abs(previous.y - rect.y) < 1 &&
                Math.abs(previous.height - rect.height) < 1 &&
                rect.x <= previous.x + previous.width + 1
            ) {
                previous.width =
                    Math.max(previous.x + previous.width, rect.x + rect.width) - previous.x;
            } else {
                result.push({ ...rect });
            }
        });

    return result;
};

/** Измеряет реальные переносы текста, включая вложенные strong/em и явные br. */
export const measureText = (content: HTMLElement, anchor: HTMLElement): Rect[] => {
    const origin = anchor.getBoundingClientRect();
    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    const rects: Rect[] = [];
    const heights = new Map<Element, number>();
    let node = walker.nextNode();

    while (node) {
        if (node.textContent?.trim()) {
            const parent = node.parentElement || content;

            if (!heights.has(parent)) {
                const fontSize = parseFloat(getComputedStyle(parent).fontSize) || 16;

                /*
                 * Полоса ≈ 70% кегля с шагом 2px совпадает с текстовыми стилями макета:
                 * 14 → 10, 16/18 → 12, 20 → 14, 22 → 16, 26 → 18, 30 → 22, 48 → 34.
                 */
                heights.set(parent, Math.max(1, Math.round(fontSize * 0.35) * 2));
            }
            range.selectNodeContents(node);
            Array.from(range.getClientRects()).forEach((rect) => {
                const height = Math.min(rect.height, heights.get(parent) || rect.height);

                rects.push({
                    x: rect.left - origin.left,
                    y: rect.top - origin.top + (rect.height - height) / 2,
                    width: rect.width,
                    height,
                });
            });
        }
        node = walker.nextNode();
    }

    return mergeRects(rects);
};
