import React, { useContext, ContextType, useEffect, useRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { getUniversalModalTestIds } from './utils/getUniversalModalTestIds';
import { UniversalModalDesktop } from './desktop';
import { UniversalModalMobile } from './mobile';
import { ModalContext } from './Context';

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

    describe('desktop context tests', () => {
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
    });

    describe('desktop highlight tests', () => {
        const dti = 'modal-dti';
        const testIds = getUniversalModalTestIds(dti);

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
