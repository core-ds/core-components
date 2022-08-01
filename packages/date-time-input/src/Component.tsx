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
    dateInLimits,
} from '@alfalab/core-components-calendar';
import { Popover, PopoverProps } from '@alfalab/core-components-popover';
import { IconButton } from '@alfalab/core-components-icon-button';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';

import {
    format,
    getFullDateTime,
    isCompleteDateInput,
    isValid,
    parseDateString,
    parseTimestampToDate,
    setTimeToDate,
} from './utils';

import styles from './index.module.css';

type View = 'desktop' | 'mobile';

export type DateTimeInputProps = Omit<InputProps, 'onChange'> & {
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
        payload: { date: Date; value: string },
    ) => void;

    /**
     * Обработчик окончания ввода
     */
    onComplete?: (
        event: ChangeEvent<HTMLInputElement>,
        payload: { date: Date; value: string },
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

export const DateTimeInput = React.forwardRef<HTMLInputElement, DateTimeInputProps>(
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
            error,
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

        const calendarValue = value ? parseDateString(value).getTime() : undefined;

        const inputDisabled = disabled || readOnly;

        const CalendarComponent = view === 'desktop' ? Calendar : DefaultCalendarMobile;

        const calendarResponsive = calendarProps?.responsive ?? true;

        useEffect(() => {
            setOpen(defaultOpen);
        }, [defaultOpen]);

        const checkInputValueIsValid = useCallback(
            (newInputValue?: string) => {
                if (!newInputValue || error) return false;

                const dateValue = parseDateString(newInputValue).getTime();

                return (
                    dateValue &&
                    newInputValue.length === 10 &&
                    dateInLimits(dateValue, minDate, maxDate) &&
                    !offDays.includes(dateValue)
                );
            },
            [error, maxDate, minDate, offDays],
        );

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
                        setValue(prevValue => setTimeToDate(prevValue));
                    }
                }
            },
            [view],
        );

        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                const { value: newValue } = event.target;

                if (newValue.length > 17) return;

                // Позволяем вводить только цифры, точки, запятую, двоеточие и пробел
                if (/[^\d., :\d.]/.test(newValue)) {
                    return;
                }

                const dots = newValue.match(/\./g);
                const colon = newValue.match(/\:/g);
                const comma = newValue.match(/\,/g);

                // Не даем вводить больше, чем 2 точки, 1 двоеточие и 1 запятую
                if (
                    (dots && dots.length > 2) ||
                    (colon && colon.length > 1) ||
                    (comma && comma.length > 1)
                ) {
                    return;
                }

                const formattedValue = format(newValue);
                const date = getFullDateTime(formattedValue);

                setValue(formattedValue);

                if (onChange) onChange(event, { date, value: formattedValue });

                if (isCompleteDateInput(formattedValue)) {
                    const valid = isValid(formattedValue);

                    if (!valid) return;

                    if (onComplete) {
                        onComplete(event, { date, value: formattedValue });
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
        }, []);

        const handleCalendarChange = useCallback<Required<CalendarProps>['onChange']>(
            (date?: number) => {
                if (date) {
                    setValue(parseTimestampToDate(date));
                }
            },
            [],
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
                    value={checkInputValueIsValid(value) ? calendarValue : undefined}
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
                    error={error}
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
