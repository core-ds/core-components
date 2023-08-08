export const TIMEOUT = 500;
export const SWIPE_VELOCITY = 0.4;
export const MARKER_HEIGHT = 24;
export const CLOSE_OFFSET = 0.2;
export const SCROLL_OFFSET = 1;
export const HEADER_OFFSET = 24;

export const convertPercentToNumber = (
    value: string | number,
    fullHeight: number,
    headerOffset = HEADER_OFFSET,
) => {
    const maxHeight = fullHeight - headerOffset;

    if (typeof value === 'string') {
        const percent = parseFloat(value) / 100;

        if (percent < 0) {
            return Math.min(maxHeight, fullHeight + fullHeight * percent);
        }

        return Math.min(maxHeight, fullHeight * percent);
    }

    if (value < 0) {
        return Math.max(0, fullHeight + value);
    }

    return Math.min(maxHeight, value);
};
