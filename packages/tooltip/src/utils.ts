import { getDataTestId } from '@alfalab/core-components-shared';

export function getTooltipDesktopTestIds(dataTestId: string) {
    return {
        target: getDataTestId(dataTestId, 'target'),
        content: getDataTestId(dataTestId, 'content'),
        popover: getDataTestId(dataTestId, 'popover'),
    };
}

export function getTooltipMobileTestIds(dataTestId: string) {
    return {
        target: getDataTestId(dataTestId, 'target'),
        bottomSheet: getDataTestId(dataTestId, 'bottom-sheet'),
    };
}
