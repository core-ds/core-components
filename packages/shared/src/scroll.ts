type ScrollDirection = 'x' | 'y';

export function isEndScrollPosition(element: Element, direction: ScrollDirection = 'y'): boolean {
    const isVertical = direction === 'y';
    const dimention = isVertical ? 'Height' : 'Width';
    const offset = isVertical ? 'Top' : 'Left';

    return (
        Math.abs(
            element[`scroll${dimention}`] -
                element[`client${dimention}`] -
                element[`scroll${offset}`],
        ) <= 1
    );
}

export function isStartScrollPosition(element: Element, direction: ScrollDirection = 'y'): boolean {
    const offset = direction === 'y' ? 'Top' : 'Left';

    return element[`scroll${offset}`] === 0;
}
