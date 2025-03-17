import React, { ForwardRefRenderFunction, SyntheticEvent } from 'react';
import {
    render,
    screen,
    fireEvent,
    waitForElementToBeRemoved,
    waitFor,
} from '@testing-library/react';

import * as popoverModule from '@alfalab/core-components-popover';
import { TooltipDesktop as Tooltip, TooltipDesktopProps as TooltipProps } from './desktop';
import { getTooltipDesktopTestIds, getTooltipMobileTestIds } from './utils';
import { TooltipMobile, TooltipMobileProps } from './mobile';

jest.mock('react-transition-group', () => {
    return { CSSTransition: jest.fn((props) => (props.in ? props.children : null)) };
});

type PopoverComponent = {
    render?: ForwardRefRenderFunction<HTMLDivElement, popoverModule.PopoverProps>;
};

const renderTooltip = async (props: TooltipProps) => {
    return render(<Tooltip {...props}>{props.children}</Tooltip>);
};

const renderMobileTooltip = async (props: TooltipMobileProps) => {
    return render(<TooltipMobile {...props}>{props.children}</TooltipMobile>);
};

describe('Display tests', () => {
    it('should display correctly', async () => {
        const component = await renderTooltip({
            children: <div>Hover me</div>,
            content: <div>I am tooltip</div>,
        });

        expect(component).toMatchSnapshot();
    });

    it('should display correctly if tooltip open', async () => {
        const component = await renderTooltip({
            children: <div>Hover me</div>,
            content: <div>I am tooltip</div>,
            open: true,
        });

        expect(component).toMatchSnapshot();
    });

    it('should display correctly if tooltip open with view `hint`', async () => {
        const component = await renderTooltip({
            children: <div>Hover me</div>,
            content: <div>I am tooltip</div>,
            open: true,
            view: 'hint',
        });

        expect(component).toMatchSnapshot();
    });
});

describe('Attributes tests (desktop)', () => {
    const testId = 'tooltip';

    const targetClassName = 'targetClassName';
    const contentClassName = 'contentClassName';
    const popoverClassName = 'popoverClassName';

    beforeEach(() => {
        renderTooltip({
            children: <div>Hover me</div>,
            content: <div>I am tooltip</div>,
            open: true,
            contentClassName,
            targetClassName,
            popoverClassName,
            dataTestId: testId,
        });
    });

    const tooltipTestIds = getTooltipDesktopTestIds(testId);

    const elements = [
        { name: 'target', testId: tooltipTestIds.target, className: targetClassName },
        { name: 'popover', testId: tooltipTestIds.popover, className: popoverClassName },
        { name: 'content', testId: tooltipTestIds.content, className: contentClassName },
    ];

    it.each(elements)(
        'should set `data-test-id` attribute on the tooltip %s',
        async ({ testId, className }) => {
            const element = screen.getByTestId(testId);

            expect(element).toBeInTheDocument();
            expect(element).toHaveClass(className);
        },
    );
});

describe('Attributes tests (mobile)', () => {
    const testId = 'tooltip';
    const targetClassName = 'target';
    const modalWrapperClassName = 'bottom-sheet-wrapper';

    beforeEach(() => {
        renderMobileTooltip({
            children: <div>Hover me</div>,
            content: <div>I am tooltip</div>,
            open: true,
            targetClassName,
            modalWrapperClassName,
            dataTestId: testId,
        });
    });

    const tooltipTestIds = getTooltipMobileTestIds(testId);

    const elements = [
        { name: 'target', testId: tooltipTestIds.target, className: targetClassName },
        {
            name: 'bottom-sheet',
            testId: tooltipTestIds.bottomSheet,
            className: modalWrapperClassName,
        },
    ];

    it.each(elements)(
        'should set `data-test-id` attribute on the tooltip %s',
        async ({ testId, className }) => {
            const element = screen.getByTestId(testId);

            expect(element).toBeInTheDocument();
            expect(element).toHaveClass(className);
        },
    );
});

