import React, { useContext, ContextType, useEffect, useRef, useState } from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BaseModal } from '@alfalab/core-components-base-modal';
import { getUniversalModalTestIds } from './utils/getUniversalModalTestIds';
import { UniversalModalDesktop } from './desktop';
import { UniversalModalMobile } from './mobile';
import { ModalContext } from './Context';
import userEvent from '@testing-library/user-event';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

Object.defineProperty(HTMLElement.prototype, 'scrollBy', {
    value: jest.fn(),
});

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

describe('UniversalModal', () => {
    describe('data-test-id tests', () => {
        it('should have desktop data-test-id', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalDesktop dataTestId={dti} open={true}>
                    <UniversalModalDesktop.Header title='Title' dataTestId={dti} hasCloser={true} />
                    <UniversalModalDesktop.Content dataTestId={dti} />
                    <UniversalModalDesktop.Footer dataTestId={dti} />
                </UniversalModalDesktop>,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal)).toBeInTheDocument();
            expect(screen.getByTestId(testIds.header)).toBeInTheDocument();
            expect(screen.getByTestId(testIds.title)).toBeInTheDocument();
            expect(screen.getByTestId(testIds.content)).toBeInTheDocument();
            expect(screen.getByTestId(testIds.footer)).toBeInTheDocument();
            expect(screen.getByTestId(testIds.closer)).toBeInTheDocument();
        });

        it('should have mobile data-test-id', () => {
            const dti = 'modal-dti';

            render(
                <UniversalModalMobile dataTestId={dti} open={true}>
                    <UniversalModalMobile.Header title='Title' dataTestId={dti} hasCloser={true} />
                    <UniversalModalMobile.Content dataTestId={dti} />
                    <UniversalModalMobile.Footer dataTestId={dti} />
                </UniversalModalMobile>,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(screen.getByTestId(testIds.modal)).toBeInTheDocument();
            expect(screen.getByTestId(testIds.header)).toBeInTheDocument();
            expect(screen.getByTestId(testIds.title)).toBeInTheDocument();
            expect(screen.getByTestId(testIds.content)).toBeInTheDocument();
            expect(screen.getByTestId(testIds.footer)).toBeInTheDocument();
            expect(screen.getByTestId(testIds.closer)).toBeInTheDocument();
        });
    });

    describe('interactive tests', () => {
        describe('desktop closing tests', () => {
            it('should close by context "onClose"', async () => {
                const dti = 'modal-dti';
                const handleClose = jest.fn();

                render(
                    <UniversalModalDesktop dataTestId={dti} open={true} onClose={handleClose}>
                        <UniversalModalDesktop.Header
                            title='Title'
                            dataTestId={dti}
                            hasCloser={true}
                        />
                    </UniversalModalDesktop>,
                );

                const closer = screen.getByTestId(getUniversalModalTestIds(dti).closer);
                fireEvent.click(closer);

                expect(handleClose).toHaveBeenCalledTimes(1);
            });

            it('should close by header "onClose"', async () => {
                const dti = 'modal-dti';
                const handleClose = jest.fn();

                render(
                    <UniversalModalDesktop dataTestId={dti} open={true}>
                        <UniversalModalDesktop.Header
                            title='Title'
                            dataTestId={dti}
                            hasCloser={true}
                            onClose={handleClose}
                        />
                    </UniversalModalDesktop>,
                );

                const closer = screen.getByTestId(getUniversalModalTestIds(dti).closer);
                fireEvent.click(closer);

                expect(handleClose).toHaveBeenCalledTimes(1);
            });

            it('should close by priority', async () => {
                const dti = 'modal-dti';
                const handleCloseContext = jest.fn();
                const handleClose = jest.fn();

                render(
                    <UniversalModalDesktop
                        dataTestId={dti}
                        open={true}
                        onClose={handleCloseContext}
                    >
                        <UniversalModalDesktop.Header
                            title='Title'
                            dataTestId={dti}
                            hasCloser={true}
                            onClose={handleClose}
                        />
                    </UniversalModalDesktop>,
                );

                const closer = screen.getByTestId(getUniversalModalTestIds(dti).closer);
                fireEvent.click(closer);

                expect(handleCloseContext).toHaveBeenCalledTimes(0);
                expect(handleClose).toHaveBeenCalledTimes(1);
            });
        });

        describe('mobile closing tests', () => {
            it('should close by context "onClose"', async () => {
                const dti = 'modal-dti';
                const handleClose = jest.fn();

                render(
                    <UniversalModalMobile dataTestId={dti} open={true} onClose={handleClose}>
                        <UniversalModalMobile.Header
                            title='Title'
                            dataTestId={dti}
                            hasCloser={true}
                        />
                    </UniversalModalMobile>,
                );

                const closer = screen.getByTestId(getUniversalModalTestIds(dti).closer);
                fireEvent.click(closer);

                expect(handleClose).toHaveBeenCalledTimes(1);
            });

            it('should close by header "onClose"', async () => {
                const dti = 'modal-dti';
                const handleClose = jest.fn();

                render(
                    <UniversalModalMobile dataTestId={dti} open={true}>
                        <UniversalModalMobile.Header
                            title='Title'
                            dataTestId={dti}
                            hasCloser={true}
                            onClose={handleClose}
                        />
                    </UniversalModalMobile>,
                );

                const closer = screen.getByTestId(getUniversalModalTestIds(dti).closer);
                fireEvent.click(closer);

                expect(handleClose).toHaveBeenCalledTimes(1);
            });

            it('should close by priority', async () => {
                const dti = 'modal-dti';
                const handleCloseContext = jest.fn();
                const handleClose = jest.fn();

                render(
                    <UniversalModalMobile dataTestId={dti} open={true} onClose={handleCloseContext}>
                        <UniversalModalMobile.Header
                            title='Title'
                            dataTestId={dti}
                            hasCloser={true}
                            onClose={handleClose}
                        />
                    </UniversalModalMobile>,
                );

                const closer = screen.getByTestId(getUniversalModalTestIds(dti).closer);
                fireEvent.click(closer);

                expect(handleCloseContext).toHaveBeenCalledTimes(0);
                expect(handleClose).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('context tests', () => {
        // jsdom не считает реальный layout, поэтому геометрию скролла задаём вручную
        const mockScrollGeometry = (
            node: HTMLDivElement,
            geometry: { scrollHeight: number; clientHeight: number; scrollTop?: number },
        ) => {
            const { scrollHeight, clientHeight, scrollTop = 0 } = geometry;

            Object.defineProperty(node, 'scrollHeight', {
                value: scrollHeight,
                configurable: true,
            });
            Object.defineProperty(node, 'clientHeight', {
                value: clientHeight,
                configurable: true,
            });
            Object.defineProperty(node, 'offsetHeight', {
                value: clientHeight,
                configurable: true,
            });
            Object.defineProperty(node, 'scrollTop', {
                value: scrollTop,
                configurable: true,
                writable: true,
            });
        };

        describe('hasHeader / hasFooter', () => {
            const dti = 'modal-dti';

            it.each([
                { field: 'hasHeader', expected: false },
                { field: 'hasFooter', expected: false },
            ])('context.$field should be $expected', ({ field, expected }) => {
                let contextValues: ContextType<typeof ModalContext>;
                type Key = keyof typeof contextValues;

                const Child = () => {
                    contextValues = useContext(ModalContext);
                    return <div>Child</div>;
                };

                render(
                    <UniversalModalDesktop dataTestId={dti} open={true}>
                        <UniversalModalDesktop.Content dataTestId={dti}>
                            <Child />
                        </UniversalModalDesktop.Content>
                    </UniversalModalDesktop>,
                );

                expect(contextValues![field as Key]).toBe(expected);
            });

            it.each([
                { field: 'hasHeader', expected: true },
                { field: 'hasFooter', expected: false },
            ])('context.$field should be $expected', ({ field, expected }) => {
                let contextValues: ContextType<typeof ModalContext>;
                type Key = keyof typeof contextValues;

                const Child = () => {
                    contextValues = useContext(ModalContext);
                    return <div>Child</div>;
                };

                render(
                    <UniversalModalDesktop dataTestId={dti} open={true}>
                        <UniversalModalDesktop.Header dataTestId={dti} />
                        <UniversalModalDesktop.Content dataTestId={dti}>
                            <Child />
                        </UniversalModalDesktop.Content>
                    </UniversalModalDesktop>,
                );

                expect(contextValues![field as Key]).toBe(expected);
            });

            it.each([
                { field: 'hasHeader', expected: false },
                { field: 'hasFooter', expected: true },
            ])('context.$field should be $expected', ({ field, expected }) => {
                let contextValues: ContextType<typeof ModalContext>;
                type Key = keyof typeof contextValues;

                const Child = () => {
                    contextValues = useContext(ModalContext);
                    return <div>Child</div>;
                };

                render(
                    <UniversalModalDesktop dataTestId={dti} open={true}>
                        <UniversalModalDesktop.Content dataTestId={dti}>
                            <Child />
                        </UniversalModalDesktop.Content>
                        <UniversalModalDesktop.Footer dataTestId={dti} />
                    </UniversalModalDesktop>,
                );

                expect(contextValues![field as Key]).toBe(expected);
            });

            it.each([
                { field: 'hasHeader', expected: true },
                { field: 'hasFooter', expected: true },
            ])('context.$field should be $expected', ({ field, expected }) => {
                let contextValues: ContextType<typeof ModalContext>;
                type Key = keyof typeof contextValues;

                const Child = () => {
                    contextValues = useContext(ModalContext);
                    return <div>Child</div>;
                };

                render(
                    <UniversalModalDesktop dataTestId={dti} open={true}>
                        <UniversalModalDesktop.Header dataTestId={dti} />
                        <UniversalModalDesktop.Content dataTestId={dti}>
                            <Child />
                        </UniversalModalDesktop.Content>
                        <UniversalModalDesktop.Footer dataTestId={dti} />
                    </UniversalModalDesktop>,
                );

                expect(contextValues![field as Key]).toBe(expected);
            });
        });

        describe('headerHighlighted / footerHighlighted (context setters)', () => {
            const dti = 'modal-dti';
            const testIds = getUniversalModalTestIds(dti);

            it.each([
                { field: 'headerHighlighted', expected: false },
                { field: 'footerHighlighted', expected: false },
            ])('context.$field should be $expected', ({ field, expected }) => {
                let contextValues: ContextType<typeof ModalContext>;
                type Key = keyof typeof contextValues;

                const Child = () => {
                    contextValues = useContext(ModalContext);
                    return <div>Child</div>;
                };

                render(
                    <UniversalModalDesktop dataTestId={dti} open={true}>
                        <Child />
                    </UniversalModalDesktop>,
                );

                expect(contextValues![field as Key]).toBe(expected);
            });

            it.each([
                { field: 'headerHighlighted', expected: true },
                { field: 'footerHighlighted', expected: true },
            ])('context.$field should be $expected', ({ field, expected }) => {
                let contextValues: ContextType<typeof ModalContext>;
                type Key = keyof typeof contextValues;

                const Child = () => {
                    contextValues = useContext(ModalContext);

                    useEffect(() => {
                        contextValues.setHeaderHighlighted(true);
                        contextValues.setFooterHighlighted(true);
                    }, []);

                    return <div>Child</div>;
                };

                render(
                    <UniversalModalDesktop dataTestId={dti} open={true}>
                        <Child />
                    </UniversalModalDesktop>,
                );

                expect(contextValues![field as Key]).toBe(expected);
            });

            it('should highlight header', () => {
                const Child = () => {
                    const { setHeaderHighlighted } = useContext(ModalContext);

                    useEffect(() => {
                        setHeaderHighlighted(true);
                    }, []);

                    return <div>Child</div>;
                };

                render(
                    <UniversalModalDesktop dataTestId={dti} open={true}>
                        <UniversalModalDesktop.Header dataTestId={dti} sticky={true}>
                            <Child />
                        </UniversalModalDesktop.Header>
                    </UniversalModalDesktop>,
                );

                const header = screen.queryByTestId(testIds.header);

                expect(header).toHaveClass('highlighted');
            });

            it('should highlight footer', () => {
                const Child = () => {
                    const { setFooterHighlighted } = useContext(ModalContext);

                    useEffect(() => {
                        setFooterHighlighted(true);
                    }, []);

                    return <div>Child</div>;
                };

                render(
                    <UniversalModalDesktop dataTestId={dti} open={true}>
                        <UniversalModalDesktop.Footer dataTestId={dti} sticky={true}>
                            <Child />
                        </UniversalModalDesktop.Footer>
                    </UniversalModalDesktop>,
                );

                const footer = screen.queryByTestId(testIds.footer);

                expect(footer).toHaveClass('highlighted');
            });
        });

        // hasScroll обновляется через ResizeObserver, поэтому мокаем его и вызываем колбэк вручную
        describe('hasScroll', () => {
            const dti = 'modal-dti';

            let originalResizeObserver: typeof ResizeObserver;
            let resizeCallbacks: ResizeObserverCallback[];

            beforeEach(() => {
                originalResizeObserver = global.ResizeObserver;
                resizeCallbacks = [];

                global.ResizeObserver = jest.fn().mockImplementation((callback) => {
                    resizeCallbacks.push(callback);

                    return {
                        observe: jest.fn(),
                        unobserve: jest.fn(),
                        disconnect: jest.fn(),
                    };
                }) as unknown as typeof ResizeObserver;

                jest.useFakeTimers();
            });

            afterEach(() => {
                global.ResizeObserver = originalResizeObserver;
                jest.useRealTimers();
            });

            const triggerResizeObservers = () => {
                act(() => {
                    resizeCallbacks.forEach((callback) =>
                        callback([] as unknown as ResizeObserverEntry[], {} as ResizeObserver),
                    );
                });
            };

            const renderScrollableModal = () => {
                const scrollableContainerRef = React.createRef<HTMLDivElement>();
                let contextValues: ContextType<typeof ModalContext>;

                const Child = () => {
                    contextValues = useContext(ModalContext);
                    return <div>Child</div>;
                };

                render(
                    <UniversalModalDesktop
                        dataTestId={dti}
                        open={true}
                        scrollableContainerRef={scrollableContainerRef}
                    >
                        <UniversalModalDesktop.Content dataTestId={dti}>
                            <Child />
                        </UniversalModalDesktop.Content>
                    </UniversalModalDesktop>,
                );

                // ждём завершения анимации открытия модалки
                act(() => {
                    jest.advanceTimersByTime(250);
                });

                return { scrollableContainerRef, getContext: () => contextValues };
            };

            it('should be true when content overflows the scrollable container', () => {
                const { scrollableContainerRef, getContext } = renderScrollableModal();

                mockScrollGeometry(scrollableContainerRef.current!, {
                    scrollHeight: 1000,
                    clientHeight: 400,
                });

                triggerResizeObservers();

                expect(getContext().hasScroll).toBe(true);
            });

            it('should be false when content fits the scrollable container', () => {
                const { scrollableContainerRef, getContext } = renderScrollableModal();

                mockScrollGeometry(scrollableContainerRef.current!, {
                    scrollHeight: 400,
                    clientHeight: 400,
                });

                triggerResizeObservers();

                expect(getContext().hasScroll).toBe(false);
            });
        });

        // проверяем итоговый CSS-класс, а не сам факт вызова сеттера контекста
        describe('header/footer highlight on real scroll', () => {
            const dti = 'modal-dti';
            const testIds = getUniversalModalTestIds(dti);

            beforeEach(() => {
                jest.useFakeTimers();
            });

            afterEach(() => {
                jest.useRealTimers();
            });

            const renderScrollableModal = () => {
                const scrollableContainerRef = React.createRef<HTMLDivElement>();

                render(
                    <UniversalModalDesktop
                        dataTestId={dti}
                        open={true}
                        scrollableContainerRef={scrollableContainerRef}
                    >
                        <UniversalModalDesktop.Header dataTestId={dti} sticky={true}>
                            Header
                        </UniversalModalDesktop.Header>
                        <UniversalModalDesktop.Content dataTestId={dti}>
                            Content
                        </UniversalModalDesktop.Content>
                        <UniversalModalDesktop.Footer dataTestId={dti} sticky={true}>
                            Footer
                        </UniversalModalDesktop.Footer>
                    </UniversalModalDesktop>,
                );

                act(() => {
                    jest.advanceTimersByTime(250);
                });

                return scrollableContainerRef;
            };

            const scrollTo = (node: HTMLDivElement, scrollTop: number) => {
                mockScrollGeometry(node, { scrollHeight: 1000, clientHeight: 400, scrollTop });

                act(() => {
                    fireEvent.scroll(node);
                });
            };

            it('should not highlight header, but should highlight footer at the top', () => {
                const scrollableContainerRef = renderScrollableModal();

                scrollTo(scrollableContainerRef.current!, 0);

                expect(screen.queryByTestId(testIds.header)).not.toHaveClass('highlighted');
                expect(screen.queryByTestId(testIds.footer)).toHaveClass('highlighted');
            });

            it('should highlight both header and footer in the middle', () => {
                const scrollableContainerRef = renderScrollableModal();

                scrollTo(scrollableContainerRef.current!, 300);

                expect(screen.queryByTestId(testIds.header)).toHaveClass('highlighted');
                expect(screen.queryByTestId(testIds.footer)).toHaveClass('highlighted');
            });

            it('should highlight header, but not footer at the bottom', () => {
                const scrollableContainerRef = renderScrollableModal();

                // контент долистан до конца
                scrollTo(scrollableContainerRef.current!, 600);

                expect(screen.queryByTestId(testIds.header)).toHaveClass('highlighted');
                expect(screen.queryByTestId(testIds.footer)).not.toHaveClass('highlighted');
            });
        });

        // проверяем дефолт scrollContainerFillsViewport=true: модалка занимает весь экран и не занимает
        describe('header/footer highlight on real scroll (mobile, scrollContainerFillsViewport default)', () => {
            const dti = 'modal-dti';
            const testIds = getUniversalModalTestIds(dti);

            let originalInnerHeight: number;

            beforeEach(() => {
                jest.useFakeTimers();
                originalInnerHeight = window.innerHeight;
                Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
            });

            afterEach(() => {
                jest.useRealTimers();
                Object.defineProperty(window, 'innerHeight', {
                    value: originalInnerHeight,
                    configurable: true,
                });
            });

            const renderScrollableModal = (rect: { top: number; bottom: number }) => {
                render(
                    <UniversalModalMobile dataTestId={dti} open={true}>
                        <UniversalModalMobile.Header dataTestId={dti} sticky={true}>
                            Header
                        </UniversalModalMobile.Header>
                        <UniversalModalMobile.Content dataTestId={dti}>
                            Content
                        </UniversalModalMobile.Content>
                        <UniversalModalMobile.Footer dataTestId={dti} sticky={true}>
                            Footer
                        </UniversalModalMobile.Footer>
                    </UniversalModalMobile>,
                );

                act(() => {
                    jest.advanceTimersByTime(250);
                });

                const componentNode = screen
                    .getByTestId(testIds.modal)
                    .querySelector<HTMLDivElement>('.component')!;

                componentNode.getBoundingClientRect = () =>
                    ({ top: rect.top, bottom: rect.bottom }) as DOMRect;

                return componentNode;
            };

            const scrollTo = (node: HTMLDivElement, scrollTop: number) => {
                mockScrollGeometry(node, { scrollHeight: 1000, clientHeight: 400, scrollTop });

                act(() => {
                    fireEvent.scroll(node);
                });
            };

            it('should follow scroll position when the box touches viewport edges (realistic mobile)', () => {
                const componentNode = renderScrollableModal({ top: 0, bottom: 800 });

                scrollTo(componentNode, 0);
                expect(screen.queryByTestId(testIds.header)).not.toHaveClass('highlighted');
                expect(screen.queryByTestId(testIds.footer)).toHaveClass('highlighted');

                scrollTo(componentNode, 300);
                expect(screen.queryByTestId(testIds.header)).toHaveClass('highlighted');
                expect(screen.queryByTestId(testIds.footer)).toHaveClass('highlighted');

                scrollTo(componentNode, 600);
                expect(screen.queryByTestId(testIds.header)).toHaveClass('highlighted');
                expect(screen.queryByTestId(testIds.footer)).not.toHaveClass('highlighted');
            });

            it('should stay off when the box does NOT touch viewport edges, even if scrolled', () => {
                const componentNode = renderScrollableModal({ top: 100, bottom: 400 });

                // та же позиция скролла, что в прошлом тесте подсвечивала и хедер, и футер
                scrollTo(componentNode, 300);

                expect(screen.queryByTestId(testIds.header)).not.toHaveClass('highlighted');
                expect(screen.queryByTestId(testIds.footer)).not.toHaveClass('highlighted');
            });
        });
    });

    describe('desktop footer column children gap', () => {
        const dti = 'modal-dti';
        const testIds = getUniversalModalTestIds(dti);

        it('should not render middle gap footer', () => {
            render(
                <UniversalModalDesktop dataTestId={dti} open={true} width={500}>
                    <UniversalModalDesktop.Footer dataTestId={dti} layout='column' />
                </UniversalModalDesktop>,
            );

            const footer = screen.queryByTestId(testIds.footer);

            expect(footer).not.toHaveClass('middle');
        });

        it('should render middle gap footer', () => {
            render(
                <UniversalModalDesktop dataTestId={dti} open={true} width={800}>
                    <UniversalModalDesktop.Footer dataTestId={dti} layout='column' />
                </UniversalModalDesktop>,
            );

            const footer = screen.queryByTestId(testIds.footer);

            expect(footer).toHaveClass('middle');
        });

        it('should not render middle gap footer', () => {
            render(
                <UniversalModalDesktop dataTestId={dti} open={true} width='fullWidth'>
                    <UniversalModalDesktop.Footer dataTestId={dti} layout='column' />
                </UniversalModalDesktop>,
            );

            const footer = screen.queryByTestId(testIds.footer);

            expect(footer).toHaveClass('middle');
        });
    });

    describe('desktop backdrop tests', () => {
        const testId = 'backdrop-test-id';

        describe('center modal', () => {
            it('should render backdrop by default', () => {
                render(
                    <UniversalModalDesktop
                        open={true}
                        horizontalAlign={'start'}
                        backdropProps={{ dataTestId: testId }}
                    />,
                );

                const backdrop = screen.queryByTestId(testId);

                expect(backdrop).toBeInTheDocument();
            });

            it('should render backdrop by overlay=true', () => {
                render(
                    <UniversalModalDesktop
                        open={true}
                        horizontalAlign={'start'}
                        overlay={true}
                        backdropProps={{ dataTestId: testId }}
                    />,
                );

                const backdrop = screen.queryByTestId(testId);

                expect(backdrop).toBeInTheDocument();
            });

            it('should render backdrop by overlay=false', () => {
                render(
                    <UniversalModalDesktop
                        open={true}
                        horizontalAlign={'start'}
                        overlay={false}
                        backdropProps={{ dataTestId: testId }}
                    />,
                );

                const backdrop = screen.queryByTestId(testId);

                expect(backdrop).not.toBeInTheDocument();
            });
        });

        describe('side modal', () => {
            it('should render backdrop by default', () => {
                render(
                    <UniversalModalDesktop
                        open={true}
                        horizontalAlign={'center'}
                        backdropProps={{ dataTestId: testId }}
                    />,
                );

                const backdrop = screen.queryByTestId(testId);

                expect(backdrop).toBeInTheDocument();
            });

            it('should render backdrop by overlay=true', () => {
                render(
                    <UniversalModalDesktop
                        open={true}
                        horizontalAlign={'center'}
                        overlay={true}
                        backdropProps={{ dataTestId: testId }}
                    />,
                );

                const backdrop = screen.queryByTestId(testId);

                expect(backdrop).toBeInTheDocument();
            });

            it('should render backdrop by overlay=false', () => {
                render(
                    <UniversalModalDesktop
                        open={true}
                        horizontalAlign={'center'}
                        overlay={false}
                        backdropProps={{ dataTestId: testId }}
                    />,
                );

                const backdrop = screen.queryByTestId(testId);

                expect(backdrop).not.toBeInTheDocument();
            });
        });
    });

    describe('desktop scroll lock tests', () => {
        let savedBodyStyle: CSSStyleDeclaration;

        beforeAll(() => {
            savedBodyStyle = document.body.style;
        });

        beforeEach(() => {
            // eslint-disable-next-line
            // @ts-ignore
            document.body.setAttribute('style', savedBodyStyle);
        });

        describe('side modal', () => {
            it('should not lock scroll when overlay=false', () => {
                const { rerender } = render(
                    <UniversalModalDesktop open={false} horizontalAlign='start' overlay={false} />,
                );

                expect(document.body.style.overflow).toBe('');

                rerender(
                    <UniversalModalDesktop open={true} horizontalAlign='start' overlay={false} />,
                );

                expect(document.body.style.overflow).toBe('');
            });

            it('should lock scroll via legacy mechanism by default (overlay=true)', async () => {
                const { rerender } = render(
                    <UniversalModalDesktop open={false} horizontalAlign='start' />,
                );

                expect(document.body.style.overflow).toBe('');

                rerender(<UniversalModalDesktop open={true} horizontalAlign='start' />);

                expect(document.body.style.overflow).toBe('hidden');

                rerender(<UniversalModalDesktop open={false} horizontalAlign='start' />);

                await waitFor(() => {
                    expect(document.body.style.overflow).toBe('');
                });
            });
        });

        describe('center modal', () => {
            it('should not lock scroll when overlay=false', () => {
                const { rerender } = render(
                    <UniversalModalDesktop open={false} horizontalAlign='center' overlay={false} />,
                );

                expect(document.body.style.overflow).toBe('');

                rerender(
                    <UniversalModalDesktop open={true} horizontalAlign='center' overlay={false} />,
                );

                expect(document.body.style.overflow).toBe('');
            });

            it('should lock scroll via legacy mechanism by default (overlay=true)', async () => {
                const { rerender } = render(
                    <UniversalModalDesktop open={false} horizontalAlign='center' />,
                );

                expect(document.body.style.overflow).toBe('');

                rerender(<UniversalModalDesktop open={true} horizontalAlign='center' />);

                expect(document.body.style.overflow).toBe('hidden');

                rerender(<UniversalModalDesktop open={false} horizontalAlign='center' />);

                await waitFor(() => {
                    expect(document.body.style.overflow).toBe('');
                });
            });
        });

        describe('coordination with other modals', () => {
            const TestCase = ({
                sideOpen,
                otherOpen,
            }: {
                sideOpen: boolean;
                otherOpen: boolean;
            }) => (
                <React.Fragment>
                    <UniversalModalDesktop open={sideOpen} horizontalAlign='start' />
                    <BaseModal open={otherOpen}>
                        <div>Other modal</div>
                    </BaseModal>
                </React.Fragment>
            );

            it('should not block wheel scroll inside the other (top) modal while the sidebar is open underneath', () => {
                render(<TestCase sideOpen={true} otherOpen={true} />);

                const content = screen.getByText('Other modal');

                const wheelEvent = new WheelEvent('wheel', {
                    bubbles: true,
                    cancelable: true,
                    deltaY: 10,
                });

                content.dispatchEvent(wheelEvent);

                expect(wheelEvent.defaultPrevented).toBe(false);
            });

            it('should keep background scroll locked while the sidebar is open, even after the other modal closes', async () => {
                const { rerender } = render(<TestCase sideOpen={false} otherOpen={false} />);

                expect(document.body.style.overflow).toBe('');

                rerender(<TestCase sideOpen={true} otherOpen={true} />);

                expect(document.body.style.overflow).toBe('hidden');

                rerender(<TestCase sideOpen={true} otherOpen={false} />);

                await waitFor(() => {
                    expect(screen.queryByText('Other modal')).not.toBeInTheDocument();
                });

                expect(document.body.style.overflow).toBe('hidden');

                rerender(<TestCase sideOpen={false} otherOpen={false} />);

                await waitFor(() => {
                    expect(document.body.style.overflow).toBe('');
                });
            });
        });
    });

    describe('disableRestoreFocus', () => {
        describe('desktop', () => {
            it('should restore focus to the previously focused element after closing by default', async () => {
                const dti = 'modal-dti';

                const TestComponent = () => {
                    const [open, setOpen] = useState(false);

                    return (
                        <>
                            <button data-test-id='trigger' onClick={() => setOpen(true)}>
                                Open
                            </button>
                            <UniversalModalDesktop open={open} onClose={() => setOpen(false)}>
                                <UniversalModalDesktop.Header
                                    title='Title'
                                    dataTestId={dti}
                                    hasCloser={true}
                                />
                            </UniversalModalDesktop>
                        </>
                    );
                };

                render(<TestComponent />);

                const trigger = screen.getByTestId('trigger');

                await userEvent.click(trigger);

                const closer = screen.getByTestId(getUniversalModalTestIds(dti).closer);

                await userEvent.click(closer);

                expect(trigger).toHaveFocus();
            });

            it('should not restore focus when disableRestoreFocus=true', async () => {
                const dti = 'modal-dti';

                const TestComponent = () => {
                    const [open, setOpen] = React.useState(false);

                    return (
                        <>
                            <button data-test-id='trigger' onClick={() => setOpen(true)}>
                                Open
                            </button>
                            <UniversalModalDesktop
                                open={open}
                                disableRestoreFocus={true}
                                onClose={() => setOpen(false)}
                            >
                                <UniversalModalDesktop.Header
                                    title='Title'
                                    dataTestId={dti}
                                    hasCloser={true}
                                />
                            </UniversalModalDesktop>
                        </>
                    );
                };

                render(<TestComponent />);

                const trigger = screen.getByTestId('trigger');

                await userEvent.click(trigger);

                const closer = screen.getByTestId(getUniversalModalTestIds(dti).closer);

                await userEvent.click(closer);

                expect(trigger).not.toHaveFocus();
            });
        });
    });

    describe('portal container tests', () => {
        const textContent = 'Text content';
        const customPortalContainer = 'custom-portal-container';

        describe('desktop', () => {
            it('should render default container', () => {
                render(<UniversalModalDesktop open={true}>{textContent}</UniversalModalDesktop>);

                const portalContainer = document.querySelector('[alfa-portal-container]');
                const portalChild = screen.queryByText(textContent);

                expect(portalContainer).toContainElement(portalChild);
            });

            it('should render custom container', () => {
                const TestWrapper = () => {
                    const containerRef = useRef<HTMLDivElement>(null);
                    const getPortalContainer = () => containerRef.current;

                    return (
                        <>
                            <div ref={containerRef} data-test-id={customPortalContainer} />
                            <UniversalModalDesktop container={getPortalContainer} open={true}>
                                {textContent}
                            </UniversalModalDesktop>
                        </>
                    );
                };

                render(<TestWrapper />);

                const portalContainer = screen.queryByTestId(customPortalContainer);
                const portalChild = screen.queryByText(textContent);

                expect(portalContainer).toContainElement(portalChild);
            });
        });

        describe('mobile', () => {
            it('should render default container', () => {
                render(<UniversalModalMobile open={true}>{textContent}</UniversalModalMobile>);

                const portalContainer = document.querySelector('[alfa-portal-container]');
                const portalChild = screen.queryByText(textContent);

                expect(portalContainer).toContainElement(portalChild);
            });

            it('should render custom container', () => {
                const TestWrapper = () => {
                    const containerRef = useRef<HTMLDivElement>(null);
                    const getPortalContainer = () => containerRef.current;

                    return (
                        <>
                            <div ref={containerRef} data-test-id={customPortalContainer} />
                            <UniversalModalMobile container={getPortalContainer} open={true}>
                                {textContent}
                            </UniversalModalMobile>
                        </>
                    );
                };

                render(<TestWrapper />);

                const portalContainer = screen.queryByTestId(customPortalContainer);
                const portalChild = screen.queryByText(textContent);

                expect(portalContainer).toContainElement(portalChild);
            });
        });
    });
});
