import React from 'react';
import { render, screen } from '@testing-library/react';
import { UniversalModalDesktop } from './desktop';
import { UniversalModalMobile } from './mobile';
import { getUniversalModalTestIds } from './utils';
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
    it('UniversalModalDesktop snapshot', () => {
        render(
            <UniversalModalDesktop open={true}>
                <UniversalModalDesktop.Header title='Title' />
                <UniversalModalDesktop.Content>Content</UniversalModalDesktop.Content>
                <UniversalModalDesktop.Footer>Footer</UniversalModalDesktop.Footer>
            </UniversalModalDesktop>,
        );
        expect(screen.getByRole('dialog')).toMatchSnapshot();
    });

    it('UniversalModalMobile snapshot', () => {
        render(
            <UniversalModalMobile open={true}>
                <UniversalModalMobile.Header title='Title' />
                <UniversalModalMobile.Content>Content</UniversalModalMobile.Content>
                <UniversalModalMobile.Footer>Footer</UniversalModalMobile.Footer>
            </UniversalModalMobile>,
        );
        expect(screen.getByRole('dialog')).toMatchSnapshot();
    });

    it('UniversalModalResponsive snapshot', () => {
        render(
            <UniversalModalResponsive open={true}>
                <UniversalModalResponsive.Header title='Title' />
                <UniversalModalResponsive.Content>Content</UniversalModalResponsive.Content>
                <UniversalModalResponsive.Footer>Footer</UniversalModalResponsive.Footer>
            </UniversalModalResponsive>,
        );
        expect(screen.getByRole('dialog')).toMatchSnapshot();
    });

    it('should have data-test-id', () => {
        const dti = 'modal-dti';
        const { getByTestId } = render(
            <UniversalModalResponsive dataTestId={dti} open={true}>
                <UniversalModalResponsive.Header title='Title' />
                <UniversalModalResponsive.Content>Content</UniversalModalResponsive.Content>
                <UniversalModalResponsive.Footer>Footer</UniversalModalResponsive.Footer>
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