describe('Styles tests', () => {
    it('should set custom css class to content component', async () => {
        const className = 'custom';
        const testId = 'tooltip';

        const { getByTestId } = await renderTooltip({
            children: <div>Hover me</div>,
            content: <div>I am tooltip</div>,
            open: true,
            contentClassName: className,
            dataTestId: testId,
        });

        const contentTestId = getTooltipDesktopTestIds(testId).content;

        expect(getByTestId(contentTestId)).toHaveClass(className);
    });

    it('should set custom css class to arrow component', async () => {
        const arrowClassName = 'custom-arrow-class';

        await renderTooltip({
            children: <div>Hover me</div>,
            content: <div>I am tooltip</div>,
            open: true,
            arrowClassName,
        });

        expect(document.body.querySelector(`.${arrowClassName}`)).toHaveClass('arrow');
    });
});

describe('Render tests', () => {
    it('should unmount without errors', async () => {
        const { unmount } = await renderTooltip({
            children: <div>Hover me</div>,
            content: <div>I am tooltip</div>,
            open: true,
        });

        expect(unmount).not.toThrowError();
    });
});

describe('Click event tests', () => {
    it('should open/close if click on children', async () => {
        const childrenText = 'Click me';
        const contentText = 'I am tooltip';
        const onClose = jest.fn();
        const onOpen = jest.fn();

        const { getByText, findByText } = await renderTooltip({
            children: <div>{childrenText}</div>,
            content: <div>{contentText}</div>,
            trigger: 'click',
            onClose,
            onOpen,
        });

        const children = getByText(childrenText);

        fireEvent.click(children);

        const content = await findByText(contentText);

        expect(content).toBeInTheDocument();

        fireEvent.click(children);

        expect(content).not.toBeInTheDocument();

        expect(onOpen).toBeCalledTimes(1);
        expect(onClose).toBeCalledTimes(1);
    });

    it('should close if click outside', async () => {
        const childrenText = 'Click me';
        const contentText = 'I am tooltip';

        const { getByText, findByText } = await renderTooltip({
            children: <div>{childrenText}</div>,
            content: <div>{contentText}</div>,
            trigger: 'click',
        });

        const children = getByText(childrenText);

        fireEvent.click(children);

        const content = await findByText(contentText);

        expect(content).toBeInTheDocument();

        fireEvent.click(document.body);

        expect(content).not.toBeInTheDocument();
    });

    it('should stay open if prop `open` is `true`', async () => {
        const childrenText = 'Click me';
        const contentText = 'I am tooltip';

        const { getByText } = await renderTooltip({
            children: <div>{childrenText}</div>,
            content: <div>{contentText}</div>,
            trigger: 'click',
            open: true,
        });

        await waitFor(() => {
            const content = getByText(contentText);

            expect(content).toBeInTheDocument();
        });

        await waitFor(() => {
            fireEvent.click(document.body);
            const content = getByText(contentText);

            expect(content).toBeInTheDocument();
        });

        await waitFor(() => {
            const children = getByText(childrenText);
            fireEvent.click(children);
            const content = getByText(contentText);

            expect(content).toBeInTheDocument();
        });
    });

    it('should stay close if prop `open` is `false`', async () => {
        const childrenText = 'Click me';
        const contentText = 'I am tooltip';

        const { getByText } = await renderTooltip({
            children: <div>{childrenText}</div>,
            content: <div id='content'>{contentText}</div>,
            trigger: 'click',
            open: false,
        });

        const content = document.querySelector('#content');
        const children = getByText(childrenText);

        expect(content).toBeNull();

        fireEvent.click(children);

        expect(content).toBeNull();
    });
});

