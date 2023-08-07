import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, fireEvent, getByTestId, render, waitFor } from '@testing-library/react';

import { DateRangeInputDesktop as DateRangeInput } from './desktop';
import { parseDateString } from './utils';

describe('DateRangeInput', () => {
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

    describe('Controlled-way', () => {
        test('calendar must have the correct month when opened', async () => {
            const calendarTestId = 'calendar-test-id';
            const value = '12.04.2021 - 15.04.2021';
            const { queryByRole, getByTestId } = render(
                <DateRangeInput
                    picker={true}
                    calendarProps={{ dataTestId: calendarTestId }}
                    value={value}
                />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;

            act(() => {
                input.focus();
            });

            await waitFor(() => {
                expect(
                    getByTestId(calendarTestId).querySelector('button[class*="month"]'),
                ).toHaveTextContent('Апрель');

                expect(
                    getByTestId(calendarTestId).querySelector('button[class*="year"]'),
                ).toHaveTextContent('2021');
            });
        });

        it('should respond to changes from the outside', async () => {
            const value = '12.04.2021 - 15.04.2021';
            const newValue = '16.04.2021 - 20.04.2021';
            const { queryByRole, rerender } = render(
                <DateRangeInput picker={true} value={value} />,
            );

            rerender(<DateRangeInput picker={true} value={newValue} />);
            const input = queryByRole('textbox') as HTMLInputElement;

            await waitFor(() => {
                expect(input).toHaveValue(newValue);
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
