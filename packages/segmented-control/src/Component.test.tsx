import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { Segment, SegmentedControl, SegmentedControlProps } from './index';

const SEGMENT_TEST_ID = 'SEGMENT';

const renderComponent = ({
    selectedId,
    onChange,
    ...restProps
}: Omit<SegmentedControlProps, 'children'>) => (
    <SegmentedControl onChange={onChange} selectedId={selectedId} {...restProps}>
        <Segment id={1} title={'Label 1'} />
        <Segment dataTestId={SEGMENT_TEST_ID} id={2} title={'Label 2'} />
        <Segment id={3} title={'Label 3'} />
        <Segment id={4} title={'Label 4'} />
    </SegmentedControl>
);

describe('segmented-control', () => {
    it('should display correctly', () => {
        const { container } = render(renderComponent({ onChange: () => null, selectedId: 1 }));
        expect(container).toMatchSnapshot();
    });

    it('should onChange get correct id', () => {
        const onChange = jest.fn();
        render(
            renderComponent({
                onChange,
                selectedId: 1,
            }),
        );

        fireEvent.click(screen.getByTestId(SEGMENT_TEST_ID));

        expect(onChange).toHaveBeenCalledWith(2);
    });

    it('should set dataTestId', () => {
        const dataTestId = 'data-test-id';
        const { getByTestId } = render(
            renderComponent({ selectedId: 2, onChange: () => null, dataTestId }),
        );

        expect(getByTestId(dataTestId)).toBeInTheDocument();
    });

    it('should set className', () => {
        const className = 'customClassName';
        const { container } = render(
            renderComponent({
                onChange: () => null,
                className,
                selectedId: 2,
            }),
        );

        expect(container.firstElementChild).toHaveClass(className);
    });

    it('should set custom style', () => {
        const style = { padding: 20 };
        const { container } = render(
            renderComponent({
                onChange: () => null,
                style,
                selectedId: 2,
            }),
        );

        const firstElement = container.firstChild;

        expect(firstElement).toHaveStyle('padding: 20px');
    });

    it('should not apply contentWidth class by default', () => {
        const dataTestId = 'data-test-id';
        const { getByTestId } = render(
            renderComponent({ onChange: () => null, selectedId: 1, dataTestId }),
        );

        expect(getByTestId(dataTestId).firstElementChild).not.toHaveClass('contentWidth');
    });

    it('should apply contentWidth class when segmentWidth is content', () => {
        const dataTestId = 'data-test-id';
        const { getByTestId } = render(
            renderComponent({
                onChange: () => null,
                selectedId: 1,
                dataTestId,
                segmentWidth: 'content',
            }),
        );

        expect(getByTestId(dataTestId).firstElementChild).toHaveClass('contentWidth');
    });

    it('should indent title on the side without addon', () => {
        const { getByTestId } = render(
            <SegmentedControl onChange={() => null} selectedId={1} size={48}>
                <Segment
                    id={1}
                    dataTestId='left'
                    title='Label 1'
                    addons={{ left: { content: <svg /> } }}
                />
                <Segment
                    id={2}
                    dataTestId='right'
                    title='Label 2'
                    addons={{ right: { content: <svg /> } }}
                />
                <Segment
                    id={3}
                    dataTestId='both'
                    title='Label 3'
                    addons={{ left: { content: <svg /> }, right: { content: <svg /> } }}
                />
            </SegmentedControl>,
        );

        const getTitle = (testId: string) => getByTestId(testId).querySelector('.title');

        expect(getTitle('left')).toHaveClass('titleIndentRight48');
        expect(getTitle('left')).not.toHaveClass('titleIndentLeft48');
        expect(getTitle('right')).toHaveClass('titleIndentLeft48');
        expect(getTitle('right')).not.toHaveClass('titleIndentRight48');
        expect(getTitle('both')).not.toHaveClass('titleIndentLeft48');
        expect(getTitle('both')).not.toHaveClass('titleIndentRight48');
    });

    it('should not apply withAddons class when addons object is empty', () => {
        const { getByTestId } = render(
            <SegmentedControl onChange={() => null} selectedId={1}>
                <Segment
                    id={1}
                    dataTestId='empty'
                    title='Label 1'
                    addons={{ left: undefined, right: undefined }}
                />
                <Segment
                    id={2}
                    dataTestId='left'
                    title='Label 2'
                    addons={{ left: { content: <svg /> } }}
                />
                <Segment
                    id={3}
                    dataTestId='right'
                    title='Label 3'
                    addons={{ right: { content: <svg /> } }}
                />
            </SegmentedControl>,
        );

        expect(getByTestId('empty')).not.toHaveClass('withAddons');
        expect(getByTestId('left')).toHaveClass('withAddons');
        expect(getByTestId('right')).toHaveClass('withAddons');
    });

    it('should render skeleton when skeleton.visible is true', () => {
        const dataTestId = 'skeleton-test-id';
        render(
            renderComponent({
                onChange: () => null,
                selectedId: 2,
                skeleton: { visible: true },
                dataTestId,
            }),
        );

        expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
        expect(screen.queryByTestId(SEGMENT_TEST_ID)).not.toBeInTheDocument();
    });

    describe('selectedBox', () => {
        type Rect = { left: number; width: number };
        type Geometry = { inner: Rect; segments: Record<number, Rect> };

        const SEGMENT_IDS = [10, 20, 30, 40];

        const getSegmentTestId = (id: number) => `segment-${id}`;

        const renderSegmentedControl = (
            props: Omit<SegmentedControlProps, 'children' | 'onChange'>,
        ) => (
            <SegmentedControl onChange={() => null} {...props}>
                {SEGMENT_IDS.map((id) => (
                    <Segment
                        key={id}
                        id={id}
                        dataTestId={getSegmentTestId(id)}
                        title={`Label ${id}`}
                    />
                ))}
            </SegmentedControl>
        );

        const createRect = ({ left, width }: Rect) =>
            ({
                x: left,
                y: 0,
                left,
                width,
                right: left + width,
                top: 0,
                height: 32,
                bottom: 32,
                toJSON: () => ({}),
            }) as DOMRect;

        const ZERO_RECT = createRect({ left: 0, width: 0 });

        let geometry: Geometry;
        let originalResizeObserver: typeof ResizeObserver;
        let resizeCallbacks: ResizeObserverCallback[];
        let observe: jest.Mock;
        let disconnect: jest.Mock;

        const mockGeometry = (nextGeometry: Geometry) => {
            geometry = nextGeometry;
        };

        const triggerResizeObservers = () => {
            act(() => {
                resizeCallbacks.forEach((callback) =>
                    callback([] as unknown as ResizeObserverEntry[], {} as ResizeObserver),
                );
            });
        };

        const getSelectedBox = (container: HTMLElement) =>
            container.querySelector<HTMLElement>('.selectedBox') as HTMLElement;

        const getInner = (container: HTMLElement) =>
            container.querySelector<HTMLElement>('.inner') as HTMLElement;

        beforeEach(() => {
            jest.useFakeTimers();

            jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(
                function getBoundingClientRectMock(this: Element) {
                    if (this.classList.contains('inner')) {
                        return createRect(geometry.inner);
                    }

                    const segmentId = SEGMENT_IDS.find(
                        (id) => this.getAttribute('data-test-id') === getSegmentTestId(id),
                    );

                    return segmentId === undefined
                        ? ZERO_RECT
                        : createRect(geometry.segments[segmentId]);
                },
            );

            originalResizeObserver = global.ResizeObserver;
            resizeCallbacks = [];
            observe = jest.fn();
            disconnect = jest.fn();

            global.ResizeObserver = jest.fn().mockImplementation((callback) => {
                resizeCallbacks.push(callback);

                return {
                    observe,
                    unobserve: jest.fn(),
                    disconnect,
                };
            }) as unknown as typeof ResizeObserver;
        });

        afterEach(() => {
            act(() => {
                jest.runOnlyPendingTimers();
            });
            jest.useRealTimers();
            jest.restoreAllMocks();
            global.ResizeObserver = originalResizeObserver;
        });

        describe.each<{
            segmentWidth: SegmentedControlProps['segmentWidth'];
            geometry: Geometry;
            expected: Record<20 | 30, { width: string; transform: string }>;
        }>([
            {
                segmentWidth: 'equal',
                geometry: {
                    inner: { left: 20, width: 420 },
                    segments: {
                        10: { left: 22, width: 102 },
                        20: { left: 126, width: 104 },
                        30: { left: 232, width: 100 },
                        40: { left: 334, width: 98 },
                    },
                },
                expected: {
                    20: { width: '104px', transform: 'translateX(106px)' },
                    30: { width: '100px', transform: 'translateX(212px)' },
                },
            },
            {
                segmentWidth: 'content',
                geometry: {
                    inner: { left: 40, width: 640 },
                    segments: {
                        10: { left: 44, width: 60 },
                        20: { left: 108, width: 150 },
                        30: { left: 262, width: 90 },
                        40: { left: 356, width: 200 },
                    },
                },
                expected: {
                    20: { width: '150px', transform: 'translateX(68px)' },
                    30: { width: '90px', transform: 'translateX(222px)' },
                },
            },
        ])('segmentWidth: $segmentWidth', ({ segmentWidth, geometry: modeGeometry, expected }) => {
            beforeEach(() => {
                mockGeometry(modeGeometry);
            });

            it('should size and position selectedBox by selected segment before requestAnimationFrame', () => {
                const { container } = render(
                    renderSegmentedControl({ selectedId: 30, segmentWidth }),
                );

                const selectedBox = getSelectedBox(container);

                expect(selectedBox.style.width).toBe(expected[30].width);
                expect(selectedBox.style.transform).toBe(expected[30].transform);
                expect(selectedBox).toHaveClass('noTransition');

                act(() => {
                    jest.runOnlyPendingTimers();
                });

                expect(selectedBox).not.toHaveClass('noTransition');
                expect(selectedBox.style.width).toBe(expected[30].width);
                expect(selectedBox.style.transform).toBe(expected[30].transform);
            });

            it('should recalculate selectedBox on selectedId change', () => {
                const { container, rerender } = render(
                    renderSegmentedControl({ selectedId: 30, segmentWidth }),
                );

                rerender(renderSegmentedControl({ selectedId: 20, segmentWidth }));

                expect(getSelectedBox(container).style.width).toBe(expected[20].width);
                expect(getSelectedBox(container).style.transform).toBe(expected[20].transform);
                expect(screen.getByTestId(getSegmentTestId(20))).toHaveClass('selected');
                expect(screen.getByTestId(getSegmentTestId(30))).not.toHaveClass('selected');
            });

            it('should recalculate selectedBox for current selectedId on ResizeObserver callback', () => {
                const { container, rerender, unmount } = render(
                    renderSegmentedControl({ selectedId: 30, segmentWidth }),
                );

                expect(observe).toHaveBeenCalledWith(getInner(container));

                rerender(renderSegmentedControl({ selectedId: 20, segmentWidth }));

                mockGeometry({
                    inner: { left: 10, width: 300 },
                    segments: {
                        10: { left: 12, width: 50 },
                        20: { left: 64, width: 66 },
                        30: { left: 130, width: 120 },
                        40: { left: 250, width: 58 },
                    },
                });

                triggerResizeObservers();

                expect(getSelectedBox(container).style.width).toBe('66px');
                expect(getSelectedBox(container).style.transform).toBe('translateX(54px)');

                unmount();

                expect(disconnect).toHaveBeenCalled();
            });

            it('should not throw and not set selectedBox styles when selectedId is not found', () => {
                let container: HTMLElement | undefined;

                expect(() => {
                    ({ container } = render(
                        renderSegmentedControl({ selectedId: 100, segmentWidth }),
                    ));
                }).not.toThrow();

                const selectedBox = getSelectedBox(container as HTMLElement);

                SEGMENT_IDS.forEach((id) => {
                    expect(screen.getByTestId(getSegmentTestId(id))).not.toHaveClass('selected');
                });
                expect(selectedBox.style.width).toBe('');
                expect(selectedBox.style.transform).toBe('');

                expect(() => triggerResizeObservers()).not.toThrow();
                expect(selectedBox.style.width).toBe('');
                expect(selectedBox.style.transform).toBe('');
            });

            it('should position selectedBox when selectedId becomes valid', () => {
                const { container, rerender } = render(
                    renderSegmentedControl({ selectedId: 100, segmentWidth }),
                );

                rerender(renderSegmentedControl({ selectedId: 30, segmentWidth }));

                expect(getSelectedBox(container).style.width).toBe(expected[30].width);
                expect(getSelectedBox(container).style.transform).toBe(expected[30].transform);
            });
        });
    });
});
