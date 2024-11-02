import React from 'react';
import { render, screen } from '@testing-library/react';
import { UniversalModalDesktop } from './desktop';
import { UniversalModalMobile } from './mobile';
import { getUniversalModalTestIds } from './utils';
import { UniversalModalResponsive } from './Component.responsive';
import { getFooterWithContent, getHeaderWithNavigationWithTitle } from './desktop/presets';
import { getFooterWithContentMobile, getHeaderWithTitleWithSubtitleMobile } from './mobile/presets';

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

    describe('desktop presets', () => {
        it('getHeaderWithNavigationWithTitle', () => {
            const dti = 'modal-dti';
            const title = 'Title';

            const header_preset_type = getHeaderWithNavigationWithTitle({
                title: title,
                onBack: jest.fn(),
            });

            const { getByText, getByTestId } = render(
                <UniversalModalDesktop dataTestId={dti} open={true} {...header_preset_type}>
                    <UniversalModalDesktop.Content>Content</UniversalModalDesktop.Content>
                </UniversalModalDesktop>,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(getByTestId(testIds.header)).toBeInTheDocument();
            expect(getByText(title)).toBeInTheDocument();
        });

        it('getFooterWithContent', () => {
            const dti = 'modal-dti';
            const labelLeft = 'labelLeft';
            const labelRight = 'RightLabel';

            const footer_preset_type = getFooterWithContent({
                labelLeft,
                labelRight,
                onClickLabelLeft: jest.fn(),
                onClickLabelRight: jest.fn(),
            });

            const { getByTestId, getByText, container } = render(
                <UniversalModalDesktop dataTestId={dti} open={true} {...footer_preset_type}>
                    <UniversalModalDesktop.Content>Content</UniversalModalDesktop.Content>
                </UniversalModalDesktop>,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(getByTestId(testIds.footer)).toBeInTheDocument();
            expect(getByText(labelLeft)).toBeInTheDocument();
            expect(getByText(labelRight)).toBeInTheDocument();
        });
    });

    describe('mobile presets', () => {
        it('getHeaderWithTitleWithSubtitleMobile', () => {
            const dti = 'modal-dti';
            const title = 'Title';
            const subtitle = 'Subtitle';

            const header_preset_type = getHeaderWithTitleWithSubtitleMobile({
                title,
                subtitle,
            });

            const { getByText, getByTestId } = render(
                <UniversalModalMobile dataTestId={dti} open={true} {...header_preset_type}>
                    <UniversalModalMobile.Content>Content</UniversalModalMobile.Content>
                </UniversalModalMobile>,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(getByTestId(testIds.header)).toBeInTheDocument();
            expect(getByText(title)).toBeInTheDocument();
            expect(getByText(subtitle)).toBeInTheDocument();
        });

        it('getFooterWithContentMobile', () => {
            const dti = 'modal-dti';
            const labelLeft = 'labelLeft';
            const labelRight = 'RightLabel';

            const footer_preset_type = getFooterWithContentMobile({
                labelLeft,
                labelRight,
                layout: 'start',
                onClickLabelLeft: jest.fn(),
                onClickLabelRight: jest.fn(),
            });

            const { getByText, getByTestId } = render(
                <UniversalModalMobile dataTestId={dti} open={true} {...footer_preset_type}>
                    <UniversalModalMobile.Content>Content</UniversalModalMobile.Content>
                </UniversalModalMobile>,
            );

            const testIds = getUniversalModalTestIds(dti);

            expect(getByTestId(testIds.footer)).toBeInTheDocument();
            expect(getByText(labelLeft)).toBeInTheDocument();
            expect(getByText(labelRight)).toBeInTheDocument();
        });
    });
});
