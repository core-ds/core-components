import React, {
    type ChangeEvent,
    type FocusEvent,
    forwardRef,
    useEffect,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import isValid from 'date-fns/isValid';

import { type CalendarProps } from '@alfalab/core-components-calendar';
import { Input } from '@alfalab/core-components-input';
import { Popover } from '@alfalab/core-components-popover';
import { getDataTestId } from '@alfalab/core-components-shared';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';
import { CalendarSIcon } from '@alfalab/icons-glyph/CalendarSIcon';

import {
    DATE_FORMAT,
    DATE_TIME_FORMAT,
    DATE_TIME_SEPARATOR,
    DEFAULT_MAX_DATE,
    DEFAULT_MIN_DATE,
} from '../../consts';
import { type InnerDateInputProps } from '../../types';
import {
    formatDate,
    isCompleteDate,
    isCompleteTime,
    isValidDate,
    parseDateString,
    preventDefault,
} from '../../utils';

import styles from '../../index.module.css';
import desktopStyles from './date-input.desktop.module.css';

function getDefaultValue(defaultValue?: Date | number | string, withTime?: boolean) {
    if (defaultValue !== undefined) {
        if (typeof defaultValue === 'string') {
            return defaultValue;
        }

        if (isValid(new Date(defaultValue))) {
            return formatDate(defaultValue, withTime ? DATE_TIME_FORMAT : DATE_FORMAT);
        }
    }

    return '';
}

export const DateInput = forwardRef<HTMLInputElement, InnerDateInputProps>(
    (
        {
            autoCorrection,
            open,
            value: valueProp,
            inputWrapperRef: inputWrapperRefProp = null,
            defaultValue,
            minDate = DEFAULT_MIN_DATE,
            maxDate = DEFAULT_MAX_DATE,
            picker,
            rightAddons,
            Calendar,
            calendarProps = {},
            platform,
            calendarRef,
            onInputChange,
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
            clear,
            onClear,
            ...restProps
        },
        ref,
    ) => {
        const [inputValue, setInputValue] = useState(() => getDefaultValue(defaultValue, withTime));

        const lastValidDate = useRef<string>('');
        const inputRef = useRef<HTMLInputElement>(null);
        const inputWrapperRef = useRef<HTMLDivElement>(null);
        const { offDays } = calendarProps;
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

        useEffect(() => {
            if (valueProp !== undefined) {
                if (typeof valueProp === 'string') {
                    setInputValue(valueProp);
                } else {
                    setInputValue(
                        valueProp && isValid(valueProp)
                            ? formatDate(valueProp, withTime ? DATE_TIME_FORMAT : DATE_FORMAT)
                            : '',
                    );
                }
            }
        }, [valueProp, withTime]);

        const getInnerError = () => {
            if (autoCorrection) {
                const isComplete = isCompleteDate(inputDate) && isCompleteTime(inputTime, withTime);

                return isComplete && !isValidValue ? 'Эта дата недоступна' : false;
            }

            return false;
        };

        const callOnChange = (val: string) => {
            onChange?.(
                val ? parseDateString(val, withTime ? DATE_TIME_FORMAT : DATE_FORMAT) : null,
                val,
            );
            lastValidDate.current = val;
        };

        const changeInputValue = (val: string, event: ChangeEvent<HTMLInputElement> | null) => {
            onInputChange?.(event, { value: val });

            const [date, time = ''] = val.split(DATE_TIME_SEPARATOR);

            setInputValue(val);

            if (val === '' || (isCompleteDate(date) && isCompleteTime(time, withTime))) {
                callOnChange(val);
            }
        };

        const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
            changeInputValue(event.target.value, event);
        };

        const handleCalendarChange: CalendarProps['onChange'] = (date?: number) => {
            if (date) {
                changeInputValue(formatDate(date, withTime ? DATE_TIME_FORMAT : DATE_FORMAT), null);
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

                    changeInputValue(`${inputDate}${DATE_TIME_SEPARATOR}${prevTime}`, null);
                }

                if (inputValue && !dateFilled) {
                    changeInputValue(lastValidDate.current, null);
                }
            }
        };

        const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
            changeInputValue('', null);
            onClear?.(event);
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
                    clear={
                        clear && isCompleteDate(inputDate) && isCompleteTime(inputTime, withTime)
                    }
                    onClear={valueProp === undefined ? handleClear : onClear}
                    breakpoint={breakpoint}
                    dataTestId={dataTestId}
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
                            desktopStyles.calendarContainer,
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
