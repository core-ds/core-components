import React, {
    ChangeEvent,
    FocusEvent,
    forwardRef,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { isAfter, isValid, startOfMonth } from 'date-fns';

import type { CalendarProps } from '@alfalab/core-components-calendar';
import { Input } from '@alfalab/core-components-input';
import { Popover } from '@alfalab/core-components-popover';
import { getDataTestId } from '@alfalab/core-components-shared';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';
import { CalendarSIcon } from '@alfalab/icons-glyph/CalendarSIcon';

import { DATE_RANGE_SEPARATOR, DEFAULT_MAX_DATE, DEFAULT_MIN_DATE } from '../../consts';
import { InnerDateRangeInputProps } from '../../types';
import {
    formatDate,
    formatDateRange,
    getValidRange,
    isCompleteDate,
    isCompleteDateRange,
    parseDateString,
    preventDefault,
    updateRange,
} from '../../utils';

import styles from '../../index.module.css';

function getDefaultValue(defaultValue: InnerDateRangeInputProps['defaultValue']) {
    if (defaultValue && isValid(defaultValue.dateFrom) && isValid(defaultValue.dateTo)) {
        return formatDateRange(defaultValue);
    }

    return '';
}

export const DateRangeInput = forwardRef<HTMLInputElement, InnerDateRangeInputProps>(
    (
        {
            autoCorrection,
            breakpoint,
            wrapperClassName,
            open,
            onCalendarClose,
            value: valueProp,
            defaultValue,
            inputWrapperRef: inputWrapperRefProp = null,
            onInputChange,
            onChange,
            onBlur,
            Calendar,
            wrapperHandlers,
            calendarRef,
            calendarProps = {},
            minDate = DEFAULT_MAX_DATE,
            maxDate = DEFAULT_MIN_DATE,
            block,
            dataTestId,
            error,
            popoverProps,
            rightAddons,
            picker,
            platform,
            onPickerClick,
            rangeBehavior = 'clarification',
            clear,
            onClear,
            ...restProps
        },
        ref,
    ) => {
        const [inputValue, setInputValue] = useState(() => getDefaultValue(defaultValue));
        const [calendarMonth, setCalendarMonth] = useState(calendarProps.defaultMonth);

        const lastValidRange = useRef<string>('');
        const inputRef = useRef<HTMLInputElement>(null);
        const inputWrapperRef = useRef<HTMLDivElement>(null);
        const { offDays } = calendarProps;
        const [from = '', to = ''] = inputValue.split(DATE_RANGE_SEPARATOR);
        const dateFromProp = valueProp?.dateFrom;
        const dateToProp = valueProp?.dateTo;

        const { validFrom, validTo } = useMemo(
            () => getValidRange({ from, to, offDays, minDate, maxDate }),
            [from, to, offDays, maxDate, minDate],
        );

        useEffect(() => {
            if (autoCorrection && (!lastValidRange.current || !inputValue)) {
                const min = formatDate(minDate);
                const max = formatDate(maxDate);

                lastValidRange.current = `${min}${DATE_RANGE_SEPARATOR}${max}`;
            }
        }, [autoCorrection, minDate, maxDate, inputValue]);

        useEffect(() => {
            if (picker && open) {
                setCalendarMonth(startOfMonth(validTo || validFrom || Date.now()).getTime());
            }
        }, [validFrom, validTo, open, picker]);

        useEffect(() => {
            if (dateFromProp !== undefined && dateToProp !== undefined) {
                setInputValue(
                    dateFromProp && dateToProp && isValid(dateFromProp) && isValid(dateToProp)
                        ? formatDateRange({ dateFrom: dateFromProp, dateTo: dateToProp })
                        : '',
                );
            }
        }, [dateFromProp, dateToProp]);

        const getInnerError = () => {
            if (autoCorrection) {
                const isCompleteFrom = isCompleteDate(from);
                const isCompleteTo = isCompleteDate(to);
                const isComplete = isCompleteFrom && isCompleteTo;

                return (isCompleteFrom && !validFrom) ||
                    (isCompleteTo && !validTo) ||
                    (isComplete && isAfter(parseDateString(from), parseDateString(to)))
                    ? 'Эта дата недоступна'
                    : false;
            }

            return false;
        };

        const callOnChange = (val: string) => {
            const [dateFrom = '', dateTo = ''] = val.split(DATE_RANGE_SEPARATOR);

            onChange?.(
                {
                    dateFrom: dateFrom ? parseDateString(dateFrom) : null,
                    dateTo: dateFrom ? parseDateString(dateTo) : null,
                },
                val,
            );
            lastValidRange.current = val;
        };

        const changeInputValue = (val: string, event: ChangeEvent<HTMLInputElement> | null) => {
            onInputChange?.(event, { value: val });

            setInputValue(val);
            if (val === '' || isCompleteDateRange(val)) callOnChange(val);
        };

        const handleMonthChange = (date: number) => {
            setCalendarMonth(date);
            calendarProps?.onMonthChange?.(date);
        };

        const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
            changeInputValue(event.target.value, event);
        };

        const handleCalendarChange: CalendarProps['onChange'] = (date?: number) => {
            const newValue = updateRange({ date, validFrom, validTo, rangeBehavior });

            changeInputValue(newValue, null);
            requestAnimationFrame(() => {
                inputRef.current?.setSelectionRange(newValue.length, newValue.length);
            });
        };

        const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
            changeInputValue('', null);
            onClear?.(event);
        };

        const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
            onBlur?.(event);

            if (autoCorrection) {
                const dateFilled = isCompleteDateRange(inputValue);

                if (inputValue && !dateFilled) {
                    const [prevFrom, prevTo] = lastValidRange.current.split(DATE_RANGE_SEPARATOR);
                    const newFrom = validFrom ? formatDate(validFrom) : prevFrom;
                    const newTo = validTo ? formatDate(validTo) : prevTo;

                    changeInputValue(`${newFrom}${DATE_RANGE_SEPARATOR}${newTo}`, null);
                }
            }
        };

        const renderCalendar = () => {
            if (picker && Calendar) {
                return (
                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                    <div onMouseDown={preventDefault} className={styles.calendarWrapper}>
                        <Calendar
                            dataTestId={getDataTestId(dataTestId, 'calendar')}
                            month={calendarMonth}
                            {...calendarProps}
                            onMonthChange={handleMonthChange}
                            breakpoint={breakpoint}
                            responsive={true}
                            open={open}
                            onClose={onCalendarClose}
                            ref={calendarRef}
                            selectedFrom={validFrom ? validFrom.getTime() : undefined}
                            selectedTo={validTo ? validTo.getTime() : undefined}
                            value={undefined}
                            onChange={handleCalendarChange}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    </div>
                );
            }

            return null;
        };

        const CalendarIcon = restProps.size === 40 ? CalendarSIcon : CalendarMIcon;

        return (
            <div
                {...wrapperHandlers}
                className={cn(styles.wrapper, wrapperClassName, {
                    [styles.block]: block,
                })}
                tabIndex={-1}
                data-test-id={getDataTestId(dataTestId, 'wrapper')}
            >
                <Input
                    {...restProps}
                    clear={clear && isCompleteDateRange(inputValue)}
                    onClear={valueProp === undefined ? handleClear : onClear}
                    dataTestId={dataTestId}
                    breakpoint={breakpoint}
                    wrapperRef={mergeRefs([inputWrapperRef, inputWrapperRefProp])}
                    ref={mergeRefs([ref, inputRef])}
                    value={inputValue}
                    inputMode='decimal'
                    onInput={handleInputChange}
                    onBlur={handleBlur}
                    error={error || getInnerError()}
                    block={true}
                    rightAddons={
                        <React.Fragment>
                            {rightAddons}
                            {picker && (
                                <CalendarIcon
                                    onClick={onPickerClick}
                                    className={cn(
                                        styles.calendarIcon,
                                        styles[`size-${restProps.size}`],
                                    )}
                                    onMouseDown={preventDefault}
                                />
                            )}
                        </React.Fragment>
                    }
                />
                {platform === 'desktop' ? (
                    <Popover
                        offset={[0, 4]}
                        position='bottom-start'
                        dataTestId={getDataTestId(dataTestId, 'popover')}
                        {...popoverProps}
                        open={open}
                        anchorElement={inputWrapperRef.current as HTMLElement}
                        popperClassName={cn(
                            styles.calendarContainer,
                            popoverProps?.popperClassName,
                        )}
                        withTransition={false}
                    >
                        {renderCalendar()}
                    </Popover>
                ) : (
                    renderCalendar()
                )}
            </div>
        );
    },
);
