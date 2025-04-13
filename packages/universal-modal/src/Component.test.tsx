import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { getUniversalModalTestIds } from './utils/getUniversalModalTestIds';
import { UniversalModalResponsive } from './Component.responsive';
import { UniversalModalDesktop } from './desktop';

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
    it('should have data-test-id', () => {
        const dti = 'modal-dti';

        render(
            <UniversalModalResponsive dataTestId={dti} open={true}>
                <UniversalModalResponsive.Header title='Title' dataTestId={dti} hasCloser={true} />
                <UniversalModalResponsive.Content dataTestId={dti} />
                <UniversalModalResponsive.Footer dataTestId={dti} />
            </UniversalModalResponsive>,
        );

        const testIds = getUniversalModalTestIds(dti);

        expect(screen.getByTestId(testIds.modal)).toBeInTheDocument();
        expect(screen.getByTestId(testIds.header)).toBeInTheDocument();
        expect(screen.getByTestId(testIds.title)).toBeInTheDocument();
        expect(screen.getByTestId(testIds.content)).toBeInTheDocument();
        expect(screen.getByTestId(testIds.footer)).toBeInTheDocument();
        expect(screen.getByTestId(testIds.closer)).toBeInTheDocument();
    });

    describe('interactive tests', () => {
        it('should close by context "onClose"', async () => {
            const dti = 'modal-dti';
            const handleClose = jest.fn();

            render(
                <UniversalModalDesktop dataTestId={dti} open={true} onClose={handleClose}>
                    <UniversalModalDesktop.Header title='Title' dataTestId={dti} hasCloser={true} />
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
                <UniversalModalDesktop dataTestId={dti} open={true} onClose={handleCloseContext}>
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
});
