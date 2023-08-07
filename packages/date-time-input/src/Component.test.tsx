import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import { DateTimeInputDesktop as DateTimeInput } from './desktop';
import { addTimeToDate, getFullDateTime } from './utils';

describe('DateTimeInput', () => {
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

        it('should calls onComplete and onChange callbacks with picker prop', async () => {
            const calendarTestId = 'calendar-test-id';
            const onComplete = jest.fn();
            const onChange = jest.fn();
            const { queryByRole, getByTestId, getByText } = render(
                <DateTimeInput
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

            const day = '10';
            const date = new Date();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            date.setDate(parseInt(day));
            const dateAsString = `${day}.${month.toString().padStart(2, '0')}.${year}`;

            act(() => {
                fireEvent.click(getByText(day));
            });

            await waitFor(() => {
                expect(onChange).toBeCalledTimes(1);
                expect(onChange).toBeCalledWith(null, {
                    date: getFullDateTime(dateAsString),
                    value: dateAsString,
                });
            });

            act(() => {
                input.blur();
            });

            await waitFor(() => {
                expect(onComplete).toBeCalledTimes(1);
                expect(onComplete).toBeCalledWith(null, {
                    date: getFullDateTime(dateAsString),
                    value: addTimeToDate(dateAsString),
                });
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
