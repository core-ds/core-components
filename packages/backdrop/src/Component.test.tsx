import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { act } from 'react-dom/test-utils';
import { Backdrop } from './Component';

jest.useFakeTimers();

describe('Backdrop', () => {
    const waitForTransition = () =>
        act(() => {
            jest.advanceTimersByTime(300);
        });

    it('should set `data-test-id` attribute', () => {
        const dataTestId = 'test-id';
        const { queryByTestId } = render(<Backdrop open={true} dataTestId={dataTestId} />);

        expect(queryByTestId(dataTestId)).toBeInTheDocument();
    });

    it('should match snapshot', async () => {
        const { queryByTestId, rerender } = render(
            <Backdrop open={true} dataTestId='Backdrop'>
                <span>children</span>
            </Backdrop>,
        );

        // appear
        expect(queryByTestId('Backdrop')).toMatchSnapshot();

        // appear done
        waitForTransition();

        expect(queryByTestId('Backdrop')).toMatchSnapshot();

        // close
        rerender(
            <Backdrop open={false} dataTestId='Backdrop'>
                <span>children</span>
            </Backdrop>,
        );

        // exit
        expect(queryByTestId('Backdrop')).toMatchSnapshot();

        // exit done, unmount
        waitForTransition();

        expect(queryByTestId('Backdrop')).toMatchSnapshot();
    });

    it('should use custom classes', async () => {
        const classNames = {
            appear: 'my-appear',
            appearActive: 'my-active-appear',
            appearDone: 'my-done-appear',
            enter: 'my-enter',
            enterActive: 'my-active-enter',
            enterDone: 'my-done-enter',
            exit: 'my-exit',
            exitActive: 'my-active-exit',
            exitDone: 'my-done-exit',
        };

        const { queryByTestId, rerender } = render(
            <Backdrop
                open={true}
                unmountOnExit={false}
                transitionClassNames={classNames}
                dataTestId='Backdrop'
            />,
        );

        // appear
        expect(queryByTestId('Backdrop')).toHaveClass(classNames.appear, classNames.appearActive);

        // appear done
        waitForTransition();

        expect(queryByTestId('Backdrop')).toHaveClass(classNames.appearDone, classNames.enterDone);

        // close
        rerender(
            <Backdrop
                open={false}
                unmountOnExit={false}
                transitionClassNames={classNames}
                dataTestId='Backdrop'
            />,
        );

        // exit
        expect(queryByTestId('Backdrop')).toHaveClass(classNames.exit, classNames.exitActive);

        // exit done
        waitForTransition();

        expect(queryByTestId('Backdrop')).toHaveClass(classNames.exitDone);

        // reopen
        rerender(
            <Backdrop
                open={true}
                unmountOnExit={false}
                transitionClassNames={classNames}
                dataTestId='Backdrop'
            />,
        );

        // enter
        expect(queryByTestId('Backdrop')).toHaveClass(classNames.enter, classNames.enterActive);

        // enter done
        waitForTransition();

        expect(queryByTestId('Backdrop')).toHaveClass(classNames.enterDone);
    });

    it('should call `onClick` prop', () => {
        const cb = jest.fn();
        const dataTestId = 'test-id';
        const { getByTestId } = render(
            <Backdrop open={true} onClick={cb} dataTestId={dataTestId} />,
        );

        fireEvent.click(getByTestId(dataTestId));

        expect(cb).toHaveBeenCalledTimes(1);
    });

    it('should set `transparent` class', () => {
        const dataTestId = 'test-id';
        const { getByTestId } = render(
            <Backdrop open={true} transparent={true} dataTestId={dataTestId} />,
        );

        expect(getByTestId(dataTestId)).toHaveClass('transparent');
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<Backdrop open={true} />);

        expect(unmount).not.toThrow();
    });
});
