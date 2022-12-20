import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, waitFor } from '@testing-library/react';

import { DateRangeInput } from './index';

describe('DateRangeInput', () => {
    describe('Display tests', () => {
        it('should match snapshot', () => {
            expect(
                render(<DateRangeInput defaultValue='12.12.2021 - 10.04.2022' />).container,
            ).toMatchSnapshot();
        });
    });

    it('should set `data-test-id` attribute', () => {
        const testId = 'test-id';
        const { getByTestId } = render(<DateRangeInput dataTestId={testId} />);

        expect(getByTestId(testId)).toBeInTheDocument();
    });

    it('should set custom class', () => {
        const className = 'custom-class';
        const { container } = render(<DateRangeInput className={className} />);

        expect(container.firstElementChild).toHaveClass(className);
    });

    describe('Uncontrolled-way', () => {
        it('should set default value to input', () => {
            const value = '12.12.2021 - 10.04.2022';
            const { queryByRole } = render(<DateRangeInput defaultValue={value} />);

            expect(queryByRole('textbox')).toHaveValue(value);
        });

        it('should set value to input', async () => {
            const value = '12.12.2021 - 10.04.2022';
            const { queryByRole } = render(<DateRangeInput />);

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
            const value = '12.12.2021 - 10.04.2022';
            const { queryByRole } = render(
                <DateRangeInput onChange={onChange} onComplete={onComplete} />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;

            await userEvent.type(input, value);

            await waitFor(() => {
                expect(onComplete).toBeCalledTimes(2);
                expect(onChange).toBeCalledTimes(value.length + 2);
            });
        });
    });

    describe('Render tests', () => {
        test('should unmount without errors', () => {
            const { unmount } = render(<DateRangeInput />);

            expect(unmount).not.toThrowError();
        });
    });
});
