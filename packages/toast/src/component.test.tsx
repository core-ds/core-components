import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as popoverModule from '@alfalab/core-components-popover';
import { act } from 'react-dom/test-utils';
import { ToastDesktop as Toast, ToastDesktopProps as ToastProps } from './desktop';

import { asyncRender } from '../../utils/test-utils';

type PopoverComponent = {
    render?: ForwardRefRenderFunction<HTMLDivElement, popoverModule.PopoverProps>;
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
        const PopoverComponent = popoverModule.Popover as PopoverComponent;

        const popoverComponentSpy = jest.spyOn(PopoverComponent, 'render');

        const anchorElement = document.createElement('div');
        document.body.appendChild(anchorElement);

        const popoverProps: Partial<ToastProps> = {
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

        const popoverLastCall =
            popoverComponentSpy.mock.calls[popoverComponentSpy.mock.calls.length - 1];

        expect(popoverLastCall[0]).toMatchObject(popoverProps);
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
            expect(onClose).not.toBeCalled();

            await userEvent.setup({ delay: null }).click(document.body);
            expect(onClose).toBeCalled();
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
            expect(onClose).not.toBeCalled();

            await userEvent.setup({ delay: null }).click(document.body);
            expect(onClose).not.toBeCalled();
        });

        it('should call onClose after delay', () => {
            const onClose = jest.fn();
            render(<Toast onClose={onClose} open={true} autoCloseDelay={3000} />);

            jest.advanceTimersByTime(2500);
            expect(onClose).not.toBeCalled();

            jest.advanceTimersByTime(3500);
            expect(onClose).toBeCalled();
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

            expect(onClose).not.toBeCalled();
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

            expect(onClose).toBeCalled();
        });

        it('should not call onClose if touch ToastPlate', () => {
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
            fireEvent.touchStart(toastPlate);
            jest.advanceTimersByTime(5000);

            expect(onClose).not.toBeCalled();
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

    it('should unmount without errors', () => {
        const { unmount } = render(<Toast {...baseProps} />);

        expect(unmount).not.toThrowError();
    });
});
