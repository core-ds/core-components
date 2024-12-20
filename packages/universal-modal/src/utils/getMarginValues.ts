import { TMargin } from '../typings/margin-type';

export const getMarginValues = (margin: TMargin) => {
    if (margin.length === 1) {
        return { top: margin[0], right: margin[0], bottom: margin[0], left: margin[0] };
    }
    if (margin.length === 2) {
        return { top: margin[0], right: margin[1], bottom: margin[0], left: margin[1] };
    }
    if (margin.length === 3) {
        return { top: margin[0], right: margin[1], bottom: margin[2], left: margin[1] };
    }
    if (margin.length === 4) {
        return { top: margin[0], right: margin[1], bottom: margin[2], left: margin[3] };
    }

    return {};
};
