/* eslint-disable no-useless-escape, jsx-a11y/click-events-have-key-events */
import React, {
    ChangeEvent,
    ElementType,
    FocusEvent,
    MouseEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import dateFnsIsValid from 'date-fns/isValid';
import startOfMonth from 'date-fns/startOfMonth';

import type { CalendarDesktopProps } from '@alfalab/core-components-calendar/desktop';
import type { CalendarMobileProps } from '@alfalab/core-components-calendar/mobile';
import { usePeriod } from '@alfalab/core-components-calendar/shared';
import { IconButton } from '@alfalab/core-components-icon-button';
import { InputProps } from '@alfalab/core-components-input';
import { Popover, PopoverProps } from '@alfalab/core-components-popover';
import { useDidUpdateEffect } from '@alfalab/hooks';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';

import {
    DATE_FORMAT,
    DATE_MASK,
    format,
    isCompleteDateInput,
    isValid,
    parseDateString,
    parseTimestampToDate,
} from '../../utils';

import styles from './index.module.css';

export type ConditionalProps =
    | {
          /**
           * Обработчик изменения значения
           */
          picker: true;

          /**
           * Обработчик закрытия календаря
           */
          onClose?: () => void;
      }
    | { picker?: false; onClose?: never };

export type DateRangeInputProps = Omit<InputProps, 'onChange'> &
    ConditionalProps & {
        /**
         * Дополнительный класс
         */
        className?: string;

        /**
         * Дополнительный класс для инпута
         */
        inputClassName?: string;

        /**
         * Дополнительный класс для поповера
         */
        popoverClassName?: string;

        /**
         * Обработчик изменения значения
         */
        onChange?: (
            payload: { dateFrom?: Date; dateTo?: Date; value: string },
            event?: ChangeEvent<HTMLInputElement>,
        ) => void;

        /**
         * Обработчик окончания ввода
         */
        onComplete?: (
            payload: { dateFrom: Date; dateTo: Date; value: string },
            event?: ChangeEvent<HTMLInputElement>,
        ) => void;

        /**
         * Компонент календаря
         */
        Calendar?: ElementType;

        /**
         * Доп. пропсы для календаря
         */
        calendarProps?:
            | (CalendarDesktopProps & Record<string, unknown>)
            | (CalendarMobileProps & Record<string, unknown>);

        /**
         * Месяц в календаре по умолчанию (timestamp)
         */
        defaultMonth?: number;

        /**
         * Минимальная дата, доступная для выбора (timestamp)
         */
        minDate?: number;

        /**
         * Максимальная дата, доступная для выбора (timestamp)
         */
        maxDate?: number;

        /**
         * Список событий
         */
        events?: Array<Date | number>;

        /**
         * Список выходных
         */
        offDays?: Array<Date | number>;

        /**
         * Состояние открытия по умолчанию
         */
        defaultOpen?: boolean;

        /**
         * Позиционирование поповера с календарем
         */
        popoverPosition?: PopoverProps['position'];

        /**
         * z-index Popover
         */
        zIndexPopover?: PopoverProps['zIndex'];

        /**
         * Запрещает поповеру менять свою позицию.
         * Например, если места снизу недостаточно, то он все равно будет показан снизу
         */
        preventFlip?: boolean;

        /**
         * Календарь будет принимать ширину инпута
         */
        useAnchorWidth?: boolean;

        /**
         * Растягивает компонент на ширину контейнера
         */
        block?: boolean;

        /**
         * Отображение компонента в мобильном или десктопном виде
         */
        view?: 'desktop' | 'mobile';

        /**
         * Компонент инпута
         */
        InputComponent?: ElementType;

        /**
         * Запретить ввод с клавиатуры
         */
        disableUserInput?: boolean;
    };

type GetDatesRet = { formattedValue: string; dateFrom?: Date; dateTo?: Date; dateArr: string[] };

export const DateRangeInput = React.forwardRef<HTMLInputElement, DateRangeInputProps>(
    (
        {
            className,
            inputClassName,
            popoverClassName,
            disabled,
            readOnly,
            disableUserInput = false,
            picker,
            defaultValue = '',
            value: propValue,
            onChange,
            onComplete,
            onClose,
            rightAddons,
            useAnchorWidth,
            block,
            popoverPosition = 'bottom-start',
            zIndexPopover,
            preventFlip,
            InputComponent,
            Calendar,
            calendarProps = {},
            defaultMonth,
            minDate = calendarProps.minDate,
            maxDate = calendarProps.maxDate,
            offDays = calendarProps.offDays || [],
            events = calendarProps.events || [],
            defaultOpen = false,
            view = 'desktop',
            ...restProps
        },
        ref,
    ) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const iconRef = useRef<HTMLButtonElement>(null);
        const calendarRef = useRef<HTMLDivElement>(null);

        const [value, setValue] = useState(propValue || defaultValue);
        const [open, setOpen] = useState(defaultOpen);

        const inputDisabled = disabled || readOnly;

        const calendarResponsive = calendarProps?.responsive ?? true;

        const { selectedFrom, selectedTo, updatePeriod, resetPeriod, setStart, setEnd } = usePeriod(
            { onPeriodChange: handlePeriodChange },
        );

        useEffect(() => {
            if (value) {
                setCalendarPeriod(getDates(value));
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        useEffect(() => {
            setValue((prevValue) => {
                if (selectedFrom && selectedTo) {
                    const from = parseTimestampToDate(selectedFrom);
                    const to = parseTimestampToDate(selectedTo);

                    return `${from} - ${to}`;
                }
                if (selectedFrom && prevValue.length < DATE_FORMAT.length) {
                    return parseTimestampToDate(selectedFrom);
                }

                return prevValue;
            });
        }, [selectedFrom, selectedTo]);

        useDidUpdateEffect(() => {
            const newPropValue = propValue || '';

            setValue((prevValue) => {
                if (prevValue === newPropValue) {
                    return prevValue;
                }

                const dates = getDates(newPropValue);

                setCalendarPeriod(dates);

                return dates.formattedValue;
            });
        }, [propValue]);

        function getDates(val: string): GetDatesRet {
            const formattedValue = format(val);

            const dateArr = formattedValue.split('-').map((v) => v.trim());
            const dateFrom = dateArr[0] ? parseDateString(dateArr[0]) : undefined;
            const dateTo = dateArr[1] ? parseDateString(dateArr[1]) : undefined;

            return { formattedValue, dateFrom, dateTo, dateArr };
        }

        function setCalendarPeriod({ dateFrom, dateTo }: GetDatesRet) {
            setStart(dateFrom?.getTime());
            setEnd(dateTo?.getTime());
        }

        function handlePeriodChange(from?: number, to?: number) {
            if (from && !to && value.length === DATE_MASK.length) {
                setValue(parseTimestampToDate(from));
            } else if (
                (!from && !to && value.length === DATE_FORMAT.length) ||
                (from === to && value.length === DATE_MASK.length)
            ) {
                setValue('');
            }

            const dateFrom = from ? new Date(from) : undefined;
            const dateTo = to ? new Date(to) : undefined;

            const newValue = ([from, to].filter(Boolean) as number[])
                .map((timestamp) => parseTimestampToDate(timestamp))
                .join(' - ');

            onChange?.({
                dateFrom,
                dateTo,
                value: newValue,
            });

            if (dateFrom && dateTo) {
                onComplete?.({
                    dateFrom,
                    dateTo,
                    value: newValue,
                });
            }
        }

        const handleInputWrapperFocus = (event: FocusEvent<HTMLDivElement>) => {
            if (view === 'desktop') {
                if (picker) {
                    setOpen(true);
                }

                if (!open && event.target.tagName !== 'INPUT' && calendarRef.current) {
                    calendarRef.current.focus();
                }
            }
        };

        const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
            if (view === 'desktop') {
                const target = (event.relatedTarget || document.activeElement) as HTMLElement;

                if (
                    calendarRef.current?.contains(target) === false &&
                    inputRef.current?.contains(target) === false &&
                    iconRef.current?.contains(target) === false
                ) {
                    setOpen(false);

                    if (onClose) {
                        onClose();
                    }
                }
            }
        };

        // eslint-disable-next-line complexity
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            const { value: newValue } = event.target;

            if (newValue.length > DATE_MASK.length) return;

            // Позволяем вводить только цифры, точки, дефис и пробелы
            if (/[^\d. -]/.test(newValue)) {
                return;
            }

            const dots = newValue.match(/\./g);
            const hyphen = newValue.match(/\-/g);

            // Не даем вводить больше, чем 4 точки и 1 дефис
            if ((dots && dots.length > 4) || (hyphen && hyphen.length > 1)) {
                return;
            }

            const { formattedValue, dateFrom, dateTo, dateArr } = getDates(newValue);

            if (!dateFrom && !dateTo) {
                resetPeriod();
            } else if (selectedFrom && formattedValue.length < DATE_FORMAT.length) {
                setStart();
            } else if (selectedFrom && selectedTo) {
                setEnd();
            } else if (
                dateFrom &&
                dateFnsIsValid(dateFrom) &&
                dateArr[0]?.length === DATE_FORMAT.length &&
                dateFrom.getTime() !== selectedFrom
            ) {
                setStart(dateFrom.getTime());
            } else if (
                dateTo &&
                dateFnsIsValid(dateTo) &&
                dateArr[1]?.length === DATE_FORMAT.length &&
                dateTo.getTime() !== selectedTo
            ) {
                setEnd(dateTo.getTime());
            }

            setValue(formattedValue);

            onChange?.({ dateFrom, dateTo, value: formattedValue }, event);

            if (isCompleteDateInput(formattedValue)) {
                const valid = isValid(formattedValue, dateArr[0], dateArr[1]);

                if (!valid) return;

                if (dateFrom && dateTo) {
                    onComplete?.({ dateFrom, dateTo, value: formattedValue }, event);
                }
            }
        };

        const handleCalendarClose = () => {
            if (view === 'mobile' && onClose) {
                onClose();
            }

            setOpen(false);
        };

        const handleClear = () => {
            setValue('');
            resetPeriod();
        };

        const handleCalendarChange = (date?: number) => {
            updatePeriod(date);
        };

        const handleCalendarWrapperMouseDown = (event: MouseEvent<HTMLDivElement>) => {
            // Не дает инпуту терять фокус при выборе даты
            event.preventDefault();
        };

        const handleIconButtonClick = () => {
            if (!open) setOpen(true);

            if (view === 'desktop' && inputRef.current) {
                inputRef.current.focus();
            }
        };

        const renderCalendar = () => {
            const activeMonth =
                (selectedTo && startOfMonth(selectedTo)) ||
                (selectedFrom && startOfMonth(selectedFrom));

            return Calendar ? (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div onMouseDown={handleCalendarWrapperMouseDown}>
                    <Calendar
                        {...calendarProps}
                        responsive={calendarResponsive}
                        open={open}
                        onClose={handleCalendarClose}
                        ref={calendarRef}
                        defaultMonth={activeMonth || defaultMonth}
                        selectedFrom={selectedFrom}
                        selectedTo={selectedTo}
                        onChange={handleCalendarChange}
                        minDate={minDate}
                        maxDate={maxDate}
                        offDays={offDays}
                        events={events}
                    />
                </div>
            ) : null;
        };

        return (
            <div
                className={cn(styles.component, className, {
                    [styles.block]: block,
                })}
                onFocus={inputDisabled ? undefined : handleInputWrapperFocus}
                onBlur={handleBlur}
            >
                {InputComponent ? (
                    <InputComponent
                        autoComplete={picker ? 'off' : undefined}
                        {...restProps}
                        block={block}
                        ref={mergeRefs([ref, inputRef])}
                        value={value}
                        onChange={handleChange}
                        disabled={disabled}
                        readOnly={readOnly}
                        className={inputClassName}
                        onClear={handleClear}
                        disableUserInput={disableUserInput}
                        rightAddons={
                            <React.Fragment>
                                {rightAddons}
                                {picker && (
                                    <IconButton
                                        className={styles.calendarIcon}
                                        ref={iconRef}
                                        onClick={inputDisabled ? undefined : handleIconButtonClick}
                                        icon={CalendarMIcon}
                                        size='s'
                                    />
                                )}
                            </React.Fragment>
                        }
                    />
                ) : null}
                {picker && (
                    <Popover
                        open={open}
                        useAnchorWidth={useAnchorWidth}
                        anchorElement={inputRef.current as HTMLElement}
                        popperClassName={cn(styles.calendarContainer, {
                            [styles.calendarResponsive]: calendarResponsive,
                        })}
                        className={popoverClassName}
                        position={popoverPosition}
                        offset={[0, 8]}
                        withTransition={false}
                        preventFlip={preventFlip}
                        zIndex={zIndexPopover}
                    >
                        {renderCalendar()}
                    </Popover>
                )}
            </div>
        );
    },
);
