import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, waitFor } from '@testing-library/react';

import { DateTimeInput } from './index';

describe('DateTimeInput', () => {
    describe('Display tests', () => {
        it('should match snapshot', () => {
            expect(
                render(<DateTimeInput defaultValue='12.12.2021, 14:22' />).container,
            ).toMatchSnapshot();
        });
    });

    it('should set `data-test-id` attribute', () => {
        const testId = 'test-id';
        const { getByTestId } = render(<DateTimeInput dataTestId={testId} />);

        expect(getByTestId(testId)).toBeInTheDocument();
    });

    it('should set custom class', () => {
        const className = 'custom-class';
        const { container } = render(<DateTimeInput className={className} />);

        expect(container.firstElementChild).toHaveClass(className);
    });

    describe('Uncontrolled-way', () => {
        it('should set default value to input', () => {
            const value = '12.12.2021, 14:22';
            const { queryByRole } = render(<DateTimeInput defaultValue={value} />);

            expect(queryByRole('textbox')).toHaveValue(value);
        });

        it('should set value to input', async () => {
            const value = '12.12.2021, 14:22';
            const { queryByRole } = render(<DateTimeInput />);

            const input = queryByRole('textbox') as HTMLInputElement;

            await userEvent.type(input, value);

            await waitFor(() => {
                expect(input).toHaveValue(value);
            });
        });
    });

    describe('Callback tests', () => {
        it('should call onChange callback', async () => {
            const onChange = jest.fn();
            const onComplete = jest.fn();
            const value = '12.12.2021, 14:22';
            const { queryByRole } = render(
                <DateTimeInput onChange={onChange} onComplete={onComplete} />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;

            await userEvent.type(input, value);

            await waitFor(() => {
                expect(onComplete).toBeCalledTimes(1);
                expect(onChange).toBeCalledTimes(value.length);
            });
        });
    });

    describe('Render tests', () => {
        test('should unmount without errors', () => {
            const { unmount } = render(<DateTimeInput />);

            expect(unmount).not.toThrowError();
        });
    });
});
