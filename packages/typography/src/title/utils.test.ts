import { getDefaultWeight } from './utils';

describe('utils tests', () => {
    describe('getDefaultWeight', () => {
        it('should return valid weight', () => {
            expect(getDefaultWeight('styrene', 'mobile')).toBe('medium');
            expect(getDefaultWeight('styrene', 'desktop')).toBe('medium');
            expect(getDefaultWeight('system', 'mobile')).toBe('semibold');
            expect(getDefaultWeight('system', 'desktop')).toBe('bold');
        });
    });
});
