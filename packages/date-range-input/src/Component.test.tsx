import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import { DateRangeInput } from './index';
import { parseDateString } from './utils';

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

        it('should calls onComplete and onChange callbacks with picker prop', async () => {
            const calendarTestId = 'calendar-test-id';
            const onComplete = jest.fn();
            const onChange = jest.fn();
            const { queryByRole, getByTestId, getByText } = render(
                <DateRangeInput
                    onComplete={onComplete}
                    onChange={onChange}
                    picker={true}
                    calendarProps={{ dataTestId: calendarTestId }}
                />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;

            act(() => {
                input.focus();
            });

            await waitFor(() => {
                expect(getByTestId(calendarTestId)).toBeInTheDocument();
            });

            const dayFrom = '10';
            const dateFrom = new Date();
            const monthFrom = dateFrom.getMonth() + 1;
            const yearFrom = dateFrom.getFullYear();
            dateFrom.setDate(parseInt(dayFrom));
            const dateAsStringFrom = `${dayFrom}.${monthFrom
                .toString()
                .padStart(2, '0')}.${yearFrom}`;

            act(() => {
                fireEvent.click(getByText(dayFrom));
            });

            await waitFor(() => {
                expect(onChange).toBeCalledTimes(1);
                expect(onChange).toBeCalledWith({
                    dateFrom: parseDateString(dateAsStringFrom),
                    dateTo: undefined,
                    value: dateAsStringFrom,
                });
            });

            const dayTo = '12';
            const dateTo = new Date();
            const monthTo = dateTo.getMonth() + 1;
            const yearTo = dateTo.getFullYear();
            dateTo.setDate(parseInt(dayTo));
            const dateAsStringTo = `${dayTo}.${monthTo.toString().padStart(2, '0')}.${yearTo}`;

            act(() => {
                fireEvent.click(getByText(dayTo));
            });

            await waitFor(() => {
                expect(onComplete).toBeCalledTimes(1);
                expect(onComplete).toBeCalledWith({
                    dateFrom: parseDateString(dateAsStringFrom),
                    dateTo: parseDateString(dateAsStringTo),
                    value: `${dateAsStringFrom} - ${dateAsStringTo}`,
                });
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
