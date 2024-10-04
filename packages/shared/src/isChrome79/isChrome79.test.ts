import { isChrome79 } from './isChrome79';

describe('isChrome79', () => {
    let userAgent: ReturnType<typeof jest.spyOn>;

    beforeEach(() => {
        userAgent = jest.spyOn(window.navigator, 'userAgent', 'get');
    });

    it('browser should not 79 version', () => {
        const userAgentChrome128 =
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';
        userAgent.mockReturnValue(userAgentChrome128);
        expect(isChrome79()).toBeFalsy();
    });

    it('browser should be 79 version', () => {
        const userAgentChrome79 =
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36';
        userAgent.mockReturnValue(userAgentChrome79);
        expect(isChrome79()).toBeTruthy();
    });
});
