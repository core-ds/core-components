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

import {
    Calendar as DefaultCalendar,
    CalendarMobile as DefaultCalendarMobile,
    CalendarMobileProps,
    CalendarProps,
    dateInLimits,
} from '@alfalab/core-components-calendar';
import { IconButton } from '@alfalab/core-components-icon-button';
import { Input, InputProps } from '@alfalab/core-components-input';
import { Popover, PopoverProps } from '@alfalab/core-components-popover';
import { useMedia } from '@alfalab/hooks';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';

import {
    DATE_MASK,
    format,
    getDateWithoutTime,
    getFullDateTime,
    isCompleteDateInput,
    isValid,
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

    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;
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

        const calendarValue = value ? getDateWithoutTime(value).getTime() : undefined;

        const inputDisabled = disabled || readOnly;

        const CalendarComponent = view === 'desktop' ? Calendar : DefaultCalendarMobile;

        const calendarResponsive = calendarProps?.responsive ?? true;

        useEffect(() => {
            setOpen(defaultOpen);
        }, [defaultOpen]);

        const checkInputValueIsValid = (newInputValue?: string) => {
            if (!newInputValue || error) return false;

            const dateValue = getDateWithoutTime(newInputValue).getTime();

            return (
                dateValue &&
                dateInLimits(dateValue, minDate, maxDate) &&
                !offDays.includes(dateValue)
            );
        };

        const handleInputWrapperFocus = (event: FocusEvent<HTMLDivElement>) => {
            if (view === 'desktop') {
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
                    setValue(prevValue => setTimeToDate(prevValue));
                }
            }
        };

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            const { value: newValue } = event.target;

            if (newValue.length > DATE_MASK.length) return;

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
        };

        const handleCalendarClose = () => {
            setOpen(false);
        };

        const handleClear = () => {
            setValue('');
        };

        const handleCalendarChange = (date?: number) => {
            if (date) {
                setValue(parseTimestampToDate(date));
            }
        };

        const handleCalendarWrapperMouseDown = (event: MouseEvent<HTMLDivElement>) => {
            // Не дает инпуту терять фокус при выборе даты
            event.preventDefault();
        };

        const handleInputWrapperClick = () => {
            if (view === 'desktop' && !open) {
                setOpen(true);
            }
        };

        const handleIconButtonClick = () => {
            if (!open) setOpen(true);
        };

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
                className={cn(styles.component, className, {
                    [styles.block]: block,
                })}
                onClick={inputDisabled ? undefined : handleInputWrapperClick}
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
