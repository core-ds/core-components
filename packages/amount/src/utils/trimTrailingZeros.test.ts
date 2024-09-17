import { trimTrailingZeros } from './trimTrailingZeros';

describe('test function "trimTrailingZeros"', () => {
    it('should calculate valid caret position when add digit', () => {
        expect(trimTrailingZeros('00')).toBe('00');
        expect(trimTrailingZeros('70')).toBe('7');
        expect(trimTrailingZeros('77')).toBe('77');
        expect(trimTrailingZeros('007')).toBe('007');
        expect(trimTrailingZeros('707')).toBe('707');
        expect(trimTrailingZeros('00700')).toBe('007');
        expect(trimTrailingZeros('007700')).toBe('0077');
        expect(trimTrailingZeros('007007')).toBe('007007');
        expect(trimTrailingZeros('0070070')).toBe('007007');
    });
});
