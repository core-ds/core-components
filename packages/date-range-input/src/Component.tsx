/* eslint-disable no-useless-escape, jsx-a11y/click-events-have-key-events */

import React, {
    ChangeEvent,
    ElementType,
    FocusEvent,
    MouseEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import cn from 'classnames';
import mergeRefs from 'react-merge-refs';
import { useMedia } from '@alfalab/hooks';
import { Input, InputProps } from '@alfalab/core-components-input';
import {
    Calendar as DefaultCalendar,
    CalendarMobile as DefaultCalendarMobile,
    CalendarProps,
    CalendarMobileProps,
    usePeriod,
} from '@alfalab/core-components-calendar';
import { Popover, PopoverProps } from '@alfalab/core-components-popover';
import { IconButton } from '@alfalab/core-components-icon-button';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';

import {
    format,
    isCompleteDateInput,
    isValid,
    parseDateString,
    parseTimestampToDate,
} from './utils';

import styles from './index.module.css';

type View = 'desktop' | 'mobile';

export type DateRangeInputProps = Omit<InputProps, 'onChange'> & {
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
    picker?: boolean;

    /**
     * Обработчик изменения значения
     */
    onChange?: (
        event: ChangeEvent<HTMLInputElement>,
        payload: { dateFrom: Date; dateTo: Date; value: string },
    ) => void;

    /**
     * Обработчик окончания ввода
     */
    onComplete?: (
        event: ChangeEvent<HTMLInputElement>,
        payload: { dateFrom: Date; dateTo: Date; value: string },
    ) => void;

    /**
     * Компонент календаря
     */
    Calendar?: ElementType<CalendarProps>;

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
            rightAddons,
            useAnchorWidth,
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
            ...restProps
        },
        ref,
    ) => {
        const [view] = useMedia<View>(
            [
                ['mobile', '(max-width: 1023px)'],
                ['desktop', '(min-width: 1024px)'],
            ],
            'desktop',
        );

        const inputRef = useRef<HTMLInputElement>(null);
        const calendarRef = useRef<HTMLDivElement>(null);

        const [value, setValue] = useState(propValue || defaultValue);
        const [open, setOpen] = useState(false);

        const inputDisabled = disabled || readOnly;

        const CalendarComponent = view === 'desktop' ? Calendar : DefaultCalendarMobile;

        const calendarResponsive = calendarProps?.responsive ?? true;

        const { selectedFrom, selectedTo, updatePeriod } = usePeriod();

        useEffect(() => {
            setOpen(defaultOpen);
        }, [defaultOpen]);

        useEffect(() => {
            if (selectedFrom) {
                setValue(parseTimestampToDate(selectedFrom));
            }
            if (selectedFrom && selectedTo) {
                setValue(
                    `${parseTimestampToDate(selectedFrom)} - ${parseTimestampToDate(selectedTo)}`,
                );
            }
        }, [selectedFrom, selectedTo]);

        const handleInputWrapperFocus = useCallback(
            (event: FocusEvent<HTMLDivElement>) => {
                if (view === 'desktop') {
                    if (!open && event.target.tagName !== 'INPUT' && calendarRef.current) {
                        calendarRef.current.focus();
                    }
                }
            },
            [open, view],
        );

        const handleBlur = useCallback(
            (event: FocusEvent<HTMLDivElement>) => {
                if (view === 'desktop') {
                    const target = (event.relatedTarget || document.activeElement) as HTMLElement;

                    if (calendarRef.current && calendarRef.current.contains(target) === false) {
                        setOpen(false);
                    }
                }
            },
            [view],
        );

        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                const { value: newValue } = event.target;

                if (newValue.length > 23) return;

                // Позволяем вводить только цифры, точки, дефис и пробелы
                if (/[^\d. \- \d.]/.test(newValue)) {
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
                const dateFrom = parseDateString(dateArr[0]);
                const dateTo = parseDateString(dateArr[1]);

                setValue(formattedValue);

                if (onChange) onChange(event, { dateFrom, dateTo, value: formattedValue });

                if (isCompleteDateInput(formattedValue)) {
                    const valid = isValid(formattedValue, dateArr[0], dateArr[1]);

                    if (!valid) return;

                    if (onComplete) {
                        onComplete(event, { dateFrom, dateTo, value: formattedValue });
                    }
                }
            },
            [onChange, onComplete],
        );

        const handleCalendarClose = useCallback(() => {
            setOpen(false);
        }, []);

        const handleClear = useCallback(() => {
            setValue('');
            updatePeriod(undefined);
        }, [updatePeriod]);

        const handleCalendarChange = useCallback<Required<CalendarProps>['onChange']>(
            (date?: number) => {
                updatePeriod(date);
            },
            [updatePeriod],
        );

        const handleCalendarWrapperMouseDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
            // Не дает инпуту терять фокус при выборе даты
            event.preventDefault();
        }, []);

        const handleInputWrapperClick = useCallback(() => {
            if (view === 'desktop' && !open) {
                setOpen(true);
            }
        }, [view, open]);

        const handleIconButtonClick = useCallback(() => {
            if (!open) setOpen(true);
        }, [open]);

        const renderCalendar = () => (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div onMouseDown={handleCalendarWrapperMouseDown}>
                <CalendarComponent
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
                className={cn(styles.component, className)}
                onClick={inputDisabled ? undefined : handleInputWrapperClick}
                onFocus={inputDisabled ? undefined : handleInputWrapperFocus}
                onBlur={handleBlur}
            >
                <Input
                    {...restProps}
                    ref={mergeRefs([ref, inputRef])}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    readOnly={readOnly}
                    className={cn(styles.input, inputClassName)}
                    onClear={handleClear}
                    rightAddons={
                        <React.Fragment>
                            {rightAddons}
                            {picker && (
                                <IconButton
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
