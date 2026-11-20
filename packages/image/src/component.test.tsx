import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { CoreConfigContext } from '@alfalab/core-components-config';

import { Image } from './index';

const ORIGINAL_SRC = 'https://web.alfabank.ru/mobile/s3/static/loyalty/services/travel_300x300.png';
const CDN_SRC =
    'https://alfaonline.servicecdn.ru/public/s3/static/loyalty/services/travel_300x300.png';

const PROXY_MAP = [
    {
        from: 'https://web.alfabank.ru/mobile',
        to: 'https://alfaonline.servicecdn.ru/public',
    },
];

describe('Image', () => {
    const originalIntersectionObserver = window.IntersectionObserver;

    afterEach(() => {
        window.IntersectionObserver = originalIntersectionObserver;
    });

    it('should render img with original src when proxyMap is empty', () => {
        const { container } = render(<Image src={ORIGINAL_SRC} />);
        const img = container.querySelector('img');

        expect(img).toHaveAttribute('src', ORIGINAL_SRC);
    });

    it('should rewrite src by proxyMap prop', () => {
        const { container } = render(<Image src={ORIGINAL_SRC} proxyMap={PROXY_MAP} />);
        const img = container.querySelector('img');

        expect(img).toHaveAttribute('src', CDN_SRC);
    });

    it('should take proxyMap from CoreConfigContext', () => {
        const { container } = render(
            <CoreConfigContext.Provider
                value={{
                    breakpoint: 1024,
                    client: 'desktop',
                    components: {
                        Image: { proxyMap: PROXY_MAP },
                    },
                }}
            >
                <Image src={ORIGINAL_SRC} />
            </CoreConfigContext.Provider>,
        );
        const img = container.querySelector('img');

        expect(img).toHaveAttribute('src', CDN_SRC);
    });

    it('should prefer proxyMap prop over context', () => {
        const propMap = [
            {
                from: 'https://web.alfabank.ru/mobile',
                to: 'https://cdn-from-prop.example/public',
            },
        ];

        const { container } = render(
            <CoreConfigContext.Provider
                value={{
                    breakpoint: 1024,
                    client: 'desktop',
                    components: {
                        Image: { proxyMap: PROXY_MAP },
                    },
                }}
            >
                <Image src={ORIGINAL_SRC} proxyMap={propMap} />
            </CoreConfigContext.Provider>,
        );
        const img = container.querySelector('img');

        expect(img).toHaveAttribute(
            'src',
            'https://cdn-from-prop.example/public/s3/static/loyalty/services/travel_300x300.png',
        );
    });

    it('should fallback to original src on CDN error', () => {
        const { container } = render(<Image src={ORIGINAL_SRC} proxyMap={PROXY_MAP} />);
        const img = container.querySelector('img');

        expect(img).toHaveAttribute('src', CDN_SRC);

        fireEvent.error(img as HTMLImageElement);

        expect(img).toHaveAttribute('src', ORIGINAL_SRC);
    });

    it('should not set src until intersecting when inViewOption is true', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).IntersectionObserver = class {
            observe = () => undefined;

            disconnect = () => undefined;
        };

        const { container } = render(<Image src={ORIGINAL_SRC} inViewOption={true} />);
        const img = container.querySelector('img');

        expect(img).not.toHaveAttribute('src');
    });

    it('should set src after intersection when inViewOption is true', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).IntersectionObserver = class {
            private readonly callback: IntersectionObserverCallback;

            constructor(callback: IntersectionObserverCallback) {
                this.callback = callback;
            }

            observe = () => {
                this.callback(
                    [{ isIntersecting: true } as IntersectionObserverEntry],
                    this as unknown as IntersectionObserver,
                );
            };

            disconnect = () => undefined;
        };

        const { container } = render(
            <Image src={ORIGINAL_SRC} proxyMap={PROXY_MAP} inViewOption={true} />,
        );
        const img = container.querySelector('img');

        expect(img).toHaveAttribute('src', CDN_SRC);
    });

    it('should set className and dataTestId', () => {
        const { container } = render(
            <Image src={ORIGINAL_SRC} className='custom-class' dataTestId='image-test' />,
        );
        const img = container.querySelector('img');

        expect(img).toHaveClass('custom-class');
        expect(img).toHaveAttribute('data-test-id', 'image-test');
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<Image src={ORIGINAL_SRC} />);

        expect(unmount).not.toThrow();
    });
});
