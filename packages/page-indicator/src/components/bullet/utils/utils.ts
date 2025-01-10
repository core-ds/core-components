const RENDER_ELEMENTS_COUNT = 5;

export function calcParams(
    size: number,
    gap: number,
    activeElementIndex: number,
    elementsCount: number,
): [
    height: number,
    width: number,
    offset: number,
    elementSize: (index: number) => number,
    firstVisibleElementIndex: number,
    lastVisibleElementIndex: number,
] {
    const renderElementsCount = Math.min(elementsCount, RENDER_ELEMENTS_COUNT);
    const firstIndex = 0;
    const lastIndex = elementsCount - 1;

    function findFirstVisibleElementIndex(): number {
        const middle = (renderElementsCount - 1) / 2;
        let leadingOffset: number;
        let tailingOffset: number;

        if (middle % 1 === 0) {
            leadingOffset = middle;
            tailingOffset = middle;
        } else {
            leadingOffset = Math.floor(middle);
            tailingOffset = Math.ceil(middle);
        }

        // rebalance leadingOffset
        const maybeFirstVisibleElementIndex = activeElementIndex - leadingOffset;

        if (maybeFirstVisibleElementIndex < firstIndex) {
            leadingOffset -= firstIndex - maybeFirstVisibleElementIndex;
        }
        const maybeLastActiveElementIndex = activeElementIndex + tailingOffset;

        if (maybeLastActiveElementIndex > lastIndex) {
            leadingOffset += maybeLastActiveElementIndex - lastIndex;
        }

        return activeElementIndex - leadingOffset;
    }

    const firstVisibleElementIndex = findFirstVisibleElementIndex();
    const lastVisibleElementIndex = renderElementsCount + firstVisibleElementIndex - 1;

    const largeSize = size;
    const middleSize = 0.75 * size;
    const smallSize = 0.5 * size;

    // eslint-disable-next-line complexity
    function computeElementSize(_: unknown, index: number): number {
        if (index < firstVisibleElementIndex || index > lastVisibleElementIndex) {
            return smallSize;
        }

        if (elementsCount === RENDER_ELEMENTS_COUNT + 1 /* totalCount === 6 */) {
            if (
                (index === firstVisibleElementIndex &&
                    !(firstVisibleElementIndex === firstIndex)) ||
                (index === lastVisibleElementIndex && !(lastVisibleElementIndex === lastIndex))
            ) {
                return middleSize;
            }
        } else if (elementsCount > RENDER_ELEMENTS_COUNT + 1 /* totalCount > 6 */) {
            if (firstVisibleElementIndex === firstIndex) {
                if (!(lastVisibleElementIndex === lastIndex)) {
                    if (index === lastVisibleElementIndex) {
                        if (activeElementIndex === lastVisibleElementIndex - 1) {
                            return middleSize;
                        }

                        return smallSize;
                    }

                    if (index === lastVisibleElementIndex - 1) {
                        return middleSize;
                    }
                }
            }
            if (lastVisibleElementIndex === lastIndex) {
                if (!(firstVisibleElementIndex === firstIndex)) {
                    if (index === firstVisibleElementIndex) {
                        if (activeElementIndex === firstVisibleElementIndex + 1) {
                            return middleSize;
                        }

                        return smallSize;
                    }

                    if (index === firstVisibleElementIndex + 1) {
                        return middleSize;
                    }
                }
            }

            if (
                (index === firstVisibleElementIndex &&
                    !(firstVisibleElementIndex === firstIndex)) ||
                (index === lastVisibleElementIndex && !(lastVisibleElementIndex === lastIndex))
            ) {
                return middleSize;
            }
        }

        return largeSize;
    }
    const elementSizes = Array.from({ length: elementsCount }, computeElementSize);
    const width = renderElementsCount * (largeSize + gap) - gap;

    function actualWidth() {
        return elementSizes
            .slice(firstVisibleElementIndex, lastVisibleElementIndex + 1)
            .map((elementSize, index, array) =>
                index === array.length - 1 ? elementSize : elementSize + gap,
            )
            .reduce((a, b) => a + b, 0);
    }

    function offset() {
        const extraOffset =
            firstVisibleElementIndex === firstIndex
                ? 0
                : (width - actualWidth()) / (lastVisibleElementIndex === lastIndex ? 1 : 2);

        return (
            extraOffset -
            elementSizes
                .slice(firstIndex, firstVisibleElementIndex)
                .map((elementSize) => elementSize + gap)
                .reduce((a, b) => a + b, 0)
        );
    }

    function height() {
        return Math.max(size, largeSize, middleSize, smallSize);
    }

    return [
        height(),
        width,
        offset(),
        function elementSize(index: number) {
            return elementSizes[index];
        },
        firstVisibleElementIndex,
        lastVisibleElementIndex,
    ];
}
