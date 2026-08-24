import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import SimpleBarCore from 'simplebar-core';

import { ScrollbarPrivate } from './component';

type Observer = { callback: ResizeObserverCallback; targets: Element[] };

const observers: Observer[] = [];

beforeAll(() => {
    window.ResizeObserver = class MockResizeObserver {
        private readonly entry: Observer;

        constructor(callback: ResizeObserverCallback) {
            this.entry = { callback, targets: [] };
            observers.push(this.entry);
        }

        observe(target: Element) {
            this.entry.targets.push(target);
        }

        unobserve() {}

        disconnect() {
            this.entry.targets.length = 0;
        }
    } as unknown as typeof ResizeObserver;
});

beforeEach(() => {
    observers.length = 0;
});

const flushFrame = () =>
    act(async () => {
        await new Promise((resolve) => {
            requestAnimationFrame(resolve);
        });
    });

describe('ScrollbarPrivate', () => {
    it('should render children', () => {
        const { getByTestId } = render(
            <ScrollbarPrivate style={{ maxHeight: 100 }}>
                <div data-test-id='content-child'>контент</div>
            </ScrollbarPrivate>,
        );

        expect(getByTestId('content-child')).toBeInTheDocument();
    });

    it('should unmount without errors', () => {
        const { unmount } = render(
            <ScrollbarPrivate style={{ maxHeight: 100 }}>
                <div />
            </ScrollbarPrivate>,
        );

        expect(unmount).not.toThrow();
    });

    /*
     * Встроенный в SimpleBar ResizeObserver следит только за корнем и узлом с контентом,
     * чей бокс ограничен высотой корня. Поэтому рост содержимого он не замечает.
     */
    it('should observe children of the content node', () => {
        const { getByTestId } = render(
            <ScrollbarPrivate style={{ maxHeight: 100 }}>
                <div data-test-id='content-child' style={{ height: 50 }} />
            </ScrollbarPrivate>,
        );

        const child = getByTestId('content-child');

        expect(observers.some(({ targets }) => targets.includes(child))).toBe(true);
    });

    it('should recalculate when content child size changes', async () => {
        const recalculateSpy = jest.spyOn(SimpleBarCore.prototype, 'recalculate');

        const { getByTestId } = render(
            <ScrollbarPrivate style={{ maxHeight: 100 }}>
                <div data-test-id='content-child' style={{ height: 50 }} />
            </ScrollbarPrivate>,
        );

        const child = getByTestId('content-child');
        const childObservers = observers.filter(({ targets }) => targets.includes(child));

        expect(childObservers).not.toHaveLength(0);

        recalculateSpy.mockClear();

        act(() => {
            childObservers.forEach(({ callback }) => callback([], {} as ResizeObserver));
        });

        await flushFrame();

        expect(recalculateSpy).toHaveBeenCalled();

        recalculateSpy.mockRestore();
    });

    it('should not observe anything in native mode', () => {
        render(
            <ScrollbarPrivate native={true} style={{ maxHeight: 100 }}>
                <div />
            </ScrollbarPrivate>,
        );

        expect(observers).toHaveLength(0);
    });
});
