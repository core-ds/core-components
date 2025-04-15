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

import type { CalendarDesktopProps } from '@alfalab/core-components-calendar/desktop';
import type { CalendarMobileProps } from '@alfalab/core-components-calendar/mobile';
import { dateInLimits } from '@alfalab/core-components-calendar/shared';
import { IconButton } from '@alfalab/core-components-icon-button';
import { InputProps } from '@alfalab/core-components-input';
import { Popover, PopoverProps } from '@alfalab/core-components-popover';
import { useDidUpdateEffect } from '@alfalab/hooks';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';

import {
    addTimeToDate,
    DATE_WITH_TIME_LENGTH,
    format,
    getDateWithoutTime,
    getFullDateTime,
    isCompleteDateInput,
    isValid,
    parseTimestampToDate,
} from '../../utils';

import styles from './index.module.css';

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
        event: ChangeEvent<HTMLInputElement> | null,
        payload: { date: Date; value: string },
    ) => void;

    /**
     * Обработчик окончания ввода
     */
    onComplete?: (
        event: ChangeEvent<HTMLInputElement> | null,
        payload: { date: Date; value: string },
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

    /**
     * Компонент инпута
     */
    InputComponent?: ElementType;

    /**
     * Запретить ввод с клавиатуры
     */
    disableUserInput?: boolean;
};

export const DateTimeInput = React.forwardRef<HTMLInputElement, DateTimeInputProps>(
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
            error,
            view = 'desktop',
            ...restProps
        },
        ref,
    ) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const calendarRef = useRef<HTMLDivElement>(null);

        const [value, setValue] = useState(propValue || defaultValue);
        const [open, setOpen] = useState(false);

        const calendarValue = value ? getDateWithoutTime(value).getTime() : undefined;

        const inputDisabled = disabled || readOnly;

        const calendarResponsive = calendarProps?.responsive ?? true;

        useEffect(() => {
            setOpen(defaultOpen);
        }, [defaultOpen]);

        useDidUpdateEffect(() => {
            const newPropValue = propValue || '';

            setValue((prevValue) => (prevValue === propValue ? prevValue : newPropValue));
        }, [propValue]);

        const checkInputValueIsValid = (newInputValue?: string) => {
            if (!newInputValue || error) return false;

            const dateValue = getDateWithoutTime(newInputValue).getTime();

            return (
                dateValue &&
                dateInLimits(dateValue, minDate, maxDate) &&
                !offDays.includes(dateValue)
            );
        };

        const setTimeToDate = () => {
            setValue((prevValue) => {
                const dateWithTime = addTimeToDate(prevValue);

                if (dateWithTime !== prevValue && dateWithTime.length === DATE_WITH_TIME_LENGTH) {
                    onComplete?.(null, {
                        date: getFullDateTime(dateWithTime),
                        value: dateWithTime,
                    });
                }

                return dateWithTime;
            });
        };

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

                if (calendarRef.current && calendarRef.current.contains(target) === false) {
                    setOpen(false);
                    setTimeToDate();
                }
            }
        };

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            const { value: newValue } = event.target;

            if (newValue.length > DATE_WITH_TIME_LENGTH) return;

            // Позволяем вводить только цифры, точки, запятую, двоеточие и пробел
            if (/[^\d., :]/.test(newValue)) {
                return;
            }

            const dots = newValue.match(/\./g);
            const colon = newValue.match(/:/g);
            const comma = newValue.match(/,/g);

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
        };

        const handleMobileCalendarClose = () => {
            setOpen(false);
            setTimeToDate();
        };

        const handleClear = () => {
            setValue('');
        };

        const handleCalendarChange = (date?: number) => {
            if (date) {
                const newValue = parseTimestampToDate(date);

                setValue(newValue);
                onChange?.(null, { date: getFullDateTime(newValue), value: newValue });
            }
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

        const renderCalendar = () =>
            Calendar ? (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div onMouseDown={handleCalendarWrapperMouseDown}>
                    <Calendar
                        {...calendarProps}
                        responsive={calendarResponsive}
                        open={open}
                        onClose={handleMobileCalendarClose}
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
            ) : null;

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
                        error={error}
                        rightAddons={
                            <React.Fragment>
                                {rightAddons}
                                {picker && (
                                    <IconButton
                                        className={styles.calendarIcon}
                                        onClick={inputDisabled ? undefined : handleIconButtonClick}
                                        icon={CalendarMIcon}
                                        size='s'
                                    />
                                )}
                            </React.Fragment>
                        }
                    />
                ) : null}
                {picker &&
                    (view === 'desktop' ? (
                        <Popover
                            open={open}
                            useAnchorWidth={useAnchorWidth}
                            anchorElement={inputRef}
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
                    ) : (
                        renderCalendar()
                    ))}
            </div>
        );
    },
);
