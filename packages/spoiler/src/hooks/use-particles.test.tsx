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
    setOpen: jest.fn(),
    destroy: jest.fn(),
};
const mockResizeCallbacks: ResizeObserverCallback[] = [];
const mockDisconnect = jest.fn();

jest.mock('../particle-engine', () => ({
    ParticleEngine: jest.fn().mockImplementation(() => mockEngine),
}));
jest.mock('../particle-utils', () => ({ measureText: jest.fn() }));
jest.mock('@juggle/resize-observer', () => ({
    ResizeObserver: jest.fn().mockImplementation((callback: ResizeObserverCallback) => {
        mockResizeCallbacks.push(callback);
        return { observe: jest.fn(), disconnect: mockDisconnect };
    }),
}));

const flushMutations = () =>
    act(async () => {
        await Promise.resolve();
    });

describe('Связь DOM и анимации Spoiler', () => {
    let intersect: IntersectionObserverCallback;
    let media: MediaQueryList;
    const originalResize = window.ResizeObserver;
    const originalIntersection = window.IntersectionObserver;
    const originalMatchMedia = window.matchMedia;

    beforeEach(() => {
        jest.clearAllMocks();
        mockResizeCallbacks.length = 0;
        jest.mocked(measureText).mockReturnValue([{ x: 0, y: 0, width: 100, height: 20 }]);
        window.ResizeObserver = undefined as unknown as typeof ResizeObserver;
        window.IntersectionObserver = jest
            .fn()
            .mockImplementation((callback: IntersectionObserverCallback) => {
                intersect = callback;
                return { observe: jest.fn(), disconnect: jest.fn() };
            });
        media = Object.assign(new EventTarget(), { matches: false }) as MediaQueryList;
        window.matchMedia = jest.fn(() => media);
        jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
            {} as CanvasRenderingContext2D,
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
        window.ResizeObserver = originalResize;
        window.IntersectionObserver = originalIntersection;
        window.matchMedia = originalMatchMedia;
    });

    it('обновляет геометрию при изменении соседнего текста без resize', async () => {
        const Example = ({ prefix }: { prefix: string }) => (
            <p>
                {prefix}
                <Spoiler>Длинный текст</Spoiler>
            </p>
        );
        const { container, rerender } = render(<Example prefix='9 ₽' />);
        await flushMutations();
        mockEngine.layout.mockClear();
        const wrapped = [
            { x: 0, y: 0, width: 40, height: 20 },
            { x: -20, y: 24, width: 60, height: 20 },
        ];
        jest.mocked(measureText).mockReturnValue(wrapped);

        rerender(<Example prefix='1000 ₽' />);
        await flushMutations();
        expect(mockEngine.layout).toHaveBeenLastCalledWith(wrapped);

        mockEngine.layout.mockClear();
        container.querySelector('p')?.prepend(document.createTextNode('Новая подпись '));
        await flushMutations();
        expect(mockEngine.layout).toHaveBeenCalledTimes(1);
    });

    it('не пересобирает облако при переключении, ready и внутренних записях canvas', async () => {
        const { container, rerender } = render(<Spoiler open={false}>Секрет</Spoiler>);
        await flushMutations();
        mockEngine.layout.mockClear();

        rerender(<Spoiler open>Секрет</Spoiler>);
        await flushMutations();
        expect(mockEngine.setOpen).toHaveBeenLastCalledWith(true);
        rerender(<Spoiler open={false}>Секрет</Spoiler>);
        container.querySelector('canvas')!.style.width = '120px';
        await flushMutations();

        expect(mockEngine.setOpen).toHaveBeenLastCalledWith(false);
        expect(mockEngine.layout).not.toHaveBeenCalled();
    });

    it('перемеряет текст при изменении внешнего оформления', async () => {
        const { rerender } = render(<Spoiler>Секрет</Spoiler>);
        await flushMutations();
        mockEngine.layout.mockClear();

        rerender(
            <Spoiler className='large' style={{ fontSize: 30, borderTopLeftRadius: 8 }}>
                Секрет
            </Spoiler>,
        );
        await flushMutations();

        expect(mockEngine.configure).toHaveBeenLastCalledWith(8, 30, 280);
        expect(mockEngine.layout).toHaveBeenCalledTimes(1);
    });

    it('для элемента использует размер canvas', () => {
        render(
            <Spoiler mode='element'>
                <img src='/image.png' alt='Сад' />
            </Spoiler>,
        );
        act(() =>
            mockResizeCallbacks[0](
                [{ contentRect: { width: 240, height: 144 } } as ResizeObserverEntry],
                {} as ResizeObserver,
            ),
        );
        expect(mockEngine.layout).toHaveBeenLastCalledWith([
            { x: 0, y: 0, width: 240, height: 144 },
        ]);
        expect(measureText).not.toHaveBeenCalled();
    });

    it('учитывает reduced motion при монтировании и изменении настройки', () => {
        Object.assign(media, { matches: true });
        render(<Spoiler>Секрет</Spoiler>);
        expect(mockEngine.setPlaying).toHaveBeenLastCalledWith(false);

        act(() => {
            Object.assign(media, { matches: false });
            media.dispatchEvent(new Event('change'));
        });
        expect(mockEngine.setPlaying).toHaveBeenLastCalledWith(true);
        act(() => {
            Object.assign(media, { matches: true });
            media.dispatchEvent(new Event('change'));
        });
        expect(mockEngine.setPlaying).toHaveBeenLastCalledWith(false);
    });

    it('приостанавливает движение вне экрана и возобновляет при возвращении', () => {
        render(<Spoiler>Секрет</Spoiler>);
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

    it('синхронизирует цвет без пересборки геометрии', async () => {
        const { rerender } = render(<Spoiler>Секрет</Spoiler>);
        await flushMutations();
        mockEngine.layout.mockClear();
        mockEngine.syncColor.mockReturnValueOnce(true);
        mockEngine.redraw.mockClear();

        rerender(<Spoiler colors='inverted'>Секрет</Spoiler>);
        await flushMutations();

        expect(mockEngine.redraw).toHaveBeenCalled();
        expect(mockEngine.layout).not.toHaveBeenCalled();
    });

    it.each(['text', 'element'] as const)(
        'в режиме %s движение мыши не меняет облако и не запускает замеры',
        async (mode) => {
            const onOpenChange = jest.fn();
            const { container } = render(
                <Spoiler mode={mode} onOpenChange={onOpenChange}>
                    Секрет
                </Spoiler>,
            );
            await flushMutations();
            const root = screen.getByRole('button');
            const canvas = container.querySelector('canvas')!;
            const bounds = jest.spyOn(canvas, 'getBoundingClientRect');
            jest.clearAllMocks();

            fireEvent.pointerEnter(root);
            fireEvent(
                root,
                Object.assign(new Event('pointermove'), {
                    pointerType: 'mouse',
                    clientX: 150,
                    clientY: 90,
                }),
            );
            fireEvent.pointerLeave(root);
            fireEvent.pointerCancel(root);
            await flushMutations();

            expect(bounds).not.toHaveBeenCalled();
            expect(measureText).not.toHaveBeenCalled();
            Object.values(mockEngine).forEach((method) => expect(method).not.toHaveBeenCalled());
            expect(onOpenChange).not.toHaveBeenCalled();
            expect(root).toHaveAttribute('data-state', 'hidden');
        },
    );

    it('после размонтирования прекращает обработку геометрии и изменений среды', async () => {
        const { unmount } = render(<Spoiler>Секрет</Spoiler>);
        await flushMutations();
        unmount();
        mockEngine.layout.mockClear();
        mockEngine.setPlaying.mockClear();

        act(() =>
            mockResizeCallbacks[0](
                [{ contentRect: { width: 20, height: 20 } } as ResizeObserverEntry],
                {} as ResizeObserver,
            ),
        );
        act(() => media.dispatchEvent(new Event('change')));

        expect(mockEngine.layout).not.toHaveBeenCalled();
        expect(mockEngine.setPlaying).not.toHaveBeenCalled();
        expect(mockEngine.destroy).toHaveBeenCalledTimes(1);
        expect(mockDisconnect).toHaveBeenCalledTimes(1);
    });

    it('при недоступном canvas сохраняет скрытие и раскрытие', () => {
        jest.mocked(HTMLCanvasElement.prototype.getContext).mockReturnValue(null);
        const { container } = render(<Spoiler>Секрет</Spoiler>);
        expect(container.querySelector('[data-spoiler-content]')).toHaveAttribute('inert');
        fireEvent.click(screen.getByRole('button'));
        expect(container.querySelector('[data-spoiler-content]')).not.toHaveAttribute('inert');
        expect(mockEngine.layout).not.toHaveBeenCalled();
    });
});
