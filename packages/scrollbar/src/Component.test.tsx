import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { Scrollbar, ScrollbarProps } from './index';
import SimpleBar from './simplebar/simplebar';

const scrollableDataTestId = 'scrollable-node';
const scrollableNodeProps = { 'data-test-id': scrollableDataTestId };
const resizeObserverCallbacks: ResizeObserverCallback[] = [];

jest.mock('@juggle/resize-observer', () => ({
    ResizeObserver: class MockResizeObserver {
        constructor(callback: ResizeObserverCallback) {
            resizeObserverCallbacks.push(callback);
        }

        observe() {}

        unobserve() {}

        disconnect() {}
    },
}));

beforeAll(() => {
    global.ResizeObserver = class MockResizeObserver {
        constructor(callback: ResizeObserverCallback) {
            resizeObserverCallbacks.push(callback);
        }

        observe() {}

        unobserve() {}

        disconnect() {}
    } as typeof ResizeObserver;
});

const renderScrollbar = (props?: ScrollbarProps) => (
    <Scrollbar
        {...props}
        style={{ height: 200 }}
        scrollableNodeProps={{ ...props?.scrollableNodeProps, ...scrollableNodeProps }}
    >
        <div style={{ height: 500 }} />
    </Scrollbar>
);

describe('Scrollbar', () => {
    describe('Display tests', () => {
        it('should display correctly', () => {
            const { container } = render(renderScrollbar({ autoHide: false }));

            expect(container).toMatchSnapshot();
        });

        it('should visible x and y track', async () => {
            const { getByTestId } = render(renderScrollbar({ forceVisible: true }));

            const { style } = getByTestId(scrollableDataTestId);

            expect(style.overflowX).toBe('scroll');
            expect(style.overflowY).toBe('scroll');
        });
    });

    describe('Callbacks tests', () => {
        it('should call onScroll', async () => {
            const onScroll = jest.fn();

            const { getByTestId } = render(renderScrollbar({ scrollableNodeProps: { onScroll } }));

            fireEvent.scroll(getByTestId(scrollableDataTestId));

            expect(onScroll).toHaveBeenCalledTimes(1);
        });
    });

    describe('Render tests', () => {
        it('should unmount without errors', () => {
            const { unmount } = render(renderScrollbar());

            expect(unmount).not.toThrow();
        });
    });

    describe('Recalculate tests', () => {
        it('should recalculate when content child size changes', () => {
            const recalculateSpy = jest.spyOn(SimpleBar.prototype, 'recalculate');

            jest.useFakeTimers();

            render(
                <Scrollbar style={{ maxHeight: 100 }} scrollableNodeProps={scrollableNodeProps}>
                    <div data-test-id='content-child' style={{ height: 50 }} />
                </Scrollbar>,
            );

            recalculateSpy.mockClear();

            act(() => {
                resizeObserverCallbacks.forEach((callback) => {
                    callback([], {} as ResizeObserver);
                });
                jest.advanceTimersByTime(100);
            });

            expect(recalculateSpy).toHaveBeenCalled();

            recalculateSpy.mockRestore();
            jest.useRealTimers();
        });
    });
});
