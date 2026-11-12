import { mergeAutoFocus, programmaticFocus } from './focus';

describe('focus policy on server', () => {
    it.each([
        [true, true],
        [false, false],
        [undefined, false],
    ])('mergeAutoFocus(%s) returns %s', (autoFocus, expected) => {
        expect(mergeAutoFocus(autoFocus)).toBe(expected);
    });

    it.each([null, undefined])('programmaticFocus(%s) does not throw', (element) => {
        expect(() => programmaticFocus(element)).not.toThrow();
    });
});
