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
import startOfMonth from 'date-fns/startOfMonth';

import type { CalendarProps } from '@alfalab/core-components-calendar';
import { Input } from '@alfalab/core-components-input';
import { Popover } from '@alfalab/core-components-popover';
import { getDataTestId } from '@alfalab/core-components-shared';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';

import { DATE_RANGE_SEPARATOR, DEFAULT_MAX_DATE, DEFAULT_MIN_DATE } from '../../consts';
import { InnerDateRangeInputProps } from '../../types';
import {
    formatDate,
    getValidRange,
    isCompleteDate,
    isCompleteDateRange,
    parseDateString,
    preventDefault,
    updateRange,
} from '../../utils';

import styles from '../../index.module.css';

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
            onComplete,
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
            ...restProps
        },
        ref,
    ) => {
        const [value, setValue] = useState(defaultValue);
        const [calendarMonth, setCalendarMonth] = useState(calendarProps.defaultMonth);

        const lastValidRange = useRef<string>('');
        const inputRef = useRef<HTMLInputElement>(null);
        const inputWrapperRef = useRef<HTMLDivElement>(null);
        const uncontrolled = valueProp === undefined;
        const inputValue = valueProp ?? value ?? '';
        const { offDays } = calendarProps;
        const [from = '', to = ''] = inputValue.split(DATE_RANGE_SEPARATOR);

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

        const getInnerError = () => {
            if (autoCorrection) {
                return (isCompleteDate(from) && !validFrom) || (isCompleteDate(to) && !validTo)
                    ? 'Эта дата недоступна'
                    : false;
            }

            return false;
        };

        const callOnComplete = (val: string) => {
            const [dateFrom, dateTo] = val.split(DATE_RANGE_SEPARATOR);

            onComplete?.(val, parseDateString(dateFrom), parseDateString(dateTo));
            lastValidRange.current = val;
        };

        const changeValue = (val: string, event: ChangeEvent<HTMLInputElement> | null) => {
            onChange?.(event, { value: val });

            if (uncontrolled) setValue(val);
            if (isCompleteDateRange(val)) callOnComplete(val);
        };

        const handleMonthChange = (date: number) => {
            setCalendarMonth(date);
            calendarProps?.onMonthChange?.(date);
        };

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            changeValue(event.target.value, event);
        };

        const handleCalendarChange: CalendarProps['onChange'] = (date?: number) => {
            const newValue = updateRange({ date, validFrom, validTo, rangeBehavior });

            changeValue(newValue, null);
            requestAnimationFrame(() => {
                inputRef.current?.setSelectionRange(newValue.length, newValue.length);
            });
        };

        const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
            onBlur?.(event);

            if (autoCorrection) {
                const dateFilled = isCompleteDateRange(inputValue);

                if (inputValue && !dateFilled) {
                    const [prevFrom, prevTo] = lastValidRange.current.split(DATE_RANGE_SEPARATOR);
                    const newFrom = validFrom ? formatDate(validFrom) : prevFrom;
                    const newTo = validTo ? formatDate(validTo) : prevTo;

                    changeValue(`${newFrom}${DATE_RANGE_SEPARATOR}${newTo}`, null);
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
                    placeholder={`ДД.ММ.ГГГГ${DATE_RANGE_SEPARATOR}ДД.ММ.ГГГГ`}
                    {...restProps}
                    dataTestId={dataTestId}
                    breakpoint={breakpoint}
                    wrapperRef={inputWrapperRef}
                    ref={mergeRefs([ref, inputRef])}
                    value={inputValue}
                    inputMode='decimal'
                    onInput={handleChange}
                    onBlur={handleBlur}
                    error={error || getInnerError()}
                    block={true}
                    rightAddons={
                        <React.Fragment>
                            {rightAddons}
                            {picker && (
                                <CalendarMIcon
                                    onClick={onPickerClick}
                                    className={styles.calendarIcon}
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
