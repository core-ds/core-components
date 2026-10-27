import { mergeAutoFocus, programmaticFocus } from './focus';
import { isIOS } from '../os';

jest.mock('../os', () => {
    const original = jest.requireActual('../os');

    return Object.assign({ __esModule: true }, original, {
        isIOS: jest.fn(original.isIOS),
    });
});

describe('focus', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('iOS', () => {
        beforeEach(() => {
            jest.mocked(isIOS).mockReturnValue(true);
        });

        it.each([true, false, undefined])('mergeAutoFocus(%s) returns false', (autoFocus) => {
            expect(mergeAutoFocus(autoFocus)).toBe(false);
        });

        it('programmaticFocus does not focus the element', () => {
            const input = document.createElement('input');
            const focusSpy = jest.spyOn(input, 'focus');

            document.body.appendChild(input);
            programmaticFocus(input);

            expect(focusSpy).not.toHaveBeenCalled();
            expect(document.activeElement).not.toBe(input);

            input.remove();
        });
    });

    describe('not iOS', () => {
        beforeEach(() => {
            jest.mocked(isIOS).mockReturnValue(false);
        });

        it.each([
            [true, true],
            [false, false],
            [undefined, false],
        ])('mergeAutoFocus(%s) returns %s', (autoFocus, expected) => {
            expect(mergeAutoFocus(autoFocus)).toBe(expected);
        });

        it.each(['input', 'textarea'] as const)('programmaticFocus focuses the %s', (tag) => {
            const element = document.createElement(tag);

            document.body.appendChild(element);
            programmaticFocus(element);

            expect(document.activeElement).toBe(element);

            element.remove();
        });

        it('programmaticFocus passes options to focus()', () => {
            const input = document.createElement('input');
            const focusSpy = jest.spyOn(input, 'focus');
            const options: FocusOptions = { preventScroll: true };

            programmaticFocus(input, options);

            expect(focusSpy).toHaveBeenCalledTimes(1);
            expect(focusSpy).toHaveBeenCalledWith(options);
        });
    });

    it.each([null, undefined])('programmaticFocus(%s) does not throw', (element) => {
        expect(() => programmaticFocus(element)).not.toThrow();
    });
});
