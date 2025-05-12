/* eslint-disable complexity */
import React, { FC, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import addMonths from 'date-fns/addMonths';
import endOfMonth from 'date-fns/endOfMonth';
import isSameMonth from 'date-fns/isSameMonth';
import max from 'date-fns/max';
import startOfMonth from 'date-fns/startOfMonth';
import subMonths from 'date-fns/subMonths';

import { CalendarDesktop } from '@alfalab/core-components-calendar/desktop';
import { usePeriodWithReset } from '@alfalab/core-components-calendar/shared';
import { CalendarInputProps } from '@alfalab/core-components-calendar-input/index';
import {
    formatDate,
    isValidInputValue,
    parseDateString,
} from '@alfalab/core-components-calendar-input/shared';
import { isCompleteDateInput } from '@alfalab/core-components-date-input';
import { getDataTestId } from '@alfalab/core-components-shared';
import {
    UniversalDateInput,
    UniversalDateInputProps,
} from '@alfalab/core-components-universal-date-input';

import { CalendarRangeProps } from '../Component';
import { Divider } from '../components/divider';
import { useSelectionProps, useStaticViewMonthes } from '../hooks';
import { isDayButton } from '../utils';

import styles from './index.module.css';

type DateInputProps = Omit<CalendarInputProps, 'onCalendarOpen' | 'onCalendarClose' | 'onChange'>;

export type CalendarRangeStaticProps = Omit<
    CalendarRangeProps,
    'calendarPosition' | 'inputFromProps' | 'inputToProps'
> & {
    /**
     * Отображать начальный месяц слева или справа (влияет только на начальный рендер)
     */
    defaultMonthPosition?: 'left' | 'right';

    /**
     * Пропсы для инпута даты от
     */
    inputFromProps?: DateInputProps;

    /**
     * Пропсы для инпута даты до
     */
    inputToProps?: DateInputProps;
};

type CorrectionToggleRef = { handleCorrection: () => void };

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

    const toggleCorrectionFromRef = useRef<CorrectionToggleRef>(null);
    const toggleCorrectionToRef = useRef<CorrectionToggleRef>(null);

    if (
        isCompleteDateInput(inputFromValue) &&
        isCompleteDateInput(inputToValue) &&
        parseDateString(inputFromValue).getTime() > parseDateString(inputToValue).getTime()
    ) {
        setInputFromValue(inputToValue);
        setInputToValue(inputFromValue);

        toggleCorrectionFromRef.current?.handleCorrection();
        toggleCorrectionToRef.current?.handleCorrection();
    }

    let dateFrom = isValidInputValue(inputFromValue, minDate, maxDate, offDays)
        ? parseDateString(inputFromValue).getTime()
        : null;

    const dateTo = isValidInputValue(inputToValue, dateFrom || minDate, maxDate, offDays)
        ? parseDateString(inputToValue).getTime()
        : null;

    if (isCompleteDateInput(inputToValue) && !dateTo && !returnInvalidDates) {
        dateFrom = null;
    }

    const [highlightedDate, setHighlightedDate] = useState<number | undefined>(undefined);

    const period = usePeriodWithReset({
        initialSelectedFrom: dateFrom ? parseDateString(inputFromValue).getTime() : undefined,
        initialSelectedTo: dateTo ? parseDateString(inputToValue).getTime() : undefined,
    });

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

    const handleInputFromChange: Required<UniversalDateInputProps>['onInputChange'] = (
        event,
        payload,
    ) => {
        setInputFromValue(payload.value);

        const payloadWithDate = { date: parseDateString(payload.value), value: payload.value };

        console.log('handleInputFromChange', {
            date: parseDateString(payload.value),
            value: payload.value,
        });

        onInputChangeFrom?.(event, payloadWithDate);
    };

    const handleInputToChange: Required<UniversalDateInputProps>['onInputChange'] = (
        event,
        payload,
    ) => {
        setInputToValue(payload.value);

        const payloadWithDate = { date: parseDateString(payload.value), value: payload.value };

        console.log('handleInputToChange', {
            date: parseDateString(payload.value),
            value: payload.value,
        });

        onInputChangeTo?.(event, payloadWithDate);
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

    const rangeProps = useSelectionProps(period.selectedFrom, period.selectedTo, highlightedDate);

    const CalendarFromComponent = dateInputFromProps.Calendar || CalendarDesktop;
    const CalendarToComponent = dateInputToProps.Calendar || CalendarDesktop;

    const minMaxInSameMonth = minDate && maxDate && isSameMonth(minDate, maxDate);

    console.log(inputFromProps);
    console.log(inputToProps);

    return (
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <div
            className={cn(styles.component, styles.static, className)}
            onMouseOver={handleMouseOver}
            data-test-id={dataTestId}
        >
            <div>
                <UniversalDateInput
                    {...dateInputFromProps}
                    Calendar={undefined}
                    view='date'
                    picker={false}
                    value={inputFromValue}
                    onInputChange={handleInputFromChange}
                    onClear={handleClearFrom}
                    toggleCorrectionRef={toggleCorrectionFromRef}
                    error={dateInputFromProps.error}
                    clear={true}
                    block={true}
                    minDate={minDate}
                    maxDate={
                        minMaxInSameMonth
                            ? maxDate
                            : maxDate && max([maxDate, endOfMonth(subMonths(maxDate, 1))]).getTime()
                    }
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
                <UniversalDateInput
                    {...dateInputToProps}
                    Calendar={undefined}
                    view='date'
                    picker={false}
                    value={inputToValue}
                    onInputChange={handleInputToChange}
                    onClear={handleClearTo}
                    error={dateInputToProps.error}
                    toggleCorrectionRef={toggleCorrectionToRef}
                    clear={true}
                    block={true}
                    minDate={
                        minMaxInSameMonth
                            ? minDate
                            : minDate && startOfMonth(addMonths(minDate, 1)).getTime()
                    }
                    maxDate={maxDate}
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
