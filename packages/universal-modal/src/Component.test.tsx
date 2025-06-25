import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { getUniversalModalTestIds } from './utils/getUniversalModalTestIds';
import { UniversalModalDesktop } from './desktop';
import { UniversalModalMobile } from './mobile';

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
});
