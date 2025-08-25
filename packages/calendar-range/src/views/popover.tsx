import React, { FC, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { startOfMonth } from 'date-fns';

import { CalendarInput, CalendarInputProps } from '@alfalab/core-components-calendar-input';
import { isValidInputValue, parseDateString } from '@alfalab/core-components-calendar-input/shared';
import { isCompleteDateInput } from '@alfalab/core-components-date-input';
import { useDidUpdateEffect } from '@alfalab/hooks';

import { CalendarRangeProps } from '../Component';
import { Divider } from '../components/divider';
import { usePopoverViewMonthes } from '../hooks';

import styles from './index.module.css';

export type CalendarRangePopoverProps = Omit<CalendarRangeProps, 'calendarPosition'>;

export const CalendarRangePopover: FC<CalendarRangePopoverProps> = ({
    className,
    defaultMonth = startOfMonth(new Date()).getTime(),
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
}) => {
    const [inputFromValue, setInputFromValue] = useState<string>(valueFrom);
    const [inputToValue, setInputToValue] = useState<string>(valueTo);

    /**
     * Ключ для сброса календарей
     * Пользователь открыл календарь, изменил месяц, но ничего не выбрал
     * — при следующем открытии в календаре будет установлен начальный месяц
     */
    const [resetKey, setResetKey] = useState<number>(0);

    const dateFrom = isValidInputValue(inputFromValue, minDate, maxDate, offDays)
        ? parseDateString(inputFromValue).getTime()
        : null;

    const dateTo = isValidInputValue(inputToValue, dateFrom || minDate, maxDate, offDays)
        ? parseDateString(inputToValue).getTime()
        : null;

    const [inputFromInvalid, setInputFromInvalid] = useState<boolean>(
        isCompleteDateInput(inputFromValue) && dateFrom === null,
    );
    const [inputToInvalid, setInputToInvalid] = useState<boolean>(
        isCompleteDateInput(inputToValue) && dateTo === null,
    );

    const bothInvalid =
        isCompleteDateInput(inputFromValue) &&
        isCompleteDateInput(inputToValue) &&
        parseDateString(inputFromValue).getTime() > parseDateString(inputToValue).getTime();

    const hasValidateError = inputFromInvalid || inputToInvalid || bothInvalid;

    const { monthFrom, monthTo, handleMonthFromChange, handleMonthToChange } =
        usePopoverViewMonthes({
            dateFrom,
            dateTo,
            defaultMonth,
            resetKey,
        });

    const handleValidInputFrom = useCallback(() => {
        setInputFromInvalid(
            inputFromValue !== '' && !isValidInputValue(inputFromValue, minDate, maxDate, offDays),
        );
    }, [inputFromValue, maxDate, minDate, offDays]);

    const handleValidInputTo = useCallback(() => {
        setInputToInvalid(
            inputToValue !== '' &&
                !isValidInputValue(inputToValue, dateFrom || minDate, maxDate, offDays),
        );
    }, [dateFrom, inputToValue, maxDate, minDate, offDays]);

    const handleInputFromChange: Required<CalendarInputProps>['onInputChange'] = (
        event,
        payload,
    ) => {
        setInputFromValue(payload.value);
        inputFromProps.onInputChange?.(event, payload);
    };

    const handleInputToChange: Required<CalendarInputProps>['onInputChange'] = (event, payload) => {
        setInputToValue(payload.value);
        inputToProps.onInputChange?.(event, payload);
    };

    const handleInputFromBlur = useCallback(() => {
        handleValidInputFrom();
        setResetKey(+new Date());
    }, [handleValidInputFrom]);

    const handleInputToBlur = useCallback(() => {
        handleValidInputTo();
        setResetKey(+new Date());
    }, [handleValidInputTo]);

    const handleFromChange: Required<CalendarInputProps>['onChange'] = useCallback((_, payload) => {
        setInputFromValue(payload.value);
    }, []);

    const handleToChange: Required<CalendarInputProps>['onChange'] = useCallback((_, payload) => {
        setInputToValue(payload.value);
    }, []);

    useEffect(() => {
        setInputFromValue(valueFrom);
    }, [valueFrom]);

    useEffect(() => {
        setInputToValue(valueTo);
    }, [valueTo]);

    useDidUpdateEffect(() => {
        onDateFromChange({ value: inputFromValue, date: dateFrom });

        onChange({
            valueFrom: inputFromValue,
            valueTo: inputToValue,
            dateFrom,
            dateTo,
        });

        if (!inputFromValue || isCompleteDateInput(inputFromValue)) {
            handleValidInputFrom();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputFromValue]);

    useDidUpdateEffect(() => {
        onDateToChange({ value: inputToValue, date: dateTo });

        // eslint-disable-next-line no-nested-ternary
        const inputDateTo = returnInvalidDates
            ? isCompleteDateInput(inputToValue)
                ? parseDateString(inputToValue).getTime()
                : null
            : dateTo;

        onChange({
            valueFrom: inputFromValue,
            valueTo: inputToValue,
            dateFrom,
            dateTo: inputDateTo,
        });

        if (!inputToValue || isCompleteDateInput(inputToValue)) {
            handleValidInputTo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputToValue]);

    useEffect(() => {
        if (onError) {
            onError(hasValidateError);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasValidateError]);

    return (
        <div className={cn(styles.component, className)} data-test-id={dataTestId}>
            <CalendarInput
                {...inputFromProps}
                useAnchorWidth={false}
                calendarPosition='popover'
                popoverPosition='bottom-start'
                error={inputFromInvalid || bothInvalid || inputFromProps.error}
                onChange={handleFromChange}
                onInputChange={handleInputFromChange}
                onBlur={handleInputFromBlur}
                value={inputFromValue}
                minDate={minDate}
                maxDate={maxDate}
                offDays={offDays}
                events={events}
                calendarProps={{
                    ...inputFromProps.calendarProps,
                    month: monthFrom,
                    onMonthChange: handleMonthFromChange,
                    selectorView: 'full',
                }}
            />

            <Divider inputFromProps={inputFromProps} inputToProps={inputToProps} />

            <CalendarInput
                {...inputToProps}
                useAnchorWidth={false}
                calendarPosition='popover'
                popoverPosition='bottom-end'
                error={inputToInvalid || bothInvalid || inputToProps.error}
                onChange={handleToChange}
                onInputChange={handleInputToChange}
                onBlur={handleInputToBlur}
                value={inputToValue}
                minDate={dateFrom || minDate}
                maxDate={maxDate}
                offDays={offDays}
                events={events}
                calendarProps={{
                    ...inputToProps.calendarProps,
                    month: monthTo,
                    onMonthChange: handleMonthToChange,
                    selectorView: 'full',
                }}
            />
        </div>
    );
};
