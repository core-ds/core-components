import React, { useState, forwardRef } from 'react';
import { fireEvent, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

import { act } from 'react-dom/test-utils';
import { BottomSheet, BottomSheetProps, CLOSE_OFFSET, HEADER_OFFSET } from '.';
import { convertPercentToNumber } from './utils';
import { getBottomSheetTestIds } from './utils';

jest.useFakeTimers();

const BottomSheetWrapper = forwardRef<HTMLDivElement, Partial<BottomSheetProps>>((props, ref) => {
    const [open, setOpen] = useState(props.open === undefined ? true : props.open);

    const handleClose = () => {
        setOpen(false);

        if (props.onClose) {
            props.onClose();
        }
    };

    return (
        <BottomSheet
            open={open}
            onClose={handleClose}
            ref={ref}
            title='Bottom sheet title'
            {...props}
        >
            {props.children || <div>Bottom sheet content</div>}
        </BottomSheet>
    );
});

const dataTestId = 'test-id';

let getBoundingClientRect: () => DOMRect;

const mockGetBoundingClientRect = (height: number) => {
    if (!getBoundingClientRect) {
        getBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
    }

    HTMLElement.prototype.getBoundingClientRect = () => ({
        height,
        width: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        x: 0,
        y: 0,
        toJSON: () => '',
    });
};

const clearGetBoundingClientRect = () => {
    HTMLElement.prototype.getBoundingClientRect = getBoundingClientRect;
};

describe('Bottom sheet', () => {
    beforeAll(() => {
        mockGetBoundingClientRect(100);
    });

    afterAll(() => {
        clearGetBoundingClientRect();
    });

    describe('Snapshots tests', () => {
        it('should match snapshot', () => {
            const { baseElement } = render(<BottomSheetWrapper />);

            expect(baseElement).toMatchSnapshot();
        });

        it('should match snapshot with action button', () => {
            const { baseElement } = render(<BottomSheetWrapper actionButton={<div />} />);

            expect(baseElement).toMatchSnapshot();
        });
    });

    describe('Utils tests', () => {
        test('convertPercentToNumber', () => {
            expect(convertPercentToNumber(0, 600)).toBe(0);
            expect(convertPercentToNumber(200, 600)).toBe(200);
            expect(convertPercentToNumber(-100, 600)).toBe(500);
            expect(convertPercentToNumber('10%', 600)).toBe(600 * 0.1);
            expect(convertPercentToNumber('100%', 600)).toBe(600 - HEADER_OFFSET);
            expect(convertPercentToNumber('-20%', 600)).toBe(600 - 600 * 0.2);
        });
    });

    describe('Props tests', () => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });

        it('should have data-test-id', () => {
            const dti = 'bottom-sheet-dti';
            const { getByTestId } = render(
                <BottomSheetWrapper
                    actionButton={<div />}
                    hasCloser={true}
                    hasBacker={true}
                    dataTestId={dti}
                />,
            );

            const testIds = getBottomSheetTestIds(dti);

            expect(getByTestId(testIds.bottomSheet)).toBeInTheDocument();
            expect(getByTestId(testIds.content)).toBeInTheDocument();
            expect(getByTestId(testIds.footer)).toBeInTheDocument();
            expect(getByTestId(testIds.header)).toBeInTheDocument();
            expect(getByTestId(testIds.title)).toBeInTheDocument();
            expect(getByTestId(testIds.closer)).toBeInTheDocument();
            expect(getByTestId(testIds.backButton)).toBeInTheDocument();
            expect(getByTestId(testIds.bottomSheet).getAttribute('role')).toBe('dialog');
        });

        it('should forward ref', () => {
            const ref = jest.fn();

            const { getByTestId } = render(
                <BottomSheetWrapper dataTestId={dataTestId} ref={ref} />,
            );

            expect(ref.mock.calls[0]).toEqual([getByTestId(dataTestId)]);
        });

        it('should render content', () => {
            const text = 'BottomSheet';

            const { getByText } = render(<BottomSheetWrapper>{text}</BottomSheetWrapper>);

            expect(getByText(text)).toBeInTheDocument();
        });

        it('should be open, if open is `true`', () => {
            const text = 'BottomSheet';

            const { queryByText } = render(<BottomSheetWrapper>{text}</BottomSheetWrapper>);

            expect(queryByText(text)).toBeInTheDocument();
        });

        it('should be closed, if open is `false`', () => {
            const text = 'BottomSheet';

            const { queryByText } = render(
                <BottomSheetWrapper open={false}>{text}</BottomSheetWrapper>,
            );

            expect(queryByText(text)).not.toBeInTheDocument();
        });

        it('should render title', () => {
            const title = 'Title';

            const { getByText } = render(<BottomSheetWrapper title={title} />);

            expect(getByText(title)).toBeInTheDocument();
        });

        it('should render action button', () => {
            const { getByTestId } = render(
                <BottomSheetWrapper actionButton={<div data-test-id={dataTestId} />} />,
            );

            expect(getByTestId(dataTestId)).toBeInTheDocument();
        });

        it('should set className', () => {
            const className = 'class-name-1';

            render(<BottomSheetWrapper className={className} />);

            expect(document.body.querySelector(`.${className}`)).toBeInTheDocument();
        });

        it('should set contentClassName', () => {
            const className = 'class-name-2';

            render(<BottomSheetWrapper contentClassName={className} />);

            expect(document.body.querySelector(`.${className}`)).toBeInTheDocument();
        });

        it('should set headerClassName', () => {
            const className = 'class-name-3';

            render(<BottomSheetWrapper headerClassName={className} />);

            expect(document.body.querySelector(`.${className}`)).toBeInTheDocument();
        });

        it('should set z-index', () => {
            const zIndex = 9999;

            const { getByTestId } = render(
                <BottomSheetWrapper dataTestId={dataTestId} zIndex={zIndex} />,
            );

            const component = getByTestId(dataTestId);

            expect(+getComputedStyle(component).zIndex).toBe(zIndex);
        });

        it('should be blocked scroll', () => {
            const containerTestId = 'container-id';

            const { getByTestId } = render(
                <BottomSheetWrapper
                    scrollLocked={true}
                    containerProps={{ 'data-test-id': containerTestId } as any}
                />,
            );

            const container = getByTestId(containerTestId);

            expect(container).toHaveClass('scrollLocked');
        });

        it('should be hidden scrollbar', () => {
            const containerTestId = 'container-id';

            const { getByTestId } = render(
                <BottomSheetWrapper
                    hideScrollbar={true}
                    containerProps={{ 'data-test-id': containerTestId } as any}
                />,
            );

            const container = getByTestId(containerTestId);

            expect(container).toHaveClass('hiddenScrollbar');
        });

        it('should set back button props', () => {
            const backButtonProps = {
                className: 'back-button',
                'data-test-id': 'back-button-id',
                text: 'Back',
            };

            const { getByTestId, getByText } = render(
                <BottomSheetWrapper backButtonProps={backButtonProps} hasBacker={true} />,
            );

            expect(getByTestId(backButtonProps['data-test-id'])).toBeInTheDocument();
            expect(getByText(backButtonProps.text)).toBeInTheDocument();
            expect(getByTestId(backButtonProps['data-test-id'])).toHaveClass(
                backButtonProps.className,
            );
        });
    });

    describe('Interactions tests', () => {
        it('should close on dialog click', async () => {
            const { getByTestId, queryByTestId } = render(
                <BottomSheetWrapper dataTestId={dataTestId} />,
            );

            fireEvent.mouseDown(getByTestId(dataTestId));
            fireEvent.mouseUp(getByTestId(dataTestId));

            await waitForElementToBeRemoved(() => getByTestId(dataTestId));

            expect(queryByTestId(dataTestId)).not.toBeInTheDocument();
        });

        it('should not close on dialog content click', async () => {
            const { getByTestId, queryByTestId } = render(
                <BottomSheetWrapper dataTestId={dataTestId} />,
            );

            const content = getByTestId(dataTestId).firstElementChild as HTMLElement;

            if (content) {
                fireEvent.mouseDown(content);
                fireEvent.mouseUp(content);
            }

            act(() => {
                jest.advanceTimersByTime(1000);
            });

            expect(queryByTestId(dataTestId)).toBeInTheDocument();
        });

        it('should swiping on touchmove', async () => {
            const className = 'className';

            const onEntered = jest.fn();

            render(
                <BottomSheetWrapper
                    dataTestId={dataTestId}
                    className={className}
                    transitionProps={{
                        timeout: 0,
                        onEntered,
                    }}
                />,
            );

            await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(1));

            const swipeableBottomSheet = document.querySelector(`.${className}`) as HTMLElement;

            const { top, left } = swipeableBottomSheet.getBoundingClientRect();

            const initial = { x: left + 10, y: top + 10 };

            let swipeDelta = 20;

            fireEvent.touchStart(swipeableBottomSheet, {
                touches: [{ clientX: initial.x, clientY: initial.y }],
            });
            fireEvent.touchMove(swipeableBottomSheet, {
                touches: [{ clientX: initial.x, clientY: initial.y + swipeDelta }],
            });

            expect(getComputedStyle(swipeableBottomSheet).transform).toBe(
                `translateY(${swipeDelta}px)`,
            );

            swipeDelta = 40;

            fireEvent.touchMove(swipeableBottomSheet, {
                touches: [{ clientX: initial.x, clientY: initial.y + swipeDelta }],
            });

            expect(getComputedStyle(swipeableBottomSheet).transform).toBe(
                `translateY(${swipeDelta}px)`,
            );
        });

        it('should return up, if swiped less then default closeOffset', async () => {
            const className = 'className';

            const onEntered = jest.fn();
            const onExited = jest.fn();

            render(
                <BottomSheetWrapper
                    dataTestId={dataTestId}
                    className={className}
                    transitionProps={{
                        timeout: 0,
                        onEntered,
                        onExited,
                    }}
                />,
            );

            await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(1));

            const swipeableBottomSheet = document.querySelector(`.${className}`) as HTMLElement;

            const { top, left, height } = swipeableBottomSheet.getBoundingClientRect();

            const initial = { x: left + 10, y: top + 10 };

            const swipeDelta = height * CLOSE_OFFSET - 20;

            fireEvent.touchStart(swipeableBottomSheet, {
                touches: [{ clientX: initial.x, clientY: initial.y }],
            });

            fireEvent.touchMove(swipeableBottomSheet, {
                touches: [{ clientX: initial.x, clientY: initial.y + swipeDelta }],
            });

            fireEvent.touchEnd(swipeableBottomSheet);

            expect(onExited).not.toHaveBeenCalled();
            expect(getComputedStyle(swipeableBottomSheet).transform).toBe('');
        });

        it('should close, if swiped more then default closeOffset', async () => {
            const className = 'className';

            const onEntered = jest.fn();
            const onExited = jest.fn();

            const { queryByTestId } = render(
                <BottomSheetWrapper
                    dataTestId={dataTestId}
                    className={className}
                    transitionProps={{
                        timeout: 0,
                        onEntered,
                        onExited,
                    }}
                />,
            );

            await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(1));

            const swipeableBottomSheet = document.querySelector(`.${className}`) as HTMLElement;

            const { top, left, height } = swipeableBottomSheet.getBoundingClientRect();

            const initial = { x: left + 10, y: top + 10 };

            const swipeDelta = height * CLOSE_OFFSET + 20;

            fireEvent.touchStart(swipeableBottomSheet, {
                touches: [{ clientX: initial.x, clientY: initial.y }],
            });

            fireEvent.touchMove(swipeableBottomSheet, {
                touches: [{ clientX: initial.x, clientY: initial.y + swipeDelta }],
            });

            fireEvent.touchEnd(swipeableBottomSheet);

            await waitFor(() => expect(onExited).toHaveBeenCalledTimes(1));

            const component = await queryByTestId(dataTestId);

            expect(component).not.toBeInTheDocument();
        });

        it('should call onMagnetize and onMagnetizeEnd prop after opening', async () => {
            const onMagnetize = jest.fn();
            const onMagnetizeEnd = jest.fn();

            render(
                <BottomSheetWrapper
                    onMagnetize={onMagnetize}
                    onMagnetizeEnd={onMagnetizeEnd}
                    transitionProps={{
                        timeout: 0,
                    }}
                />,
            );

            await waitFor(() => expect(onMagnetize).toHaveBeenCalledWith(1));
            await waitFor(() => expect(onMagnetizeEnd).toHaveBeenCalledWith(1));
        });

        it('should call onMagnetize and onMagnetizeEnd prop with initialAreaIdx after opening', async () => {
            const onMagnetize = jest.fn();
            const onMagnetizeEnd = jest.fn();

            render(
                <BottomSheetWrapper
                    magneticAreas={[0, 200, 500]}
                    initialActiveAreaIndex={1}
                    onMagnetize={onMagnetize}
                    onMagnetizeEnd={onMagnetizeEnd}
                    transitionProps={{
                        timeout: 0,
                    }}
                />,
            );

            await waitFor(() => expect(onMagnetize).toHaveBeenCalledWith(1));
            await waitFor(() => expect(onMagnetizeEnd).toHaveBeenCalledWith(1));
        });

        it('should call onMagnetize and onMagnetizeEnd prop after closing', async () => {
            const onMagnetize = jest.fn();
            const onMagnetizeEnd = jest.fn();

            const { getByTestId } = render(
                <BottomSheetWrapper
                    dataTestId={dataTestId}
                    onMagnetize={onMagnetize}
                    onMagnetizeEnd={onMagnetizeEnd}
                    transitionProps={{
                        timeout: 0,
                    }}
                />,
            );

            fireEvent.mouseDown(getByTestId(dataTestId));
            fireEvent.mouseUp(getByTestId(dataTestId));

            await waitFor(() => expect(onMagnetize).toHaveBeenCalledWith(0));
            await waitFor(() => expect(onMagnetizeEnd).toHaveBeenCalledWith(0));
        });
    });
});
