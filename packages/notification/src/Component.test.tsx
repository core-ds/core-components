import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ButtonDesktop as Button } from '@alfalab/core-components-button/desktop';

import { Notification } from './index';
import { getNotificationTestIds } from './utils/getNotificationTestIds';

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
        const onClose = jest.fn();

        it('should match snapshot', () => {
            const { baseElement } = render(
                <Notification
                    dataTestId={dataTestId}
                    badge='positive-checkmark'
                    title='title'
                    onClose={onClose}
                >
                    text
                </Notification>,
            );

            expect(baseElement).toMatchSnapshot();
        });
    });

    it('should set `data-test-id` attribute', () => {
        const testIds = getNotificationTestIds(dataTestId);
        const { getByTestId } = render(<Notification dataTestId={dataTestId} />);

        expect(getByTestId(testIds.component)).toBeInTheDocument();
        expect(getByTestId(testIds.component).tagName).toBe('DIV');
    });

    it('should forward ref', () => {
        const ref = jest.fn();
        const testIds = getNotificationTestIds(dataTestId);
        const { getByTestId } = render(<Notification ref={ref} dataTestId={dataTestId} />);

        expect(ref.mock.calls).toEqual([[getByTestId(testIds.component)]]);
    });

    describe('Classes tests', () => {
        it('should set `className` class', () => {
            const className = 'test-class';
            const testIds = getNotificationTestIds(dataTestId);
            const { getByTestId } = render(
                <Notification className={className} dataTestId={dataTestId} />,
            );

            const el = getByTestId(testIds.component);

            expect(el).toHaveClass(className);
        });

        it('should set `visible` class', () => {
            const testIds = getNotificationTestIds(dataTestId);
            const { getByTestId } = render(<Notification visible={true} dataTestId={dataTestId} />);

            const el = getByTestId(testIds.component);

            expect(el).toHaveClass('isVisible');
        });
    });

    describe('Callbacks tests', () => {
        it('should call `onClose` prop', async () => {
            const cb = jest.fn();
            const testIds = getNotificationTestIds(dataTestId);
            const { getByTestId } = render(
                <Notification hasCloser={true} onClose={cb} dataTestId={dataTestId} />,
            );

            const el = getByTestId(testIds.component);
            const closeEl = el.querySelector('[aria-label="закрыть"]') as Element;

            fireEvent.click(closeEl);

            expect(cb).toHaveBeenCalledTimes(1);
        });

        it('should call `onCloseTimeout` prop', async () => {
            const cb = jest.fn();
            const testIds = getNotificationTestIds(dataTestId);
            const { getByTestId } = render(
                <Notification
                    autoCloseDelay={100}
                    onCloseTimeout={cb}
                    visible={true}
                    dataTestId={dataTestId}
                />,
            );

            const el = getByTestId(testIds.component);

            fireEvent.mouseEnter(el);
            fireEvent.mouseLeave(el);

            jest.advanceTimersByTime(100);

            expect(cb).toHaveBeenCalledTimes(1);
        });

        it('should call `onMouseEnter` prop', async () => {
            const cb = jest.fn();
            const testIds = getNotificationTestIds(dataTestId);
            const { getByTestId } = render(
                <Notification onMouseEnter={cb} dataTestId={dataTestId} />,
            );

            const el = getByTestId(testIds.component);

            fireEvent.mouseEnter(el);

            expect(cb).toHaveBeenCalledTimes(1);
        });

        it('should call `onMouseLeave` prop', async () => {
            const cb = jest.fn();
            const testIds = getNotificationTestIds(dataTestId);
            const { getByTestId } = render(
                <Notification onMouseLeave={cb} dataTestId={dataTestId} />,
            );

            const el = getByTestId(testIds.component);

            fireEvent.mouseLeave(el);

            expect(cb).toHaveBeenCalledTimes(1);
        });

        it('should call `onClickOutside` prop', async () => {
            const cb = jest.fn();
            const dataTestId = 'btn-test-id';
            const { getByTestId } = render(
                <div>
                    <Button dataTestId={dataTestId}>btn</Button>
                    <Notification onClickOutside={cb} visible={true} />
                </div>,
            );

            const el = getByTestId(dataTestId);

            fireEvent.click(el);

            expect(cb).toHaveBeenCalledTimes(1);
        });

        it('should not call `onClickOutside` if clicked inside', async () => {
            const cb = jest.fn();
            const testIds = getNotificationTestIds(dataTestId);
            const { getByTestId } = render(
                <Notification onClickOutside={cb} visible={true} dataTestId={dataTestId} />,
            );

            const el = getByTestId(testIds.component);

            fireEvent.click(el);
            fireEvent.click(el.firstElementChild as HTMLElement);

            expect(cb).toHaveBeenCalledTimes(0);
        });

        it('should not call `onClickOutside` if clicked inside another', async () => {
            const cb = jest.fn();
            const testIds = getNotificationTestIds(dataTestId);
            const { getByTestId } = render(
                <div>
                    <Notification visible={true} dataTestId={dataTestId} />
                    <Notification onClickOutside={cb} visible={true} />
                </div>,
            );

            const el = getByTestId(testIds.component);

            fireEvent.click(el);
            fireEvent.click(el.firstElementChild as HTMLElement);

            expect(cb).toHaveBeenCalledTimes(0);
        });
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<Notification />);

        expect(unmount).not.toThrow();
    });
});