describe('Hover event tests', () => {
    it('should open/close if hover on children', async () => {
        const childrenText = 'Click me';
        const contentText = 'I am tooltip';
        const onClose = jest.fn();
        const onOpen = jest.fn();

        const { getByText, findByText } = await renderTooltip({
            children: <div>{childrenText}</div>,
            content: <div id='content'>{contentText}</div>,
            onClose,
            onOpen,
        });

        const children = getByText(childrenText);

        fireEvent.mouseOver(children);

        const content = await findByText(contentText);

        expect(content).toBeInTheDocument();

        fireEvent.mouseOut(children);

        await waitForElementToBeRemoved(() => getByText(contentText));

        expect(content).not.toBeInTheDocument();

        expect(onOpen).toBeCalledTimes(1);
        expect(onClose).toBeCalledTimes(1);
    });

    it('should stay open if prop `open` is `true`', async () => {
        jest.useFakeTimers();

        const childrenText = 'Click me';
        const contentText = 'I am tooltip';
        const onClose = jest.fn();
        const onOpen = jest.fn();

        const { getByText } = await renderTooltip({
            children: <div>{childrenText}</div>,
            content: <div>{contentText}</div>,
            onClose,
            onOpen,
            open: true,
        });

        const children = getByText(childrenText);

        fireEvent.mouseOver(children);
        fireEvent.mouseOut(children);

        const content = getByText(contentText);

        expect(content).toBeInTheDocument();
    });

    it('should stay close if prop `open` is `false`', async () => {
        jest.useFakeTimers();

        const childrenText = 'Click me';
        const contentText = 'I am tooltip';
        const onClose = jest.fn();
        const onOpen = jest.fn();

        const { getByText } = await renderTooltip({
            children: <div>{childrenText}</div>,
            content: <div id='content'>{contentText}</div>,
            onClose,
            onOpen,
            open: false,
        });

        const children = getByText(childrenText);

        fireEvent.mouseOver(children);
        fireEvent.mouseOut(children);

        const content = document.querySelector('#content');

        expect(content).toBeNull();
    });
});

describe('Child render tests', () => {
    it('should pass child classname', async () => {
        const childClassName = 'child-classname';
        const testId = 'test-id';

        const { getByTestId } = await renderTooltip({
            children: (
                <div className={childClassName} data-test-id={testId}>
                    Hover me
                </div>
            ),
            content: <div>I am tooltip</div>,
            open: true,
        });

        expect(getByTestId(testId)).toHaveClass(childClassName);
    });
});

describe('Props test', () => {
    it('should use `targetRef`', async () => {
        const ref = {
            current: null,
        };

        const { container } = await renderTooltip({
            targetRef: ref,
            children: <div>children</div>,
            content: <div>I am tooltip</div>,
            open: true,
        });

        expect(container.firstChild).toEqual(ref.current);
    });

    it('PopoverComponent should use `anchor` props like anchorElement', async () => {
        const PopoverComponent = popoverModule.Popover as PopoverComponent;
        const spy = jest.spyOn(PopoverComponent, 'render');

        const anchor: HTMLDivElement | null = document.createElement('div');

        const expectedProps: TooltipProps = {
            anchor,
            children: <div>children</div>,
            content: <div>I am tooltip</div>,
            open: true,
        };

        await renderTooltip(expectedProps);

        const mockCalls = spy.mock.calls;
        const lastMockCall = mockCalls[mockCalls.length - 1];

        expect(lastMockCall[0]).toMatchObject({ anchorElement: anchor });
    });
    it('should call `onTargetClick`', async () => {
        const childrenText = 'Click me';
        const contentText = 'I am tooltip';
        const onTargetClick = jest.fn();

        const { getByText, findByText } = await renderTooltip({
            children: <div>{childrenText}</div>,
            content: <div>{contentText}</div>,
            trigger: 'click',
            onTargetClick,
        });

        const children = getByText(childrenText);

        fireEvent.click(children);

        const content = await findByText(contentText);

        expect(content).toBeInTheDocument();

        expect(onTargetClick).toBeCalledTimes(1);

        expect(onTargetClick).toBeCalledWith(expect.anything());
    });
});
