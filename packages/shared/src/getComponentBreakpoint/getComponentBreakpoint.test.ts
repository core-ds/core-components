import { getComponentBreakpoint } from './getComponentBreakpoint';

describe('getComponentBreakpoint', () => {
    it('get default value', () => {
        const breakpoint = getComponentBreakpoint();
        expect(breakpoint).toBe(1024);
    });

    it('get custom value', () => {
        Object.defineProperty(window, 'getComputedStyle', {
            value: () => {
                return {
                    getPropertyValue: () => {
                        return 768;
                    },
                };
            },
        });

        const customBreakpoint = getComponentBreakpoint();

        expect(customBreakpoint).toBe(768);
    });
});
