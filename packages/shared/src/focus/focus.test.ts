import { mergeAutoFocus, programmaticFocus } from './focus';

type Platform = {
    userAgent: string;
    platform: string;
    maxTouchPoints: number;
};

const PLATFORMS: Record<string, Platform> = {
    iPhone: {
        userAgent:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        platform: 'iPhone',
        maxTouchPoints: 5,
    },
    'iPhone WebView': {
        userAgent:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        platform: 'iPhone',
        maxTouchPoints: 5,
    },
    // iPadOS по умолчанию представляется десктопным Safari
    iPadOS: {
        userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
        platform: 'MacIntel',
        maxTouchPoints: 5,
    },
    Android: {
        userAgent:
            'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        platform: 'Linux armv8l',
        maxTouchPoints: 5,
    },
    'macOS Safari': {
        userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
        platform: 'MacIntel',
        maxTouchPoints: 0,
    },
    'Windows Chrome': {
        userAgent:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        platform: 'Win32',
        maxTouchPoints: 0,
    },
};

const IOS_PLATFORMS = ['iPhone', 'iPhone WebView', 'iPadOS'];
const NON_IOS_PLATFORMS = ['Android', 'macOS Safari', 'Windows Chrome'];

const setPlatform = (platform: Platform) => {
    (Object.keys(platform) as Array<keyof Platform>).forEach((key) => {
        Object.defineProperty(window.navigator, key, {
            value: platform[key],
            configurable: true,
        });
    });
};

const resetPlatform = () => {
    (['userAgent', 'platform', 'maxTouchPoints'] as const).forEach((key) => {
        delete (window.navigator as unknown as Record<string, unknown>)[key];
    });
};

describe('focus policy', () => {
    afterEach(() => {
        resetPlatform();
        jest.restoreAllMocks();
    });

    describe.each(IOS_PLATFORMS)('iOS: %s', (name) => {
        beforeEach(() => setPlatform(PLATFORMS[name]));

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

    describe.each(NON_IOS_PLATFORMS)('not iOS: %s', (name) => {
        beforeEach(() => setPlatform(PLATFORMS[name]));

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

    describe.each([...IOS_PLATFORMS, ...NON_IOS_PLATFORMS])('nullable element: %s', (name) => {
        beforeEach(() => setPlatform(PLATFORMS[name]));

        it.each([null, undefined])('programmaticFocus(%s) does not throw', (element) => {
            expect(() => programmaticFocus(element)).not.toThrow();
        });
    });
});
