import { isClient } from '../isClient';

/* eslint-disable vars-on-top, no-var, @typescript-eslint/no-namespace */
declare global {
    namespace globalThis {
        var globalBreakpointDesktop: number;
    }
}
/* eslint-disable vars-on-top, no-var, @typescript-eslint/no-namespace */

const defaultComponentBreakpoint = 1024;

const getCSSCustomBreakpoint = (): number | null => {
    // проверяем глобальный css custom property
    const breakpoint =
        isClient() &&
        window
            ?.getComputedStyle(document.documentElement)
            ?.getPropertyValue('--global-breakpoint-desktop');

    return breakpoint ? parseFloat(breakpoint) : null;
};

export function getComponentBreakpoint(): number {
    const cssCustomBreakpoint = getCSSCustomBreakpoint();

    if (cssCustomBreakpoint) {
        return cssCustomBreakpoint;
    }

    if (globalThis.globalBreakpointDesktop) {
        return globalThis.globalBreakpointDesktop;
    }

    return defaultComponentBreakpoint;
}
