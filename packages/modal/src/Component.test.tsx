import React from 'react';
import { ModalDesktop, ModalDesktopProps } from './desktop';
import { ModalMobile, ModalMobileProps } from './mobile';
import { render, screen } from '@testing-library/react';
import { getModalTestIds } from './utils';

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

const ModalDesktopWrapper = (props: Partial<ModalDesktopProps>) => {
    return (
        <ModalDesktop open={true} transitionProps={{ timeout: 0 }} {...props}>
            <ModalDesktop.Header hasCloser={true} hasBackButton={true} title='Title' />
            <ModalDesktop.Content>Content</ModalDesktop.Content>
            <ModalDesktop.Footer>
                <ModalDesktop.Controls primary='Primary' secondary='Secondary' />
            </ModalDesktop.Footer>
        </ModalDesktop>
    );
};

const ModalMobileWrapper = (props: Partial<ModalMobileProps>) => {
    return (
        <ModalMobile open={true} {...props}>
            <ModalMobile.Header hasCloser={true} hasBackButton={true} title='Title' />
            <ModalMobile.Content>Content</ModalMobile.Content>
            <ModalMobile.Footer>
                <ModalMobile.Controls primary='Primary' secondary='Secondary' />
            </ModalMobile.Footer>
        </ModalMobile>
    );
};

const COMPONENT_NAME_TO_WRAPPER = {
    ModalDesktop: ModalDesktopWrapper,
    ModalMobile: ModalMobileWrapper,
} as const;

(['ModalDesktop', 'ModalMobile'] as const).forEach((componentName) => {
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

                const testIds = getModalTestIds(dti);

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
