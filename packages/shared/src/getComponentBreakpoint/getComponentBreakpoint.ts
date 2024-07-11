import { isClient } from '../isClient';

const defaultComponentBreakpoint = 1024;

const getCustomBreakpoint = (): number | null => {
    // проверяем глобальный css custom property
    const breakpoint =
        isClient() &&
        window
            ?.getComputedStyle(document.documentElement)
            ?.getPropertyValue('--global-breakpoint-desktop');

    return breakpoint ? parseFloat(breakpoint) : null;
};

export function getComponentBreakpoint(): number {
    const customBreakpoint = getCustomBreakpoint();

    if (customBreakpoint) {
        return customBreakpoint;
    }

    return defaultComponentBreakpoint;
}
