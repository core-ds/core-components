import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, waitFor } from '@testing-library/react';

import { DateInput } from './index';

describe('DateInput', () => {
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

    describe('Display tests', () => {
        it('should match snapshot', () => {
            expect(render(<DateInput defaultValue='01.01.2021' />).container).toMatchSnapshot();
        });
    });

    it('should set `data-test-id` attribute', () => {
        const testId = 'test-id';
        const { getByTestId } = render(<DateInput dataTestId={testId} />);

        expect(getByTestId(testId)).toBeInTheDocument();
    });

    it('should set custom class', () => {
        const className = 'custom-class';
        const { container } = render(<DateInput className={className} />);

        expect(container.firstElementChild).toHaveClass(className);
    });

    it('should render input[type=date] if mobileMode=native', async () => {
        const { container } = render(<DateInput mobileMode='native' />);

        expect(container.querySelector('input[type="date"]')).toBeInTheDocument();
    });

    describe('Controlled-way', () => {
        it('should set value to input', () => {
            const value = '01.01.2020';
            const value2 = '02.01.2020';
            const { queryByRole, rerender } = render(<DateInput value={value} />);

            expect(queryByRole('textbox')).toHaveValue(value);

            rerender(<DateInput value={value2} />);

            expect(queryByRole('textbox')).toHaveValue(value2);
        });
    });

    describe('Uncontrolled-way', () => {
        it('should set default value to input', () => {
            const value = '01.01.2020';
            const { queryByRole } = render(<DateInput defaultValue={value} />);

            expect(queryByRole('textbox')).toHaveValue(value);
        });

        it('should set value to input', async () => {
            const value = '01.01.2020';
            const { queryByRole } = render(<DateInput />);

            const input = queryByRole('textbox') as HTMLInputElement;

            await userEvent.type(input, value);

            expect(input).toHaveValue(value);
        });
    });

    describe('Callback tests', () => {
        it('should call onChange callback', async () => {
            const onChange = jest.fn();
            const onComplete = jest.fn();
            const value = '01.01.2020';
            const { queryByRole } = render(
                <DateInput onChange={onChange} onComplete={onComplete} />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;

            await userEvent.type(input, value);

            expect(onComplete).toBeCalledTimes(1);
            expect(onChange).toBeCalledTimes(value.length);
        });
    });

    describe('Caret tests', () => {
        it('should be set correct caret position', async () => {
            const value = '01.01.2020';
            const { queryByRole } = render(<DateInput defaultValue={value} />);

            const input = queryByRole('textbox') as HTMLInputElement;

            await userEvent.type(input, '5', { initialSelectionStart: 4, initialSelectionEnd: 4 });

            await waitFor(() => expect(input.selectionStart).toBe(5));
            expect(input.value).toBe('01.05.2020');

            await userEvent.type(input, '1', { initialSelectionStart: 0, initialSelectionEnd: 0 });

            await waitFor(() => expect(input.selectionStart).toBe(1));
            expect(input.value).toBe('10.05.2020');

            await userEvent.type(input, '{Backspace}', {
                initialSelectionStart: 3,
                initialSelectionEnd: 3,
            });

            await waitFor(() => expect(input.selectionStart).toBe(2));
            expect(input.value).toBe('10.05.2020');

            await userEvent.type(input, '{Backspace}', {
                initialSelectionStart: 2,
                initialSelectionEnd: 2,
            });

            expect(input.selectionStart).toBe(1);
            expect(input.value).toBe('1.05.2020');
        });
    });

    describe('Render tests', () => {
        test('should unmount without errors', () => {
            const { unmount } = render(<DateInput />);

            expect(unmount).not.toThrowError();
        });
    });
});
