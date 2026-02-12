import React, { useContext, ContextType, useEffect } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { getUniversalModalTestIds } from './utils/getUniversalModalTestIds';
import { UniversalModalDesktop } from './desktop';
import { UniversalModalMobile } from './mobile';
import { ModalContext } from './shared';

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

    describe('desktop content gap tests', () => {
        const dti = 'modal-dti';
        const testIds = getUniversalModalTestIds(dti);

        it.each(['withHeader', 'withFooter'])('should not have class %s', (className) => {
            render(
                <UniversalModalDesktop dataTestId={dti} open={true}>
                    <UniversalModalDesktop.Content dataTestId={dti} />
                </UniversalModalDesktop>,
            );

            const content = screen.queryByTestId(testIds.content);

            expect(content).not.toHaveClass(className);
        });

        it.each(['withHeader', 'withFooter'])('should have class %s', (className) => {
            render(
                <UniversalModalDesktop dataTestId={dti} open={true}>
                    <UniversalModalDesktop.Header dataTestId={dti} />
                    <UniversalModalDesktop.Content dataTestId={dti} />
                    <UniversalModalDesktop.Footer dataTestId={dti} />
                </UniversalModalDesktop>,
            );

            const content = screen.queryByTestId(testIds.content);

            expect(content).toHaveClass(className);
        });

        it('should render with header gap', () => {
            render(
                <UniversalModalDesktop dataTestId={dti} open={true}>
                    <UniversalModalDesktop.Header dataTestId={dti} />
                    <UniversalModalDesktop.Content dataTestId={dti} />
                </UniversalModalDesktop>,
            );

            const content = screen.queryByTestId(testIds.content);

            expect(content).toHaveClass('withHeader');
        });

        it('should render with footer gap', () => {
            render(
                <UniversalModalDesktop dataTestId={dti} open={true}>
                    <UniversalModalDesktop.Content dataTestId={dti} />
                    <UniversalModalDesktop.Footer dataTestId={dti} />
                </UniversalModalDesktop>,
            );

            const content = screen.queryByTestId(testIds.content);

            expect(content).toHaveClass('withFooter');
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
});
