import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { Spoiler } from '../Component';
import { measureText } from '../particle-utils';

const mockEngine = {
    configure: jest.fn(),
    syncColor: jest.fn(),
    redraw: jest.fn(),
    layout: jest.fn(),
    setPlaying: jest.fn(),
    destroy: jest.fn(),
};
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();
const mockResizeCallbacks: ResizeObserverCallback[] = [];

jest.mock('../particle-engine', () => ({
    ParticleEngine: jest.fn().mockImplementation(() => mockEngine),
}));
jest.mock('../particle-utils', () => ({
    measureText: jest.fn(() => [{ x: 0, y: 0, width: 100, height: 20 }]),
}));
jest.mock('@juggle/resize-observer', () => ({
    ResizeObserver: jest.fn().mockImplementation((callback) => {
        mockResizeCallbacks.push(callback);
        return { observe: mockObserve, disconnect: mockDisconnect };
    }),
}));

describe('Окружение анимации Spoiler', () => {
    let mutations: Array<{ callback: MutationCallback; observe: jest.Mock; disconnect: jest.Mock }>;
    let intersect: IntersectionObserverCallback;
    const originalIntersection = window.IntersectionObserver;
    const originalResize = window.ResizeObserver;

    beforeEach(() => {
        jest.clearAllMocks();
        mockResizeCallbacks.length = 0;
        mutations = [];
        window.ResizeObserver = undefined as unknown as typeof ResizeObserver;
        window.IntersectionObserver = jest.fn().mockImplementation((callback) => {
            intersect = callback;
            return { observe: jest.fn(), disconnect: jest.fn() };
        });
        jest.spyOn(window, 'MutationObserver').mockImplementation((callback) => {
            const observer = {
                callback,
                observe: jest.fn(),
                disconnect: jest.fn(),
                takeRecords: jest.fn(),
            };
            mutations.push(observer);
            return observer;
        });
        jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
            {} as CanvasRenderingContext2D,
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
        window.IntersectionObserver = originalIntersection;
        window.ResizeObserver = originalResize;
    });

    it('для элемента использует размер canvas и не измеряет текст', () => {
        const { container } = render(
            <Spoiler mode='element' dataTestId='image'>
                <img src='/image.png' alt='Сад' />
            </Spoiler>,
        );
        const canvas = container.querySelector('canvas');

        expect(mockObserve).toHaveBeenCalledWith(canvas);
        expect(measureText).not.toHaveBeenCalled();
        expect(mockEngine.layout).toHaveBeenLastCalledWith([]);

        act(() =>
            mockResizeCallbacks[0](
                [{ contentRect: { width: 240, height: 144 } } as ResizeObserverEntry],
                {} as ResizeObserver,
            ),
        );

        expect(mockEngine.layout).toHaveBeenLastCalledWith([
            { x: 0, y: 0, width: 240, height: 144 },
        ]);
        expect(mockEngine.setPlaying).toHaveBeenLastCalledWith(true);
    });

    it('останавливает движение после раскрытия, вне экрана и в скрытой вкладке', () => {
        const visibility = jest.spyOn(document, 'hidden', 'get').mockReturnValue(false);
        const { rerender } = render(<Spoiler revealed={false}>Секрет</Spoiler>);

        expect(mockEngine.setPlaying).toHaveBeenLastCalledWith(true);
        rerender(<Spoiler revealed>Секрет</Spoiler>);
        expect(mockEngine.setPlaying).toHaveBeenLastCalledWith(false);
        rerender(<Spoiler revealed={false}>Секрет</Spoiler>);
        visibility.mockReturnValue(true);
        fireEvent(document, new Event('visibilitychange'));
        expect(mockEngine.setPlaying).toHaveBeenLastCalledWith(false);
        visibility.mockReturnValue(false);
        fireEvent(document, new Event('visibilitychange'));
        expect(mockEngine.setPlaying).toHaveBeenLastCalledWith(true);

        act(() =>
            intersect(
                [{ isIntersecting: false } as IntersectionObserverEntry],
                {} as IntersectionObserver,
            ),
        );
        expect(mockEngine.setPlaying).toHaveBeenLastCalledWith(false);
        act(() =>
            intersect(
                [{ isIntersecting: true } as IntersectionObserverEntry],
                {} as IntersectionObserver,
            ),
        );
        expect(mockEngine.setPlaying).toHaveBeenLastCalledWith(true);
    });

    it('наблюдает содержимое и корень, но не html, body и canvas', () => {
        const { container, rerender } = render(
            <div>
                <span style={{ display: 'inline' }}>
                    <Spoiler>Секрет</Spoiler>
                </span>
            </div>,
        );
        const root = container.querySelector('[data-state]');

        expect(mockObserve).toHaveBeenCalledWith(container.firstChild);
        expect(mutations).toHaveLength(2);
        expect(mutations[0].observe).toHaveBeenCalledWith(
            container.querySelector('[data-spoiler-content]'),
            expect.objectContaining({ attributeFilter: ['class', 'style'] }),
        );
        expect(mutations[1].observe).toHaveBeenCalledTimes(1);
        expect(mutations[1].observe).toHaveBeenCalledWith(root, {
            attributes: true,
            attributeFilter: ['class', 'style'],
        });
        expect(
            mutations.flatMap(({ observe }) => observe.mock.calls.map(([target]) => target)),
        ).not.toContain(document.documentElement);
        expect(
            mutations.flatMap(({ observe }) => observe.mock.calls.map(([target]) => target)),
        ).not.toContain(document.body);
        expect(
            mutations.flatMap(({ observe }) => observe.mock.calls.map(([target]) => target)),
        ).not.toContain(container.querySelector('canvas'));

        jest.mocked(measureText).mockClear();
        rerender(
            <div>
                <span style={{ display: 'inline' }}>
                    <Spoiler style={{ fontSize: 30, borderTopLeftRadius: 8 }}>Секрет</Spoiler>
                </span>
            </div>,
        );
        act(() => mutations[1].callback([], {} as MutationObserver));
        expect(mockEngine.configure).toHaveBeenLastCalledWith(8, 30);
        expect(measureText).toHaveBeenCalledTimes(1);
    });

    it('сразу синхронизирует цвет при смене colors без нового замера', () => {
        const { rerender } = render(<Spoiler>Секрет</Spoiler>);

        mockEngine.syncColor.mockClear();
        mockEngine.redraw.mockClear();
        mockEngine.layout.mockClear();
        jest.mocked(measureText).mockClear();
        mockEngine.syncColor.mockReturnValueOnce(true);
        rerender(<Spoiler colors='inverted'>Секрет</Spoiler>);

        expect(mockEngine.syncColor).toHaveBeenCalledTimes(1);
        expect(mockEngine.redraw).toHaveBeenCalledTimes(1);
        expect(mockEngine.layout).not.toHaveBeenCalled();
        expect(measureText).not.toHaveBeenCalled();
    });

    it('освобождает наблюдатели, подписку видимости и движок', () => {
        const removeListener = jest.spyOn(document, 'removeEventListener');
        const { unmount } = render(<Spoiler>Секрет</Spoiler>);

        unmount();

        expect(mockEngine.destroy).toHaveBeenCalledTimes(1);
        expect(mockDisconnect).toHaveBeenCalledTimes(1);
        mutations.forEach((observer) => expect(observer.disconnect).toHaveBeenCalledTimes(1));
        expect(removeListener).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
    });

    it('при недоступном canvas сохраняет скрытие и раскрытие по публичному API', () => {
        jest.mocked(HTMLCanvasElement.prototype.getContext).mockReturnValue(null);
        const { container } = render(<Spoiler>Секрет</Spoiler>);

        expect(mockEngine.layout).not.toHaveBeenCalled();
        expect(container.querySelector('[data-spoiler-content]')).toHaveAttribute('inert');
        fireEvent.click(screen.getByRole('button'));
        expect(container.querySelector('[data-spoiler-content]')).not.toHaveAttribute('inert');
        expect(screen.getByText('Секрет')).toBeVisible();
    });
});
