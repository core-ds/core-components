import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { ToastPlateDesktop as ToastPlate } from './desktop';
import { getBaseToastPlateTestIds } from './components/base-toast-plate/utils/getBaseToastPlateTestIds';

jest.useFakeTimers();

const dataTestId = 'test-id';

describe('Notification', () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    describe('Snapshots tests', () => {
        it('should match snapshot', () => {
            const { baseElement } = render(
                <ToastPlate badge='positive-checkmark' title='title' dataTestId={dataTestId}>
                    text
                </ToastPlate>,
            );

            expect(baseElement).toMatchSnapshot();
        });

        it('should match snapshot with leftAddons', () => {
            const { baseElement } = render(<ToastPlate leftAddons={<div>leftAddons</div>} />);

            expect(baseElement).toMatchSnapshot();
        });

        it('should match snapshot without icon', () => {
            const { baseElement } = render(<ToastPlate title='title'>text</ToastPlate>);

            expect(baseElement).toMatchSnapshot();
        });
    });

    it('should set `data-test-id` attribute', () => {
        const testIds = getBaseToastPlateTestIds(dataTestId);
        const { getByTestId } = render(<ToastPlate dataTestId={dataTestId} />);

        expect(getByTestId(testIds.component)).toBeInTheDocument();
        expect(getByTestId(testIds.component).tagName).toBe('DIV');
    });

    it('should forward ref', () => {
        const ref = jest.fn();
        const testIds = getBaseToastPlateTestIds(dataTestId);
        const { getByTestId } = render(<ToastPlate ref={ref} dataTestId={dataTestId} />);

        expect(ref.mock.calls).toEqual([[getByTestId(testIds.component)]]);
    });

    describe('Classes tests', () => {
        it('should set `className` class', () => {
            const className = 'test-class';
            const testIds = getBaseToastPlateTestIds(dataTestId);
            const { getByTestId } = render(
                <ToastPlate className={className} dataTestId={dataTestId} />,
            );

            const el = getByTestId(testIds.component);

            expect(el).toHaveClass(className);
        });

        it('should set `hasCloser` class', () => {
            const testIds = getBaseToastPlateTestIds(dataTestId);
            const { getByTestId } = render(
                <ToastPlate hasCloser={true} dataTestId={dataTestId} onClose={jest.fn()} />,
            );

            const el = getByTestId(testIds.component);

            expect(el).toHaveClass('hasCloser');
        });
    });

    describe('Callbacks tests', () => {
        it('should call `onClose` prop', async () => {
            const cb = jest.fn();
            const testIds = getBaseToastPlateTestIds(dataTestId);
            const { getByTestId } = render(
                <ToastPlate hasCloser={true} onClose={cb} dataTestId={dataTestId} />,
            );

            const el = getByTestId(testIds.component);
            const closeEl = el.querySelector('[aria-label="закрыть"]') as Element;

            fireEvent.click(closeEl);

            expect(cb).toHaveBeenCalledTimes(1);
        });
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<ToastPlate />);

        expect(unmount).not.toThrow();
    });
});
