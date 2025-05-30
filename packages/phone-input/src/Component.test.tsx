import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PhoneInput } from './index';

describe('PhoneInput', () => {
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

    it('should match snapshot', () => {
        expect(render(<PhoneInput />)).toMatchSnapshot();
    });

    describe('should right delete number', () => {
        it('"+7 1" -> press backspace -> "+7 "', async () => {
            const { getByTestId } = render(<PhoneInput dataTestId={dataTestId} />);
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            fireEvent.change(inputElement, { target: { value: '+7 1' } });
            await userEvent.type(inputElement, '{backspace}');
            expect(inputElement.value).toBe('+7 ');
        });

        it('with clearableCountryCode === true', async () => {
            const { getByTestId } = render(
                <PhoneInput dataTestId={dataTestId} clearableCountryCode={true} />,
            );
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            await userEvent.type(inputElement, '2');

            expect(inputElement.value).toBe('+7 2');

            await userEvent.type(inputElement, '{backspace}', {
                initialSelectionStart: 0,
                initialSelectionEnd: inputElement.value.length,
            });

            expect(inputElement.value).toBe('');
        });

        it('with clearableCountryCode === false', async () => {
            const { getByTestId } = render(
                <PhoneInput dataTestId={dataTestId} clearableCountryCode={false} />,
            );
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            await userEvent.type(inputElement, '2');

            expect(inputElement.value).toBe('+7 2');

            await userEvent.type(inputElement, '{backspace}', {
                initialSelectionStart: 0,
                initialSelectionEnd: inputElement.value.length,
            });

            expect(inputElement.value).toBe('+7 ');
        });
    });

    describe('should update input by value prop', () => {
        it('with clearableCountryCode === true', () => {
            const { getByTestId, rerender } = render(
                <PhoneInput dataTestId={dataTestId} clearableCountryCode={true} />,
            );
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            expect(inputElement.value).toBe('');

            rerender(<PhoneInput dataTestId={dataTestId} value='99' />);

            expect(inputElement.value).toBe('+7 99');
        });

        it('with clearableCountryCode === false', () => {
            const { getByTestId, rerender } = render(
                <PhoneInput dataTestId={dataTestId} clearableCountryCode={false} />,
            );
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            expect(inputElement.value).toBe('+7 ');

            rerender(<PhoneInput dataTestId={dataTestId} value='99' />);

            expect(inputElement.value).toBe('+7 99');
        });
    });

    describe('should format a phone number according default to mask', () => {
        it('input "+" -> "+7 "', () => {
            const { getByTestId } = render(<PhoneInput dataTestId={dataTestId} />);
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            fireEvent.change(inputElement, { target: { value: '+' } });
            expect(inputElement.value).toBe('+7 ');
        });

        it('input "7" -> "+7 "', () => {
            const { getByTestId } = render(<PhoneInput dataTestId={dataTestId} />);
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            fireEvent.change(inputElement, { target: { value: '7' } });
            expect(inputElement.value).toBe('+7 ');
        });

        it('input "8" -> "+7 "', async () => {
            const { getByTestId } = render(<PhoneInput dataTestId={dataTestId} />);
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            await userEvent.type(inputElement, '8');
            expect(inputElement.value).toBe('+7 ');
        });

        it('input "1" -> "+7 1"', async () => {
            const { getByTestId } = render(<PhoneInput dataTestId={dataTestId} />);
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            await userEvent.type(inputElement, '1');
            expect(inputElement.value).toBe('+7 1');
        });

        it('insert "+71112223344" -> "+7 111 222 33 44"', () => {
            const { getByTestId } = render(<PhoneInput dataTestId={dataTestId} />);
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            fireEvent.change(inputElement, { target: { value: '+71112223344' } });
            expect(inputElement.value).toBe('+7 111 222 33 44');
        });

        it('insert "81112223344" -> "+7 111 222 33 44"', () => {
            const { getByTestId } = render(<PhoneInput dataTestId={dataTestId} />);
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            fireEvent.change(inputElement, { target: { value: '81112223344' } });
            expect(inputElement.value).toBe('+7 111 222 33 44');
        });

        it('insert "1112223344" -> "+7 111 222 33 44"', () => {
            const { getByTestId } = render(<PhoneInput dataTestId={dataTestId} />);
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            fireEvent.change(inputElement, { target: { value: '1112223344' } });
            expect(inputElement.value).toBe('+7 111 222 33 44');
        });

        it('insert "8882223344" -> "+7 888 222 33 44"', () => {
            const { getByTestId } = render(<PhoneInput dataTestId={dataTestId} />);
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            fireEvent.change(inputElement, { target: { value: '8882223344' } });
            expect(inputElement.value).toBe('+7 888 222 33 44');
        });

        it('insert "71112223344" -> "+7 111 222 33 44"', () => {
            const { getByTestId } = render(<PhoneInput dataTestId={dataTestId} />);
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            fireEvent.change(inputElement, { target: { value: '71112223344' } });
            expect(inputElement.value).toBe('+7 111 222 33 44');
        });

        it('insert "8 (111) 222-33-44" -> "+7 111 222 33 44"', () => {
            const { getByTestId } = render(<PhoneInput dataTestId={dataTestId} />);
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            fireEvent.change(inputElement, { target: { value: '8 (111) 222-33-44' } });
            expect(inputElement.value).toBe('+7 111 222 33 44');
        });

        it('insert "111222334455" -> "+7 111 222 33 44"', () => {
            const { getByTestId } = render(<PhoneInput dataTestId={dataTestId} />);
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            fireEvent.change(inputElement, { target: { value: '111222334455' } });
            expect(inputElement.value).toBe('+7 111 222 33 44');
        });
    });

    describe('insertion tests', () => {
        it('should process insertion after plus', () => {
            const { getByTestId } = render(<PhoneInput dataTestId={dataTestId} value={'111'} />);
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            fireEvent.change(inputElement, { target: { value: '+2227 111' } });

            expect(inputElement).toHaveValue('+7 222 111');
        });

        it('should process insertion before plus', () => {
            const { getByTestId } = render(<PhoneInput dataTestId={dataTestId} value={'111'} />);
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            fireEvent.change(inputElement, { target: { value: '222+7 111' } });

            expect(inputElement).toHaveValue('+7 222 111');
        });

        it('should process change value', () => {
            const { getByTestId } = render(<PhoneInput dataTestId={dataTestId} value={'111'} />);
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            fireEvent.change(inputElement, { target: { value: '7666' } });

            expect(inputElement).toHaveValue('+7 666');
        });

        it('should process change value with renderer', () => {
            const { getByTestId, rerender } = render(
                <PhoneInput dataTestId={dataTestId} value={'111'} />,
            );
            const inputElement = getByTestId(dataTestId) as HTMLInputElement;

            rerender(<PhoneInput dataTestId={dataTestId} value={'7666'} />);

            expect(inputElement).toHaveValue('+7 666');
        });
    });
});
