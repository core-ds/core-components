import React from 'react';
import { render } from '@testing-library/react';
import { getUniversalModalTestIds } from './utils/getUniversalModalTestIds';
import { UniversalModalResponsive } from './Component.responsive';

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

        const { getByTestId } = render(
            <UniversalModalResponsive dataTestId={dti} open={true}>
                <UniversalModalResponsive.Header title='Title' dataTestId={dti} />
                <UniversalModalResponsive.Content dataTestId={dti} />
                <UniversalModalResponsive.Footer dataTestId={dti} />
            </UniversalModalResponsive>,
        );

        const testIds = getUniversalModalTestIds(dti);

        expect(getByTestId(testIds.modal)).toBeInTheDocument();
        expect(getByTestId(testIds.header)).toBeInTheDocument();
        expect(getByTestId(testIds.title)).toBeInTheDocument();
        expect(getByTestId(testIds.content)).toBeInTheDocument();
        expect(getByTestId(testIds.footer)).toBeInTheDocument();
    });
});
