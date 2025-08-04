import React, {
    ChangeEvent,
    ElementType,
    FocusEvent,
    forwardRef,
    KeyboardEvent,
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
import {
    DateInput,
    DateInputProps,
    formatDate,
    isCompleteDateInput,
    parseDateString,
} from '@alfalab/core-components-date-input';
import { Popover, PopoverProps } from '@alfalab/core-components-popover';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';

import { SUPPORTS_INPUT_TYPE_DATE } from '../../utils';

import styles from './index.module.css';

export type CalendarInputProps = Omit<DateInputProps, 'onChange' | 'mobileMode'> & {
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
     * Доп. пропсы для календаря
     */
    calendarProps?:
        | (CalendarDesktopProps & Record<string, unknown>)
        | (CalendarMobileProps & Record<string, unknown>);

    /**
     * Значение инпута (используется и для календаря)
     */
    value?: string;

    /**
     * Начальное значение инпута
     */
    defaultValue?: string;

    /**
     * Состояние открытия по умолчанию
     */
    defaultOpen?: boolean;

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
     * Определяет, как рендерить календарь — в поповере или снизу инпута
     */
    calendarPosition?: 'static' | 'popover';

    /**
     * Запрещает поповеру менять свою позицию.
     * Например, если места снизу недостаточно,то он все равно будет показан снизу
     */
    preventFlip?: boolean;

    /**
     * Управление нативным режимом на мобильных устройствах
     */
    mobileMode?: 'native' | 'popover' | 'input';

    /**
     * Компонент календаря
     */
    Calendar?: ElementType;

    /**
     * Обработчик изменения значения
     */
    onChange?: (
        event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement> | null,
        payload: { date: Date; value: string },
    ) => void;

    /**
     * Обработчик ввода в инпут
     */
    onInputChange?: (
        event: ChangeEvent<HTMLInputElement> | null,
        payload: { value: string; date: Date },
    ) => void;

    /**
     * Обработчик изменения календаря
     */
    onCalendarChange?: CalendarDesktopProps['onChange'];

    /**
     *  Обработчик открытия календаря
     */
    onCalendarOpen?: () => void;

    /**
     *  Обработчик закрытия календаря
     */
    onCalendarClose?: () => void;

    /**
     * Позиционирование поповера с календарем
     */
    popoverPosition?: PopoverProps['position'];

    /**
     * z-index Popover
     */
    zIndexPopover?: PopoverProps['zIndex'];

    /**
     * Календарь будет принимать ширину инпута
     */
    useAnchorWidth?: boolean;

    /**
     * Отображение компонента в мобильном или десктопном виде
     */
    view?: 'desktop' | 'mobile';

    /**
     * Запретить ввод с клавиатуры
     */
    disableUserInput?: boolean;
};

export const CalendarInput = forwardRef<HTMLInputElement, CalendarInputProps>(
    (
        {
            block = false,
            className,
            inputClassName,
            popoverClassName,
            defaultOpen = false,
            defaultMonth,
            defaultValue = '',
            calendarPosition = 'popover',
            value,
            dataTestId,
            calendarProps = {},
            minDate = calendarProps.minDate,
            maxDate = calendarProps.maxDate,
            offDays = calendarProps.offDays || [],
            events = calendarProps.events || [],
            preventFlip,
            mobileMode = 'popover',
            wrapperRef = null,
            disabled,
            onChange = () => null,
            onInputChange,
            onCalendarChange,
            onCalendarOpen,
            onCalendarClose,
            onKeyDown,
            readOnly,
            disableUserInput = false,
            Calendar,
            popoverPosition = 'bottom-start',
            zIndexPopover,
            useAnchorWidth,
            rightAddons,
            error,
            view = 'desktop',
            ...restProps
        },
        ref,
    ) => {
        const calendarResponsive = calendarProps?.responsive ?? true;
        const shouldRenderNative = SUPPORTS_INPUT_TYPE_DATE && mobileMode === 'native';
        const shouldRenderOnlyInput = mobileMode === 'input';
        const shouldRenderStatic = calendarPosition === 'static' && !shouldRenderOnlyInput;
        const shouldRenderPopover =
            calendarPosition === 'popover' && !shouldRenderNative && !shouldRenderOnlyInput;

        const [open, setOpen] = useState(false);

        const [inputValue, setInputValue] = useState(value || defaultValue);

        const calendarValue = inputValue ? parseDateString(inputValue).getTime() : undefined;

        const checkInputValueIsValid = (newInputValue?: string) => {
            if (!newInputValue) return false;

            const dateValue = parseDateString(newInputValue).getTime();

            return !!(
                dateValue &&
                isCompleteDateInput(newInputValue) &&
                dateInLimits(dateValue, minDate, maxDate) &&
                !offDays.includes(dateValue)
            );
        };

        const inputDisabled = disabled || readOnly;

        const inputRef = useRef<HTMLInputElement>(null);
        const inputWrapperRef = useRef<HTMLDivElement>(null);
        const calendarRef = useRef<HTMLDivElement>(null);

        const openCalendar = () => {
            setOpen((prev) => {
                if (!prev) onCalendarOpen?.();

                return true;
            });
        };

        const closeCalendar = () => {
            setOpen((prev) => {
                if (prev) onCalendarClose?.();

                return false;
            });
        };

        const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
            if ((event.target as HTMLElement).tagName === 'INPUT' && event.key === 'Enter') {
                if (open) {
                    closeCalendar();
                } else {
                    openCalendar();
                }
            }

            if (event.key === 'Escape') {
                closeCalendar();
            }
        };

        const handleClick = (event: MouseEvent<HTMLDivElement>) => {
            if (!inputWrapperRef.current?.contains(event.target as HTMLElement)) return;

            if (!open) openCalendar();

            if (view === 'desktop' && inputRef.current) {
                inputRef.current.focus();
            }
        };

        const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
            if (view === 'desktop') {
                if (!inputWrapperRef.current?.contains(event.target)) return;

                openCalendar();

                if (!open && event.target.tagName !== 'INPUT' && calendarRef.current) {
                    calendarRef.current.focus();
                }
            }
        };

        const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
            if (view === 'desktop') {
                const target = (event.relatedTarget || document.activeElement) as HTMLElement;

                if (
                    inputRef.current !== target &&
                    calendarRef.current?.contains(target) === false
                ) {
                    closeCalendar();
                }
            }
        };

        const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
            if (['ArrowDown', 'ArrowUp'].includes(event.key) && calendarRef.current) {
                event.preventDefault();
                calendarRef.current.focus();
            }

            if (onKeyDown) onKeyDown(event);
        };

        const changeHandler = (
            event: ChangeEvent<HTMLInputElement> | null,
            newValue: string,
            newDate: Date,
            initiator: 'input' | 'calendar' = 'input',
            shouldChange = true,
        ) => {
            if (initiator === 'input' && event && onInputChange) {
                onInputChange(event, { value: newValue, date: newDate });
            }

            if (initiator === 'calendar' && onCalendarChange) {
                onCalendarChange(newDate.getTime());
            }

            setInputValue(newValue);

            if (shouldChange) {
                onChange(event, { date: newDate, value: newValue });
            }
        };

        const handleInputChange: DateInputProps['onChange'] = (event, payload) => {
            changeHandler(
                event,
                payload.value,
                payload.date,
                'input',
                !payload.value || checkInputValueIsValid(payload.value),
            );
        };

        const handleCalendarChange: CalendarDesktopProps['onChange'] = (date?: number) => {
            if (date) {
                changeHandler(null, formatDate(date), new Date(date), 'calendar');
            }

            if (view === 'desktop') {
                closeCalendar();
            }
        };

        const handleCalendarWrapperMouseDown = (event: MouseEvent<HTMLDivElement>) => {
            // Не дает инпуту терять фокус при выборе даты
            event.preventDefault();
        };

        useEffect(() => {
            setOpen(defaultOpen);
        }, [defaultOpen]);

        useEffect(() => {
            if (typeof value !== 'undefined') {
                setInputValue(value);
            }
        }, [value]);

        const renderCalendar = () => (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div onMouseDown={handleCalendarWrapperMouseDown}>
                {Calendar ? (
                    <Calendar
                        {...calendarProps}
                        responsive={calendarResponsive}
                        open={open}
                        onClose={closeCalendar}
                        ref={calendarRef}
                        defaultMonth={defaultMonth}
                        value={checkInputValueIsValid(inputValue) ? calendarValue : undefined}
                        onChange={handleCalendarChange}
                        minDate={minDate}
                        maxDate={maxDate}
                        offDays={offDays}
                        events={events}
                    />
                ) : null}
            </div>
        );

        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div
                className={cn(styles.component, className, {
                    [styles.block]: block,
                })}
                tabIndex={-1}
                onKeyDown={inputDisabled ? undefined : handleKeyDown}
                onClick={inputDisabled ? undefined : handleClick}
                onFocus={inputDisabled ? undefined : handleFocus}
                onBlur={handleBlur}
                data-test-id={dataTestId}
            >
                <DateInput
                    autoComplete='off'
                    {...restProps}
                    ref={mergeRefs([inputRef, ref])}
                    wrapperRef={mergeRefs([wrapperRef, inputWrapperRef])}
                    value={inputValue}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    inputClassName={inputClassName}
                    readOnly={readOnly}
                    mobileMode={mobileMode === 'native' ? 'native' : 'input'}
                    error={error}
                    disableUserInput={disableUserInput}
                    rightAddons={
                        <React.Fragment>
                            {rightAddons}
                            {shouldRenderPopover && (
                                <CalendarMIcon className={styles.calendarIcon} />
                            )}
                        </React.Fragment>
                    }
                    rightAddonsProps={{ onMouseDown: (e) => e.preventDefault() }}
                    onKeyDown={handleInputKeyDown}
                    onChange={handleInputChange}
                    block={true}
                />
                {shouldRenderStatic && renderCalendar()}

                {shouldRenderPopover &&
                    (view === 'desktop' ? (
                        <Popover
                            open={open}
                            useAnchorWidth={useAnchorWidth}
                            anchorElement={inputWrapperRef.current as HTMLElement}
                            popperClassName={cn(styles.calendarContainer, {
                                [styles.calendarResponsive]: calendarResponsive,
                            })}
                            className={popoverClassName}
                            position={popoverPosition}
                            offset={[0, 4]}
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
