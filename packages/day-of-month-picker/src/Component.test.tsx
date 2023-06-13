import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';

import { DayOfMonthPicker } from './index';

describe('DayOfMonthPicker', () => {
    describe('Display tests', () => {
        it('should match snapshot', () => {
            expect(
                render(<DayOfMonthPicker onChange={() => {}} value={1} />).container,
            ).toMatchSnapshot();
        });
    });

    it('should set custom class', () => {
        const className = 'custom-class';
        const { container } = render(
            <DayOfMonthPicker onChange={() => {}} value={1} className={className} />,
        );

        expect(container.firstElementChild).toHaveClass(className);
    });

    describe('Open/Close behavior', () => {
        it('should open calendar on click', async () => {
            const { container } = render(<DayOfMonthPicker onChange={() => {}} value={1} />);
            const component = container.firstElementChild as HTMLDivElement;

            await waitFor(() => {
                fireEvent.click(component);
                expect(document.querySelector('.inputWrapper')).toBeInTheDocument();
            });
        });

        it('should open calendar on focus', async () => {
            const { container } = render(<DayOfMonthPicker onChange={() => {}} value={1} />);
            const component = container.firstElementChild as HTMLDivElement;

            await waitFor(() => {
                fireEvent.focus(component);
                expect(document.querySelector('.inputWrapper')).toBeInTheDocument();
            });
        });

        it('should close calendar on blur', async () => {
            const { container } = render(<DayOfMonthPicker onChange={() => {}} value={1} />);
            const component = container.firstElementChild as HTMLDivElement;

            await waitFor(() => {
                fireEvent.focus(component);
                expect(document.querySelector('.calendarContainer')).toBeInTheDocument();
            });

            await waitFor(() => {
                fireEvent.blur(component);
                expect(document.querySelector('.calendarContainer')).not.toBeInTheDocument();
            });
        });

        it('should close calendar on escape', async () => {
            const { container } = render(<DayOfMonthPicker onChange={() => {}} value={1} />);
            const component = container.firstElementChild as HTMLDivElement;

            await waitFor(() => {
                fireEvent.focus(component);
                expect(document.querySelector('.inputWrapper')).toBeInTheDocument();
            });

            fireEvent.keyDown(component, { key: 'Escape' });

            await waitFor(() => {
                expect(document.querySelector('.calendarContainer')).not.toBeInTheDocument();
            });
        });

        it('should toggle calendar on enter if input focused', async () => {
            const { container, queryByRole } = render(
                <DayOfMonthPicker onChange={() => {}} value={1} />,
            );
            const component = container.firstElementChild as HTMLDivElement;
            const input = queryByRole('textbox') as HTMLInputElement;

            await waitFor(() => {
                fireEvent.focus(component);
                expect(document.querySelector('.calendarContainer')).toBeInTheDocument();
            });

            fireEvent.keyDown(component, { key: 'Enter' });

            await waitFor(() => {
                expect(document.querySelector('.calendarContainer')).toBeInTheDocument();
            });

            fireEvent.keyDown(input, { key: 'Enter' });

            await waitFor(() => {
                expect(document.querySelector('.calendarContainer')).not.toBeInTheDocument();
            });

            fireEvent.keyDown(input, { key: 'Enter' });

            await waitFor(() => {
                expect(document.querySelector('.calendarContainer')).toBeInTheDocument();
            });
        });
    });

    describe('Controlled-way', () => {
        it('should set value to input', () => {
            const { queryByRole, rerender } = render(
                <DayOfMonthPicker value={1} onChange={() => {}} />,
            );

            expect(queryByRole('textbox')).toHaveValue('1');

            rerender(<DayOfMonthPicker value={31} onChange={() => {}} />);

            expect(queryByRole('textbox')).toHaveValue('В последний день месяца');
        });

        it('should set value to calendar', async () => {
            const { container, rerender, getByTestId } = render(
                <DayOfMonthPicker value={1} onChange={() => {}} />,
            );
            const component = container.firstElementChild as HTMLDivElement;
            await waitFor(() => {
                fireEvent.focus(component);
            });

            const selectedButton = document.querySelector(
                'td[aria-selected="true"]',
            ) as HTMLButtonElement;

            expect(selectedButton).toBeInTheDocument();

            const day = +(selectedButton.getAttribute('data-day') as string);

            expect(day).toBe(1);

            await waitFor(() => {
                rerender(<DayOfMonthPicker value={31} onChange={() => {}} />);
            });
            const component1 = container.firstElementChild as HTMLDivElement;
            await waitFor(() => {
                fireEvent.focus(component1);
            });
            expect(getByTestId('last-day-button')).toHaveTextContent('В последний день');
        });
    });

    describe('Callback tests', () => {
        it('should call onChange callback', async () => {
            const cb = jest.fn();
            const defaultDay = 1;
            const { getByText, container, getByTestId } = render(
                <DayOfMonthPicker value={defaultDay} onChange={cb} />,
            );
            const component = container.firstElementChild as HTMLDivElement;
            await waitFor(() => {
                fireEvent.focus(component);
            });
            getByText('3').click();
            const selectedDay = cb.mock.calls[0][0];

            expect(cb).toBeCalledTimes(1);
            expect(selectedDay).toBeTruthy();
            expect(selectedDay).toBe(3);
        });
    });

    describe('Render tests', () => {
        test('should unmount without errors', () => {
            const { unmount } = render(<DayOfMonthPicker value={31} onChange={() => {}} />);

            expect(unmount).not.toThrowError();
        });
    });
});
