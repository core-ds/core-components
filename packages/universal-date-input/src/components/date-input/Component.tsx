import React, { ChangeEvent, FocusEvent, forwardRef, useEffect, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import type { CalendarProps } from '@alfalab/core-components-calendar';
import { Input } from '@alfalab/core-components-input';
import { Popover } from '@alfalab/core-components-popover';
import { getDataTestId } from '@alfalab/core-components-shared';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';

import {
    DATE_FORMAT,
    DATE_TIME_FORMAT,
    DATE_TIME_SEPARATOR,
    DEFAULT_MAX_DATE,
    DEFAULT_MIN_DATE,
} from '../../consts';
import type { InnerDateInputProps } from '../../types';
import {
    formatDate,
    isCompleteDate,
    isCompleteTime,
    isValidDate,
    parseDateString,
    preventDefault,
} from '../../utils';

import styles from '../../index.module.css';

export const DateInput = forwardRef<HTMLInputElement, InnerDateInputProps>(
    (
        {
            autoCorrection,
            open,
            value: valueProp,
            defaultValue,
            minDate = DEFAULT_MIN_DATE,
            maxDate = DEFAULT_MAX_DATE,
            picker,
            rightAddons,
            Calendar,
            calendarProps = {},
            platform,
            calendarRef,
            onComplete,
            onChange,
            onBlur,
            onCalendarClose,
            onPickerClick,
            error,
            popoverProps,
            dataTestId,
            wrapperClassName,
            wrapperHandlers,
            block,
            withTime,
            breakpoint,
            ...restProps
        },
        ref,
    ) => {
        const [value, setValue] = useState(defaultValue);

        const lastValidDate = useRef<string>('');
        const inputRef = useRef<HTMLInputElement>(null);
        const inputWrapperRef = useRef<HTMLDivElement>(null);
        const uncontrolled = valueProp === undefined;
        const { offDays } = calendarProps;
        const inputValue = valueProp ?? value ?? '';
        const [inputDate, inputTime] = inputValue.split(DATE_TIME_SEPARATOR);
        const isValidValue = isValidDate({ value: inputDate, minDate, maxDate, offDays });

        useEffect(() => {
            if (autoCorrection) {
                const hasValidValue = isValidValue && isCompleteTime(inputValue, withTime);

                if (!lastValidDate.current || !inputValue) {
                    lastValidDate.current = hasValidValue
                        ? inputValue
                        : formatDate(minDate, withTime ? DATE_TIME_FORMAT : DATE_FORMAT);
                }
            }
        }, [autoCorrection, minDate, withTime, isValidValue, inputValue]);

        const getInnerError = () => {
            if (autoCorrection) {
                const isComplete = isCompleteDate(inputDate) && isCompleteTime(inputTime, withTime);

                return isComplete && !isValidValue ? 'Эта дата недоступна' : false;
            }

            return false;
        };

        const callOnComplete = (val: string) => {
            onComplete?.(val, parseDateString(val, withTime ? DATE_TIME_FORMAT : DATE_FORMAT));
            lastValidDate.current = val;
        };

        const changeValue = (val: string, event: ChangeEvent<HTMLInputElement> | null) => {
            onChange?.(event, { value: val });

            const [date, time = ''] = val.split(DATE_TIME_SEPARATOR);

            if (uncontrolled) setValue(val);
            if (isCompleteDate(date) && isCompleteTime(time, withTime)) callOnComplete(val);
        };

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            changeValue(event.target.value, event);
        };

        const handleCalendarChange: CalendarProps['onChange'] = (date?: number) => {
            if (date) {
                changeValue(formatDate(date, withTime ? DATE_TIME_FORMAT : DATE_FORMAT), null);
                requestAnimationFrame(() => {
                    const dateLen = DATE_FORMAT.length;
                    const newCaretPos = withTime ? dateLen + DATE_TIME_SEPARATOR.length : dateLen;

                    inputRef.current?.setSelectionRange(newCaretPos, newCaretPos);
                });
            }
            if (platform === 'desktop') onCalendarClose?.();
        };

        const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
            onBlur?.(event);
            if (autoCorrection) {
                const dateFilled = isCompleteDate(inputDate);

                if (dateFilled && !isCompleteTime(inputTime, withTime)) {
                    const [, prevTime] = lastValidDate.current.split(DATE_TIME_SEPARATOR);

                    changeValue(`${inputDate}${DATE_TIME_SEPARATOR}${prevTime}`, null);
                }

                if (inputValue && !dateFilled) {
                    changeValue(lastValidDate.current, null);
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
                            {...calendarProps}
                            breakpoint={breakpoint}
                            responsive={true}
                            open={open}
                            onClose={onCalendarClose}
                            ref={calendarRef}
                            value={isValidValue ? parseDateString(inputDate).getTime() : undefined}
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
                    {...restProps}
                    breakpoint={breakpoint}
                    dataTestId={dataTestId}
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
