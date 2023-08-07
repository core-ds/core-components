import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, waitFor } from '@testing-library/react';

import { TimeInput } from './index';

describe('TimeInput', () => {
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
            expect(render(<TimeInput defaultValue='19:37' />).container).toMatchSnapshot();
        });
    });

    it('should set `data-test-id` attribute', () => {
        const testId = 'test-id';
        const { getByTestId } = render(<TimeInput dataTestId={testId} />);

        expect(getByTestId(testId)).toBeInTheDocument();
    });

    it('should set custom class', () => {
        const className = 'custom-class';
        const { container } = render(<TimeInput className={className} />);

        expect(container.firstElementChild).toHaveClass(className);
    });

    describe('Uncontrolled-way', () => {
        it('should set default value to input', () => {
            const value = '07:49';
            const { queryByRole } = render(<TimeInput defaultValue={value} />);

            expect(queryByRole('textbox')).toHaveValue(value);
        });

        it('should set value to input', async () => {
            const value = '07:49';
            const { queryByRole } = render(<TimeInput />);

            const input = queryByRole('textbox') as HTMLInputElement;

            userEvent.type(input, value);

            await waitFor(() => {
                expect(input).toHaveValue(value);
            });
        });
    });

    describe('Callback tests', () => {
        it('should call onChange callback', async () => {
            const onChange = jest.fn();
            const onComplete = jest.fn();
            const value = '07:27';
            const { queryByRole } = render(
                <TimeInput onChange={onChange} onComplete={onComplete} />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;

            userEvent.type(input, value);

            await waitFor(() => {
                expect(onComplete).toBeCalledTimes(1);
                expect(onChange).toBeCalledTimes(value.length);
            });
        });
    });

    describe('Render tests', () => {
        test('should unmount without errors', () => {
            const { unmount } = render(<TimeInput />);

            expect(unmount).not.toThrowError();
        });
    });
});
