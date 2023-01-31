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

import {
    Calendar as DefaultCalendar,
    CalendarMobileProps,
    CalendarProps,
    usePeriod,
} from '@alfalab/core-components-calendar';
import { IconButton } from '@alfalab/core-components-icon-button';
import { Input, InputProps } from '@alfalab/core-components-input';
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

type ConditionalProps =
    | {
          /**
           * Обработчик изменения значения
           */
          picker?: true;

          /**
           * Обработчик закрытия календаря
           */
          onClose?: () => void;
      }
    | { picker?: never; onClose?: never };

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
            | (CalendarProps & Record<string, unknown>)
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
         * Например, если места снизу недостаточно,то он все равно будет показан снизу
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
    };

export const DateRangeInput = React.forwardRef<HTMLInputElement, DateRangeInputProps>(
    (
        {
            className,
            inputClassName,
            popoverClassName,
            disabled,
            readOnly,
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
            Calendar = DefaultCalendar,
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
        const [open, setOpen] = useState(false);

        const inputDisabled = disabled || readOnly;

        const calendarResponsive = calendarProps?.responsive ?? true;

        useEffect(() => {
            setOpen(defaultOpen);
        }, [defaultOpen]);

        useDidUpdateEffect(() => {
            const newPropValue = propValue || '';

            setValue((prevValue) => (prevValue === newPropValue ? prevValue : newPropValue));
        }, [propValue]);

        const handlePeriodChange = (selectedFrom?: number, selectedTo?: number) => {
            if (selectedFrom && !selectedTo && value.length === DATE_MASK.length) {
                setValue(parseTimestampToDate(selectedFrom));
            } else if (
                (!selectedFrom && !selectedTo && value.length === DATE_FORMAT.length) ||
                (selectedFrom === selectedTo && value.length === DATE_MASK.length)
            ) {
                setValue('');
            }

            const dateFrom = selectedFrom ? new Date(selectedFrom) : undefined;
            const dateTo = selectedTo ? new Date(selectedTo) : undefined;

            const newValue = ([selectedFrom, selectedTo].filter(Boolean) as number[])
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
        };

        const { selectedFrom, selectedTo, updatePeriod, resetPeriod, setStart, setEnd } = usePeriod(
            { onPeriodChange: handlePeriodChange },
        );

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

            const formattedValue = format(newValue);

            const dateArr = formattedValue.split(' - ');
            const dateFrom = dateArr[0] ? parseDateString(dateArr[0]) : undefined;
            const dateTo = dateArr[1] ? parseDateString(dateArr[1]) : undefined;

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
            if (date) {
                updatePeriod(date);
            }
        };

        useEffect(() => {
            if (selectedFrom && selectedTo) {
                setValue(
                    `${parseTimestampToDate(selectedFrom)} - ${parseTimestampToDate(selectedTo)}`,
                );
            } else if (selectedFrom && value.length < DATE_FORMAT.length) {
                setValue(parseTimestampToDate(selectedFrom));
            }
        }, [selectedFrom, selectedTo, value]);

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

        const renderCalendar = () => (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div onMouseDown={handleCalendarWrapperMouseDown}>
                <Calendar
                    {...calendarProps}
                    responsive={calendarResponsive}
                    open={open}
                    onClose={handleCalendarClose}
                    ref={calendarRef}
                    defaultMonth={defaultMonth}
                    selectedFrom={selectedFrom}
                    selectedTo={selectedTo}
                    onChange={handleCalendarChange}
                    minDate={minDate}
                    maxDate={maxDate}
                    offDays={offDays}
                    events={events}
                />
            </div>
        );

        return (
            <div
                className={cn(styles.component, className, {
                    [styles.block]: block,
                })}
                onFocus={inputDisabled ? undefined : handleInputWrapperFocus}
                onBlur={handleBlur}
            >
                <Input
                    {...restProps}
                    block={block}
                    ref={mergeRefs([ref, inputRef])}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    readOnly={readOnly}
                    className={inputClassName}
                    onClear={handleClear}
                    rightAddons={
                        <React.Fragment>
                            {rightAddons}
                            {picker && (
                                <IconButton
                                    ref={iconRef}
                                    onClick={inputDisabled ? undefined : handleIconButtonClick}
                                    icon={CalendarMIcon}
                                    size='xxs'
                                />
                            )}
                        </React.Fragment>
                    }
                />
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
