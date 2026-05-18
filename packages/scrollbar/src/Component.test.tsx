import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { Scrollbar, ScrollbarProps } from './index';

const scrollableDataTestId = 'scrollable-node';
const scrollableNodeProps = { 'data-test-id': scrollableDataTestId };

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
});
