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
    setPointer: jest.fn(),
    clearPointer: jest.fn(),
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
        expect(mockEngine.layout).toHaveBeenLastCalledWith(
            [{ x: 0, y: 0, width: 240, height: 144 }],
            expect.objectContaining({ width: 240, height: 144 }),
        );
        expect(measureText).not.toHaveBeenCalled();
    });

    it('обновляет форму элемента при смене скруглений без изменения размера', async () => {
        const { rerender } = render(<Spoiler mode='element'>Секрет</Spoiler>);
        act(() =>
            mockResizeCallbacks[0](
                [{ contentRect: { width: 150, height: 150 } } as ResizeObserverEntry],
                {} as ResizeObserver,
            ),
        );
        mockEngine.layout.mockClear();

        rerender(
            <Spoiler
                mode='element'
                style={{
                    borderTopLeftRadius: '50%',
                    borderTopRightRadius: '50%',
                    borderBottomRightRadius: '50%',
                    borderBottomLeftRadius: '50%',
                }}
            >
                Секрет
            </Spoiler>,
        );
        await flushMutations();

        expect(mockEngine.layout).toHaveBeenLastCalledWith(
            [{ x: 0, y: 0, width: 150, height: 150 }],
            expect.objectContaining({
                corners: Array(4).fill(
                    expect.objectContaining({
                        x: 75,
                        y: 75,
                        radiusX: 75,
                        radiusY: 75,
                    }),
                ),
            }),
        );
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
        'в режиме %s передаёт движение мыши без пересборки облака и раскрытия содержимого',
        async (mode) => {
            const onOpenChange = jest.fn();
            render(
                <Spoiler mode={mode} onOpenChange={onOpenChange}>
                    Секрет
                </Spoiler>,
            );
            await flushMutations();
            const root = screen.getByRole('button').closest('[data-state]')!;
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

            expect(mockEngine.setPointer).toHaveBeenCalledWith(150, 90);
            expect(mockEngine.clearPointer).toHaveBeenCalledTimes(2);
            expect(measureText).not.toHaveBeenCalled();
            expect(mockEngine.layout).not.toHaveBeenCalled();
            expect(mockEngine.configure).not.toHaveBeenCalled();
            expect(mockEngine.setOpen).not.toHaveBeenCalled();
            expect(onOpenChange).not.toHaveBeenCalled();
            expect(root).toHaveAttribute('data-state', 'hidden');
        },
    );

    it('не реагирует на touch и очищает наведение при прокрутке и потере фокуса окна', () => {
        render(<Spoiler>Секрет</Spoiler>);
        const root = screen.getByRole('button').closest('[data-state]')!;

        fireEvent(root, Object.assign(new Event('pointermove'), { pointerType: 'touch' }));
        expect(mockEngine.setPointer).not.toHaveBeenCalled();
        fireEvent.scroll(document);
        fireEvent.blur(window);
        expect(mockEngine.clearPointer).toHaveBeenCalledTimes(2);
    });

    it.each(['text', 'element'] as const)(
        'в режиме %s interactiveParticles=false отключает только hover, сохраняя движение и раскрытие',
        async (mode) => {
            render(
                <Spoiler mode={mode} interactiveParticles={false}>
                    Секрет
                </Spoiler>,
            );
            await flushMutations();
            const root = screen.getByRole('button').closest('[data-state]')!;

            expect(mockEngine.setPlaying).toHaveBeenLastCalledWith(true);
            expect(root).not.toHaveAttribute('interactiveparticles');
            mockEngine.layout.mockClear();
            fireEvent(
                root,
                Object.assign(new Event('pointermove'), {
                    pointerType: 'mouse',
                    clientX: 150,
                    clientY: 90,
                }),
            );
            fireEvent.pointerLeave(root);
            fireEvent.scroll(document);
            expect(mockEngine.setPointer).not.toHaveBeenCalled();
            expect(mockEngine.clearPointer).not.toHaveBeenCalled();
            expect(mockEngine.layout).not.toHaveBeenCalled();

            fireEvent.click(root);
            expect(root).toHaveAttribute('data-state', 'revealed');
            expect(mockEngine.setOpen).toHaveBeenLastCalledWith(true);
        },
    );

    it.each(['text', 'element'] as const)(
        'в режиме %s включает и отключает hover без пересоздания частиц и сброса состояния',
        async (mode) => {
            const { rerender } = render(<Spoiler mode={mode}>Секрет</Spoiler>);
            await flushMutations();
            const root = screen.getByRole('button').closest('[data-state]')!;
            const movePointer = () =>
                fireEvent(
                    root,
                    Object.assign(new Event('pointermove'), {
                        pointerType: 'mouse',
                        clientX: 150,
                        clientY: 90,
                    }),
                );
            movePointer();
            expect(mockEngine.setPointer).toHaveBeenCalledWith(150, 90);
            jest.clearAllMocks();

            rerender(
                <Spoiler mode={mode} interactiveParticles={false}>
                    Секрет
                </Spoiler>,
            );
            await flushMutations();
            expect(mockEngine.clearPointer).toHaveBeenCalledTimes(1);
            movePointer();
            expect(mockEngine.setPointer).not.toHaveBeenCalled();

            rerender(
                <Spoiler mode={mode} interactiveParticles>
                    Секрет
                </Spoiler>,
            );
            await flushMutations();
            movePointer();
            expect(mockEngine.setPointer).toHaveBeenCalledTimes(1);
            expect(mockEngine.layout).not.toHaveBeenCalled();
            expect(measureText).not.toHaveBeenCalled();
            expect(mockEngine.destroy).not.toHaveBeenCalled();
            expect(mockEngine.setOpen).not.toHaveBeenCalled();
            expect(mockEngine.setPlaying).not.toHaveBeenCalled();
            expect(root).toHaveAttribute('data-state', 'hidden');
        },
    );

    it('после размонтирования прекращает обработку геометрии и изменений среды', async () => {
        const { unmount } = render(<Spoiler>Секрет</Spoiler>);
        const root = screen.getByRole('button').closest('[data-state]')!;
        await flushMutations();
        unmount();
        mockEngine.layout.mockClear();
        mockEngine.setPlaying.mockClear();
        mockEngine.clearPointer.mockClear();

        act(() =>
            mockResizeCallbacks[0](
                [{ contentRect: { width: 20, height: 20 } } as ResizeObserverEntry],
                {} as ResizeObserver,
            ),
        );
        act(() => media.dispatchEvent(new Event('change')));
        fireEvent(root, Object.assign(new Event('pointermove'), { pointerType: 'mouse' }));
        fireEvent.pointerLeave(root);
        fireEvent.blur(window);
        fireEvent.scroll(document);

        expect(mockEngine.layout).not.toHaveBeenCalled();
        expect(mockEngine.setPlaying).not.toHaveBeenCalled();
        expect(mockEngine.destroy).toHaveBeenCalledTimes(1);
        expect(mockDisconnect).toHaveBeenCalledTimes(1);
        expect(mockEngine.setPointer).not.toHaveBeenCalled();
        expect(mockEngine.clearPointer).not.toHaveBeenCalled();
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
