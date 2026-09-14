import { type Dimention } from '@alfalab/core-components-headless-collapse/types';
import { getElementWindow } from '@alfalab/core-components-shared';

export const capitalize = (s: string) => s.replace(/^[a-z]/, (first) => first.toUpperCase());

export const defaultGetDimensionValue = (node: HTMLElement, dimension: Dimention): number => {
    const css = getElementWindow(node).getComputedStyle(node);
    const offsetProp = `offset${capitalize(dimension)}` as 'offsetHeight' | 'offsetWidth';

    return (
        node[offsetProp] +
        (dimension === 'height' ? (['top', 'bottom'] as const) : (['left', 'right'] as const))
            .map((position) => {
                const prop = `margin${capitalize(position)}` as
                    | 'marginTop'
                    | 'marginBottom'
                    | 'marginLeft'
                    | 'marginRight';

                return parseInt(css[prop], 10);
            })
            .reduce((a, b) => a + b)
    );
};
