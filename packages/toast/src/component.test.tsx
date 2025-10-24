import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { fireEvent, render, renderHook, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover, PopoverProps } from '@alfalab/core-components-popover';
import { act } from 'react-dom/test-utils';
import { ToastDesktop as Toast, ToastDesktopProps as ToastProps } from './desktop';

import { asyncRender } from '@alfalab/core-components-test-utils';
import { useTimer } from './components/base-toast/use-timer';
import { ToastMobile } from './mobile';

type PopoverComponent = {
    render?: ForwardRefRenderFunction<HTMLDivElement, PopoverProps>;
};

describe('Toast', () => {
    jest.useFakeTimers();

    const baseProps = {
        open: true,
        onClose: jest.fn(),
    };

    const getPortalContainer = () => {
        if (document.querySelector('#portalContainer')) {
            return document.querySelector('#portalContainer') as HTMLElement;
        }

        const portalContainer = document.createElement('div');
        portalContainer.setAttribute('id', 'portalContainer');
        document.body.appendChild(portalContainer);
        return portalContainer;
    };

    describe('Snapshots tests', () => {
        it('should match snapshot when open', () => {
            const { baseElement } = render(<Toast {...baseProps}>text</Toast>);

            expect(baseElement).toMatchSnapshot();
        });

        it('should match snapshot when closed', () => {
            const { baseElement } = render(
                <Toast {...baseProps} open={false}>
                    text
                </Toast>,
            );

            expect(baseElement).toMatchSnapshot();
        });

        it('should math snapshot when prop `anchorElement` is passed', async () => {
            const anchorElement = document.createElement('div');
            document.body.appendChild(anchorElement);

            const { baseElement } = await asyncRender(
                <Toast {...baseProps} anchorElement={anchorElement}>
                    text
                </Toast>,
            );

            expect(baseElement).toMatchSnapshot();
        });

        it('should math snapshot when prop `anchorElement` and `useAnchorWidth` is passed', async () => {
            const anchorElement = document.createElement('div');
            anchorElement.style.width = '100px';

            document.body.appendChild(anchorElement);

            const { baseElement } = await asyncRender(
                <Toast {...baseProps} anchorElement={anchorElement} useAnchorWidth={true}>
                    text
                </Toast>,
            );

            expect(baseElement).toMatchSnapshot();
        });
    });

    it('should set `className` class', () => {
        const className = 'test-class';

        render(
            <Toast {...baseProps} className={className} getPortalContainer={getPortalContainer} />,
        );

        expect(getPortalContainer().firstElementChild).toHaveClass(className);
    });

    it('should pass props to Popover', async () => {
        const PopoverComponent = Popover as PopoverComponent;

        const popoverComponentSpy = jest.spyOn(PopoverComponent, 'render');

        const anchorElement = document.createElement('div');
        document.body.appendChild(anchorElement);

        const popoverProps: Partial<PopoverProps> = {
            position: 'top',
            offset: [5, 5],
            open: true,
            getPortalContainer,
            anchorElement,
            /*
             * todo: почему-то preventFlip и transition не прокидываются, хотя указаны в типах пропсов. Нужно либо прокинуть либо убрать из типов
             * preventFlip: false,
             * transition: { timeout: 200 }
             */
        };

        await act(async () => {
            await render(<Toast {...baseProps} anchorElement={anchorElement} {...popoverProps} />);
        });

        expect(popoverComponentSpy).toHaveBeenCalledWith(
            expect.objectContaining(popoverProps),
            null,
        );
    });

    it('should set bottomOffset', () => {
        render(<Toast {...baseProps} bottomOffset={10} getPortalContainer={getPortalContainer} />);

        const toastPlate = getPortalContainer().firstElementChild as HTMLElement;

        expect(toastPlate).toHaveStyle('bottom: 10px');
    });

    it('should forward ref to ToastPlate wrapper', () => {
        const ref = jest.fn();

        render(<Toast {...baseProps} ref={ref} />);

        expect(ref.mock.calls[0][0].tagName).toBe('DIV');
    });

    describe('Callback tests', () => {
        it('should call onClose when click outside', async () => {
            const onClose = jest.fn();
            render(<Toast onClose={onClose} open={true} getPortalContainer={getPortalContainer} />);

            fireEvent.click(getPortalContainer().firstElementChild as HTMLElement);
            expect(onClose).not.toHaveBeenCalled();

            await userEvent.setup({ delay: null }).click(document.body);
            expect(onClose).toHaveBeenCalled();
        });

        it('should not call onClose when click outside', async () => {
            const onClose = jest.fn();
            render(
                <Toast
                    onClose={onClose}
                    open={true}
                    getPortalContainer={getPortalContainer}
                    closeWithClickOutside={false}
                />,
            );

            fireEvent.click(getPortalContainer().firstElementChild as HTMLElement);
            expect(onClose).not.toHaveBeenCalled();

            await userEvent.setup({ delay: null }).click(document.body);
            expect(onClose).not.toHaveBeenCalled();
        });

        it('should call onClose after delay', () => {
            const onClose = jest.fn();
            render(<Toast onClose={onClose} open={true} autoCloseDelay={3000} />);

            jest.advanceTimersByTime(2500);
            expect(onClose).not.toHaveBeenCalled();

            jest.advanceTimersByTime(3500);
            expect(onClose).toHaveBeenCalled();
        });

        it('should not call onClose if mouse is over ToastPlate', async () => {
            const onClose = jest.fn();
            render(
                <Toast
                    onClose={onClose}
                    open={true}
                    autoCloseDelay={3000}
                    getPortalContainer={getPortalContainer}
                />,
            );

            const toastPlate = getPortalContainer().firstElementChild as HTMLElement;

            jest.advanceTimersByTime(2500);
            await userEvent.setup({ delay: null }).hover(toastPlate);
            jest.advanceTimersByTime(5000);

            expect(onClose).not.toHaveBeenCalled();
        });

        it('should call onClose after mouse left ToastPlate', () => {
            const onClose = jest.fn();
            render(
                <Toast
                    onClose={onClose}
                    open={true}
                    autoCloseDelay={3000}
                    getPortalContainer={getPortalContainer}
                />,
            );

            const toastPlate = getPortalContainer().firstElementChild as HTMLElement;

            jest.advanceTimersByTime(2500);
            userEvent.hover(toastPlate);
            userEvent.unhover(toastPlate);
            jest.advanceTimersByTime(5000);

            expect(onClose).toHaveBeenCalled();
        });

        it('should not call onClose if touch ToastPlate', () => {
            const onClose = jest.fn();
            render(
                <ToastMobile
                    onClose={onClose}
                    open={true}
                    autoCloseDelay={3000}
                    getPortalContainer={getPortalContainer}
                />,
            );

            const toastPlate = getPortalContainer().firstElementChild as HTMLElement;

            jest.advanceTimersByTime(2500);
            fireEvent.touchStart(toastPlate);
            jest.advanceTimersByTime(5000);

            expect(onClose).not.toHaveBeenCalled();
        });

        it('should render custom toast plate', async () => {
            const dataTestId = 'testId';
            const onClose = jest.fn();

            const CustomToastPlate: ToastProps['ToastPlate'] = forwardRef((_, ref: any) => (
                <div ref={ref} data-test-id={dataTestId} />
            ));

            const { getByTestId } = render(
                <Toast
                    onClose={onClose}
                    open={true}
                    autoCloseDelay={3000}
                    getPortalContainer={getPortalContainer}
                    ToastPlate={CustomToastPlate}
                />,
            );

            await waitFor(() => expect(getByTestId(dataTestId)).toBeInTheDocument());
        });
    });

    /**
     * Кейсы
     * 1. Таймер срабатывает после истечения delay;
     * 2. stop() предотвращает срабатывание;
     * 3. start() перезапускает таймер;
     * 4. Таймер очищается при размонтировании.
     */
    describe('useTimer', () => {
        const onTimeout = jest.fn();

        beforeEach(() => {
            jest.clearAllMocks();
            jest.clearAllTimers();
        });

        it('should start timer when open', () => {
            const { rerender } = renderHook(
                ({ open }) =>
                    useTimer({
                        open,
                        delay: 3000,
                        onTimeout,
                    }),
                { initialProps: { open: false } },
            );

            expect(onTimeout).not.toHaveBeenCalled();

            rerender({ open: true });

            act(() => {
                jest.advanceTimersByTime(3000);
            });

            expect(onTimeout).toHaveBeenCalledTimes(1);
        });

        it('should clear timer when call stop', () => {
            const { result } = renderHook(() =>
                useTimer({
                    open: true,
                    delay: 5000,
                    onTimeout,
                }),
            );

            act(() => {
                result.current.stop();
                jest.advanceTimersByTime(5000);
            });

            expect(onTimeout).not.toHaveBeenCalled();
        });

        it('should restart timer when call start', () => {
            const { result } = renderHook(() =>
                useTimer({
                    open: true,
                    delay: 2000,
                    onTimeout,
                }),
            );

            act(() => {
                result.current.start();
                jest.advanceTimersByTime(2000);
            });

            expect(onTimeout).toHaveBeenCalledTimes(1);
        });

        it('should clear timer when unmount', () => {
            const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

            const { unmount } = renderHook(() =>
                useTimer({
                    open: true,
                    delay: 3000,
                    onTimeout,
                }),
            );

            unmount();

            expect(clearTimeoutSpy).toHaveBeenCalled();
        });
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<Toast {...baseProps} />);

        expect(unmount).not.toThrow();
    });
});
