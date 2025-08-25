/* eslint-disable complexity */
import React, { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { addMonths, endOfMonth, isSameMonth, max, startOfMonth, subMonths } from 'date-fns';

import { CalendarDesktop } from '@alfalab/core-components-calendar/desktop';
import { usePeriodWithReset } from '@alfalab/core-components-calendar/shared';
import {
    formatDate,
    isValidInputValue,
    parseDateString,
} from '@alfalab/core-components-calendar-input/shared';
import {
    DateInput,
    DateInputProps,
    isCompleteDateInput,
} from '@alfalab/core-components-date-input';
import { getDataTestId } from '@alfalab/core-components-shared';

import { CalendarRangeProps } from '../Component';
import { Divider } from '../components/divider';
import { useSelectionProps, useStaticViewMonthes } from '../hooks';
import { isDayButton } from '../utils';

import styles from './index.module.css';

export type CalendarRangeStaticProps = Omit<CalendarRangeProps, 'calendarPosition'> & {
    /**
     * Отображать начальный месяц слева или справа (влияет только на начальный рендер)
     */
    defaultMonthPosition?: 'left' | 'right';
};

export const CalendarRangeStatic: FC<CalendarRangeStaticProps> = ({
    className,
    defaultMonth = startOfMonth(new Date()).getTime(),
    defaultMonthPosition = 'left',
    minDate,
    maxDate,
    valueFrom = '',
    valueTo = '',
    onDateFromChange = () => null,
    onDateToChange = () => null,
    onChange = () => null,
    onError,
    inputFromProps = {},
    inputToProps = {},
    offDays,
    events,
    returnInvalidDates = false,
    dataTestId,
    calendarContainerClassName,
}) => {
    const [inputFromValue, setInputFromValue] = useState<string>(valueFrom);
    const [inputToValue, setInputToValue] = useState<string>(valueTo);

    let dateFrom = isValidInputValue(inputFromValue, minDate, maxDate, offDays)
        ? parseDateString(inputFromValue).getTime()
        : null;

    const dateTo = isValidInputValue(inputToValue, dateFrom || minDate, maxDate, offDays)
        ? parseDateString(inputToValue).getTime()
        : null;

    if (isCompleteDateInput(inputToValue) && !dateTo && !returnInvalidDates) {
        dateFrom = null;
    }

    const bothInvalid =
        isCompleteDateInput(inputFromValue) &&
        isCompleteDateInput(inputToValue) &&
        parseDateString(inputFromValue).getTime() > parseDateString(inputToValue).getTime();

    const [highlightedDate, setHighlightedDate] = useState<number | undefined>(undefined);

    const period = usePeriodWithReset({
        initialSelectedFrom: dateFrom ? parseDateString(inputFromValue).getTime() : undefined,
        initialSelectedTo: dateTo ? parseDateString(inputToValue).getTime() : undefined,
    });

    const validateInputFromValue = useCallback(
        (value: string) => isValidInputValue(value, minDate, dateFrom || maxDate, offDays),
        [dateFrom, maxDate, minDate, offDays],
    );

    const validateInputToValue = useCallback(
        (value: string) => isValidInputValue(value, dateFrom || minDate, maxDate, offDays),

        [dateFrom, minDate, maxDate, offDays],
    );

    const [inputFromInvalid, setInputFromInvalid] = useState<boolean>(
        isCompleteDateInput(inputFromValue) && dateFrom === null,
    );

    const [inputToInvalid, setInputToInvalid] = useState<boolean>(
        isCompleteDateInput(inputToValue) && dateTo === null,
    );

    const hasValidateError = bothInvalid || inputFromInvalid || inputToInvalid;
    const {
        calendarProps: calendarFromProps,
        onInputChange: onInputChangeFrom,
        ...dateInputFromProps
    } = inputFromProps;
    const {
        calendarProps: calendarToProps,
        onInputChange: onInputChangeTo,
        ...dateInputToProps
    } = inputToProps;

    const { monthFrom, monthTo, handleMonthFromChange, handleMonthToChange } = useStaticViewMonthes(
        {
            selectedFrom: period.selectedFrom,
            selectedTo: period.selectedTo,
            defaultMonth,
            defaultMonthPosition,
        },
    );

    const handleValidInputFrom = useCallback(() => {
        setInputFromInvalid(inputFromValue !== '' && !validateInputFromValue(inputFromValue));
    }, [inputFromValue, validateInputFromValue]);

    const handleValidInputTo = useCallback(() => {
        setInputToInvalid(inputToValue !== '' && !validateInputToValue(inputToValue));
    }, [inputToValue, validateInputToValue]);

    const handleInputFromChange: Required<DateInputProps>['onChange'] = (event, payload) => {
        setInputFromValue(payload.value);
        onInputChangeFrom?.(event, payload);
    };

    const handleInputToChange: Required<DateInputProps>['onChange'] = (event, payload) => {
        setInputToValue(payload.value);
        onInputChangeTo?.(event, payload);
    };

    const handleMouseOver = useCallback((event: MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;

        const mouseOverDayButton = isDayButton(target) || isDayButton(target.parentElement);

        let date;

        if (mouseOverDayButton) {
            const button =
                target.tagName === 'BUTTON' ? target : (target.parentElement as HTMLButtonElement);

            if (button.dataset.date) {
                date = +button.dataset.date;
            }
        }

        setHighlightedDate(date);
    }, []);

    const handleClearFrom = useCallback(() => {
        setInputFromValue('');
    }, []);

    const handleClearTo = useCallback(() => {
        setInputToValue('');
    }, []);

    useEffect(() => {
        setInputFromValue(period.selectedFrom ? formatDate(period.selectedFrom) : '');
    }, [period.selectedFrom]);

    useEffect(() => {
        setInputToValue(period.selectedTo ? formatDate(period.selectedTo) : '');
    }, [period.selectedTo]);

    useEffect(() => {
        setInputFromValue(valueFrom);
    }, [valueFrom]);

    useEffect(() => {
        setInputToValue(valueTo);
    }, [valueTo]);

    useEffect(() => {
        if (!inputFromValue || isCompleteDateInput(inputFromValue)) {
            handleValidInputFrom();
        }

        period.setStart(dateFrom || undefined);
        if (dateTo) {
            period.setEnd(dateTo);
        }

        if (inputFromValue !== valueFrom) {
            onDateFromChange({
                value: inputFromValue,
                date: dateFrom,
            });

            onChange({
                valueFrom: inputFromValue,
                valueTo: inputToValue,
                dateFrom,
                dateTo,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputFromValue]);

    useEffect(() => {
        if (!inputToValue || isCompleteDateInput(inputToValue)) {
            handleValidInputTo();
        }

        period.setEnd(dateTo || undefined);
        if (dateFrom) {
            period.setStart(dateFrom);
        }

        if (inputToValue !== valueTo) {
            // eslint-disable-next-line no-nested-ternary
            const inputDateTo = returnInvalidDates
                ? isCompleteDateInput(inputToValue)
                    ? parseDateString(inputToValue).getTime()
                    : null
                : dateTo;

            onDateToChange({
                value: inputToValue,
                date: inputDateTo,
            });

            onChange({
                valueFrom: inputFromValue,
                valueTo: inputToValue,
                dateFrom,
                dateTo: inputDateTo,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputToValue]);

    useEffect(() => {
        if (onError) {
            onError(hasValidateError);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasValidateError]);

    const rangeProps = useSelectionProps(period.selectedFrom, period.selectedTo, highlightedDate);

    const CalendarFromComponent = dateInputFromProps.Calendar || CalendarDesktop;
    const CalendarToComponent = dateInputToProps.Calendar || CalendarDesktop;

    const minMaxInSameMonth = minDate && maxDate && isSameMonth(minDate, maxDate);

    return (
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <div
            className={cn(styles.component, styles.static, className)}
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            onMouseOver={handleMouseOver}
            data-test-id={dataTestId}
        >
            <div>
                <DateInput
                    {...dateInputFromProps}
                    mobileMode={
                        dateInputFromProps.mobileMode === 'popover'
                            ? 'input'
                            : dateInputFromProps.mobileMode
                    }
                    value={inputFromValue}
                    onChange={handleInputFromChange}
                    onClear={handleClearFrom}
                    onBlur={handleValidInputFrom}
                    error={bothInvalid || inputFromInvalid || dateInputFromProps.error}
                    clear={true}
                    block={true}
                />
                <div
                    className={cn(styles.calendarContainer, calendarContainerClassName)}
                    data-test-id={getDataTestId(dataTestId, 'container-from')}
                >
                    <CalendarFromComponent
                        {...calendarFromProps}
                        className={cn(styles.calendar, calendarFromProps?.className)}
                        month={monthFrom}
                        selectorView='month-only'
                        offDays={offDays}
                        events={events}
                        onChange={period.updatePeriod}
                        onMonthChange={handleMonthFromChange}
                        minDate={minDate}
                        maxDate={
                            minMaxInSameMonth
                                ? maxDate
                                : maxDate &&
                                  max([maxDate, endOfMonth(subMonths(maxDate, 1))]).getTime()
                        }
                        {...rangeProps}
                    />
                </div>
            </div>

            <Divider inputFromProps={inputFromProps} inputToProps={inputToProps} />

            <div>
                <DateInput
                    {...dateInputToProps}
                    mobileMode={
                        dateInputToProps.mobileMode === 'popover'
                            ? 'input'
                            : dateInputToProps.mobileMode
                    }
                    value={inputToValue}
                    onChange={handleInputToChange}
                    onClear={handleClearTo}
                    onBlur={handleValidInputTo}
                    error={bothInvalid || inputToInvalid || dateInputToProps.error}
                    clear={true}
                    block={true}
                />
                <div data-test-id={getDataTestId(dataTestId, 'container-to')}>
                    <CalendarToComponent
                        {...calendarToProps}
                        className={cn(styles.calendar, calendarToProps?.className)}
                        month={monthTo}
                        selectorView='month-only'
                        offDays={offDays}
                        events={events}
                        onChange={period.updatePeriod}
                        onMonthChange={handleMonthToChange}
                        minDate={
                            minMaxInSameMonth
                                ? minDate
                                : minDate && startOfMonth(addMonths(minDate, 1)).getTime()
                        }
                        maxDate={maxDate}
                        {...rangeProps}
                    />
                </div>
            </div>
        </div>
    );
};
