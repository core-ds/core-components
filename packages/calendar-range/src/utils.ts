import { getDataTestId } from '@alfalab/core-components-shared';

export const isDayButton = (node: HTMLElement | null) =>
    node && node.tagName === 'BUTTON' && node.dataset.date;

export function getCalendarRangeTestIds(dataTestId: string) {
    return {
        component: dataTestId,
        calendarContainerFrom: getDataTestId(dataTestId, 'container-from'),
        calendarContainerTo: getDataTestId(dataTestId, 'container-to'),
    };
}
