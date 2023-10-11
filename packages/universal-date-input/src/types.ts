import type {
    ChangeEvent,
    FocusEvent,
    ForwardRefExoticComponent,
    KeyboardEvent,
    MouseEvent,
    PropsWithoutRef,
    RefAttributes,
    RefObject,
} from 'react';

import type { CalendarProps } from '@alfalab/core-components-calendar';
import type { InputProps } from '@alfalab/core-components-input';
import type { PopoverProps } from '@alfalab/core-components-popover';

export type View = 'date' | 'date-time' | 'date-range' | 'time';

export type DateTemplate = {
    segments: string[];
    separators: string[];
};

export type DateSegments<T = string> = {
    day: T;
    month: T;
    year: T;
    hours: T;
    minutes: T;
};

export interface BaseUniversalDateInputProps extends Omit<InputProps, 'onChange' | 'wrapperRef'> {
    /**
     * Автоматическое исправление ввода
     *  @default true
     */
    autoCorrection?: boolean;

    /**
     *  Значение инпута
     */
    value?: string;

    /**
     * Минимальная дата, доступная для выбора (timestamp)
     */
    minDate?: number;

    /**
     * Максимальная дата, доступная для выбора (timestamp)
     */
    maxDate?: number;

    /**
     * Вид компонента
     */
    view: View;

    /**
     * Мобильный или десктопный вид компонента
     */
    platform: 'desktop' | 'mobile';

    /**
     * Открыть календарь при клике
     */
    picker?: boolean;

    /**
     *  Компонент календаря
     */
    Calendar?: ForwardRefExoticComponent<
        PropsWithoutRef<CalendarProps> & RefAttributes<HTMLDivElement>
    >;

    /**
     *  Пропсы календаря
     */
    calendarProps?: Omit<CalendarProps, 'open' | 'minDate' | 'maxDate' | 'onClose'>;

    /**
     * Пропсы поповера
     */
    popoverProps?: PopoverProps;

    /**
     * Ref для обертки input
     */
    inputWrapperRef?: React.Ref<HTMLDivElement> | null;

    /**
     *  Обработчик открытия календаря
     */
    onCalendarOpen?: () => void;

    /**
     *  Обработчик закрытия календаря
     */
    onCalendarClose?: () => void;

    /**
     * Обработчик клика на иконку календаря
     */
    onPickerClick?: (event: MouseEvent) => void;

    /**
     * Обработчик изменения значения
     */
    onChange?: (event: ChangeEvent<HTMLInputElement> | null, payload: { value: string }) => void;
}

export interface InnerDateInputProps extends Omit<BaseUniversalDateInputProps, 'view'> {
    /**
     * Флаг, открыт ли календарь
     */
    open: boolean;

    /**
     * Дополнительный класс обертки
     */
    wrapperClassName?: string;

    /**
     * Дата со временем
     */
    withTime?: boolean;

    /**
     * Реф календаря
     */
    calendarRef: RefObject<HTMLDivElement>;

    /**
     * Обработчики на враппер
     */
    wrapperHandlers?: {
        onClick?: (e: MouseEvent<HTMLDivElement>) => void;
        onFocus?: (e: FocusEvent<HTMLDivElement>) => void;
        onBlur: (e: FocusEvent<HTMLDivElement>) => void;
        onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
    };

    /**
     * Обработчик окончания ввода
     */
    onComplete?: (value: string, date: Date) => void;
}

export interface InnerDateRangeInputProps extends Omit<InnerDateInputProps, 'onComplete'> {
    /**
     * Тип выбора границ в календаре
     * @default clarification
     */
    rangeBehavior?: 'clarification' | 'reset';

    /**
     * Обработчик окончания ввода
     */
    onComplete?: (value: string, dateFrom: Date, dateTo: Date) => void;
}

export interface InnerTimeInputProps extends Omit<InputProps, 'onChange'> {
    /**
     * Автоматическое исправление ввода
     *  @default true
     */
    autoCorrection?: BaseUniversalDateInputProps['autoCorrection'];

    /**
     * Обработчик изменения значения
     */
    onChange?: BaseUniversalDateInputProps['onChange'];

    /**
     * Обработчик окончания ввода
     */
    onComplete?: (value: string) => void;
}

type PrivateProps =
    | 'platform'
    | 'withTime'
    | 'open'
    | 'calendarRef'
    | 'wrapperHandlers'
    | 'onPickerClick';

type Never<T> = {
    [P in keyof T]?: never;
};

type WithPickerRequiredProps = Required<Pick<BaseUniversalDateInputProps, 'Calendar'>>;

type WithPickerNotRequiredProps = Pick<
    BaseUniversalDateInputProps,
    'calendarProps' | 'popoverProps' | 'onCalendarOpen' | 'onCalendarClose'
>;

type WithPickerProps = WithPickerRequiredProps & WithPickerNotRequiredProps;
type NoPickerProps = Never<WithPickerRequiredProps> & Never<WithPickerProps>;

export type UniversalDateInputConditionalProps =
    // date
    | ({ view: 'date'; picker: true } & WithPickerProps &
          Pick<InnerDateInputProps, 'onComplete' | 'wrapperClassName'>)
    | ({ view: 'date'; picker?: false } & NoPickerProps &
          Pick<InnerDateInputProps, 'onComplete' | 'wrapperClassName'>)

    // date-time
    | ({ view: 'date-time'; picker: true } & WithPickerProps &
          Pick<InnerDateInputProps, 'onComplete' | 'wrapperClassName'>)
    | ({ view: 'date-time'; picker?: false } & NoPickerProps &
          Pick<InnerDateInputProps, 'onComplete' | 'wrapperClassName'>)

    // date-range
    | ({
          view: 'date-range';
          picker: true;
      } & WithPickerProps &
          Pick<InnerDateRangeInputProps, 'onComplete' | 'wrapperClassName' | 'rangeBehavior'>)
    | ({ view: 'date-range'; picker?: false } & NoPickerProps &
          Pick<InnerDateRangeInputProps, 'onComplete' | 'wrapperClassName'>)

    // time
    | ({ view: 'time'; picker?: never; minDate?: never; maxDate?: never; Calendar?: never } & Pick<
          InnerTimeInputProps,
          'onComplete'
      >);

export type UniversalDateInputProps = Omit<
    BaseUniversalDateInputProps,
    PrivateProps | keyof WithPickerProps
> &
    UniversalDateInputConditionalProps;

export type UniversalDateInputMobileProps = Omit<
    UniversalDateInputProps,
    'breakpoint' | 'defaultMatchMediaValue'
> &
    UniversalDateInputConditionalProps;

export type UniversalDateInputDesktopProps = Omit<
    UniversalDateInputProps,
    'breakpoint' | 'defaultMatchMediaValue'
> &
    UniversalDateInputConditionalProps;
