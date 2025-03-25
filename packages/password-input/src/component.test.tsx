import React, { useState, FC } from 'react';
import { render, fireEvent } from '@testing-library/react';

import { PasswordInput, PasswordInputProps } from '.';

const ControlledPasswordInput: FC<PasswordInputProps> = (props) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handlePasswordVisibleChange = (visible: boolean) => {
        setPasswordVisible(visible);
    };

    return (
        <PasswordInput
            {...props}
            passwordVisible={passwordVisible}
            onPasswordVisibleChange={handlePasswordVisibleChange}
        />
    );
};

const isPasswordHidden = (input: HTMLInputElement) => input.getAttribute('type') === 'password';
const isPasswordVisible = (input: HTMLInputElement) => input.getAttribute('type') === 'text';

describe('PasswordInput', () => {
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

    const dataTestId = 'test-id';

    describe('snapshots tests', () => {
        it('should match snapshot', () => {
            expect(render(<PasswordInput />).baseElement).toMatchSnapshot();
        });
    });

    describe('interactions tests', () => {
        it('should switch password visibility (uncontrolled)', () => {
            const { baseElement, getByTestId } = render(<PasswordInput dataTestId={dataTestId} />);

            const button = baseElement.querySelector('button') as HTMLButtonElement;
            const input = getByTestId(dataTestId) as HTMLInputElement;

            expect(isPasswordHidden(input)).toBe(true);

            fireEvent.click(button);

            expect(isPasswordVisible(input)).toBe(true);

            fireEvent.click(button);

            expect(isPasswordHidden(input)).toBe(true);
        });

        it('should switch password visibility (controlled)', () => {
            const { baseElement, getByTestId } = render(
                <ControlledPasswordInput dataTestId={dataTestId} />,
            );

            const button = baseElement.querySelector('button') as HTMLButtonElement;
            const input = getByTestId(dataTestId) as HTMLInputElement;

            expect(isPasswordHidden(input)).toBe(true);

            fireEvent.click(button);

            expect(isPasswordVisible(input)).toBe(true);

            fireEvent.click(button);

            expect(isPasswordHidden(input)).toBe(true);
        });
    });

    describe('check ToolTipHint', () => {
        let getByRole: ReturnType<typeof render>['getByRole'];
        let rerender: ReturnType<typeof render>['rerender'];
        let onPasswordVisibleChange: jest.Mock;

        describe('SUCCESS_CASES', () => {
            beforeEach(() => {
                ({ getByRole } = render(<PasswordInput />));
            });

            it('should initially display tooltip "Показать"', () => {
                expect(getByRole('button')).toHaveAttribute('title', 'Показать');
            });

            it('should display tooltip "Скрыть" after one click', () => {
                const eyeButton = getByRole('button');
                fireEvent.click(eyeButton);

                expect(eyeButton).toHaveAttribute('title', 'Скрыть');
            });

            it('should revert to tooltip "Показать" after two clicks', () => {
                const eyeButton = getByRole('button');
                fireEvent.click(eyeButton);
                fireEvent.click(eyeButton);

                expect(eyeButton).toHaveAttribute('title', 'Показать');
            });
        });

        describe('EDGE_CASES', () => {
            beforeEach(() => {
                onPasswordVisibleChange = jest.fn();
                ({ getByRole, rerender } = render(
                    <PasswordInput
                        passwordVisible={false}
                        onPasswordVisibleChange={onPasswordVisibleChange}
                    />,
                ));
            });

            it('should call onPasswordVisibleChange with true when clicked in controlled mode', () => {
                const eyeButton = getByRole('button');
                fireEvent.click(eyeButton);

                expect(onPasswordVisibleChange).toHaveBeenCalledWith(true);
            });

            it('should display tooltip "Скрыть" after re-rendering with passwordVisible true', () => {
                rerender(
                    <PasswordInput passwordVisible={true} onPasswordVisibleChange={jest.fn()} />,
                );

                expect(getByRole('button')).toHaveAttribute('title', 'Скрыть');
            });
        });

        describe('ERROR_CASES', () => {
            it('should be disabled', () => {
                let getByRole: ReturnType<typeof render>['getByRole'];
                ({ getByRole } = render(<PasswordInput disabled />));

                expect(getByRole('button')).toBeDisabled();
            });
        });
    });
});
