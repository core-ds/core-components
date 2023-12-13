import React from 'react';
import { SidePanelDesktop, SidePanelDesktopProps } from './desktop';
import { SidePanelMobile, SidePanelMobileProps } from './mobile';
import { render, screen } from '@testing-library/react';
import { getSidePanelTestIds } from './utils';

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

const SidePanelDesktopWrapper = (props: Partial<SidePanelDesktopProps>) => {
    return (
        <SidePanelDesktop open={true} {...props}>
            <SidePanelDesktop.Header hasCloser={true} hasBackButton={true} title='Title' />
            <SidePanelDesktop.Content>Content</SidePanelDesktop.Content>
            <SidePanelDesktop.Footer>
                <SidePanelDesktop.Controls primary='Primary' secondary='Secondary' />
            </SidePanelDesktop.Footer>
        </SidePanelDesktop>
    );
};

const SidePanelMobileWrapper = (props: Partial<SidePanelMobileProps>) => {
    return (
        <SidePanelMobile open={true} {...props}>
            <SidePanelMobile.Header hasCloser={true} hasBackButton={true} title='Title' />
            <SidePanelMobile.Content>Content</SidePanelMobile.Content>
            <SidePanelMobile.Footer>
                <SidePanelMobile.Controls primary='Primary' secondary='Secondary' />
            </SidePanelMobile.Footer>
        </SidePanelMobile>
    );
};

const COMPONENT_NAME_TO_WRAPPER = {
    SidePanelDesktop: SidePanelDesktopWrapper,
    SidePanelMobile: SidePanelMobileWrapper,
} as const;

(['SidePanelDesktop', 'SidePanelMobile'] as const).forEach((componentName) => {
    const Component = COMPONENT_NAME_TO_WRAPPER[componentName];

    describe(componentName, () => {
        describe('snapshots tests', () => {
            it('should match snapshot', () => {
                render(<Component />);
                expect(screen.getByRole('dialog')).toMatchSnapshot();
            });
        });

        describe('attributes test', () => {
            it('should have data-test-id', () => {
                const dti = 'modal-dti';
                const { getByTestId } = render(<Component dataTestId={dti} />);

                const testIds = getSidePanelTestIds(dti);

                expect(getByTestId(testIds.modal)).toBeInTheDocument();
                expect(getByTestId(testIds.header)).toBeInTheDocument();
                expect(getByTestId(testIds.title)).toBeInTheDocument();
                expect(getByTestId(testIds.content)).toBeInTheDocument();
                expect(getByTestId(testIds.footer)).toBeInTheDocument();
                expect(getByTestId(testIds.controls)).toBeInTheDocument();
                expect(getByTestId(testIds.closer)).toBeInTheDocument();
                expect(getByTestId(testIds.backButton)).toBeInTheDocument();
            });
        });
    });
});
