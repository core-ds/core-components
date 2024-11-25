import React from 'react';
import { render } from '@testing-library/react';
import { NavigationBarPrivateMobile } from '.';
import { NavigationBarPrivateProps } from './types';

const testComponents = { NavigationBarPrivateMobile };
const dti = 'navigation-bar-dti';

Object.entries(testComponents).forEach(([componentName, TestComponent]) => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    const NavigationBarWrapper = (props: Partial<NavigationBarPrivateProps>) => {
        return (
            <TestComponent
                dataTestId={dti}
                title='some title'
                hasBackButton={true}
                hasCloser={true}
                {...props}
            />
        );
    };

    describe(`Navigation Bar ${componentName}`, () => {
        describe('Snapshots tests', () => {
            it('should match snapshot', () => {
                const { baseElement } = render(<NavigationBarWrapper />);

                expect(baseElement).toMatchSnapshot();
            });
        });

        describe('props tests', () => {
            it('should set back button props', () => {
                const backButtonProps = {
                    className: 'back-button',
                    'data-test-id': 'back-button-id',
                    text: 'Back',
                };

                const { getByTestId, getByText } = render(
                    <NavigationBarWrapper backButtonProps={backButtonProps} />,
                );

                expect(getByTestId(backButtonProps['data-test-id'])).toBeInTheDocument();
                expect(getByText(backButtonProps.text)).toBeInTheDocument();
                expect(getByTestId(backButtonProps['data-test-id'])).toHaveClass(
                    backButtonProps.className,
                );
            });
        });
    });
});
