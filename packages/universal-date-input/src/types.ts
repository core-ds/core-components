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

export type View = 'date' | 'date-time' | 'date-range' | 'time' | 'month';

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

export interface BaseUniversalDateInputProps
    extends Omit<InputProps, 'onChange' | 'wrapperRef' | 'dataTestId' | 'value' | 'defaultValue'> {
    /**
     * Автоматическое исправление ввода
     *  @default true
     */
    autoCorrection?: boolean;

    /**
     * Реф для программного вызова эффекта коррекции (например, мигания поля).
     * Используется для синхронизации коррекции между полями "от" и "до".
     */
    correctionRef?: RefObject<{ handleCorrection: () => void }>;

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
     * Флаг, открыт ли календарь
     */
    calendarOpen?: boolean;

    /**
     * Обработчик изменения открытия календаря
     */
    onCalendarOpenChange?: (open: boolean) => void;

    /**
     * Обработчик открытия календаря
     * @deprecated Используйте {@link BaseUniversalDateInputProps.onCalendarOpenChange}
     */
    onCalendarOpen?: () => void;

    /**
     * Обработчик закрытия календаря
     * @deprecated Используйте {@link BaseUniversalDateInputProps.onCalendarOpenChange}
     */
    onCalendarClose?: () => void;

    /**
     * Обработчик клика на иконку календаря
     */
    onPickerClick?: (event: MouseEvent) => void;

    /**
     * Обработчик изменения значения в инпуте
     */
    onInputChange?: (
        event: ChangeEvent<HTMLInputElement> | null,
        payload: { value: string },
    ) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Для враппера используется модификатор -wrapper, календаря -calendar, поповера -popover
     */
    dataTestId?: string;
}

export interface InnerDateInputProps extends Omit<BaseUniversalDateInputProps, 'view'> {
    /**
     *  Дата
     */
    value?: Date | number | string | null;

    /**
     *  Дата по умолчанию
     */
    defaultValue?: Date | number | string;

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
     * Обработчик изменения значения
     */
    onChange?: (date: Date | null, value: string) => void;
}

export interface InnerDateRangeInputProps
    extends Omit<InnerDateInputProps, 'onChange' | 'value' | 'defaultValue'> {
    /**
     *  Диапазон дат
     */
    value?: { dateFrom: Date | number | null; dateTo: Date | number | null };

    /**
     *  Диапазон дат по умолчанию
     */
    defaultValue?: { dateFrom: Date | number; dateTo: Date | number };

    /**
     * Тип выбора границ в календаре
     * @default clarification
     */
    rangeBehavior?: 'clarification' | 'reset';

    /**
     * Обработчик изменения значения
     */
    onChange?: (range: { dateFrom: Date | null; dateTo: Date | null }, value: string) => void;
}

export interface InnerTimeInputProps extends Omit<InputProps, 'onChange'> {
    /**
     *  Время
     */
    value?: string;

    /**
     *  Время по умолчанию
     */
    defaultValue?: string;

    /**
     * Автоматическое исправление ввода
     *  @default true
     */
    autoCorrection?: BaseUniversalDateInputProps['autoCorrection'];

    /**
     * Обработчик изменения значения в инпуте
     */
    onInputChange?: BaseUniversalDateInputProps['onInputChange'];

    /**
     * Обработчик изменения значения
     */
    onChange?: (value: string) => void;
}

export interface InnerMonthInputProps extends Omit<InputProps, 'onChange'> {
    /**
     *  Месяц
     */
    value?: string;

    /**
     *  Месяц по умолчанию
     */
    defaultValue?: string;

    /**
     * Автоматическое исправление ввода
     *  @default true
     */
    autoCorrection?: BaseUniversalDateInputProps['autoCorrection'];

    /**
     * Обработчик изменения значения в инпуте
     */
    onInputChange?: BaseUniversalDateInputProps['onInputChange'];

    /**
     * Обработчик изменения значения
     */
    onChange?: (value: string) => void;
}

type PrivateProps =
    | 'platform'
    | 'withTime'
    | 'open'
    | 'calendarRef'
    | 'inputWrapperRef'
    | 'wrapperHandlers'
    | 'onPickerClick';

type Never<T> = {
    [P in keyof T]?: never;
};

type WithPickerRequiredProps = Required<Pick<BaseUniversalDateInputProps, 'Calendar'>>;

type WithPickerNotRequiredProps = Pick<
    BaseUniversalDateInputProps,
    | 'calendarProps'
    | 'popoverProps'
    | 'onCalendarOpen'
    | 'onCalendarClose'
    | 'calendarOpen'
    | 'onCalendarOpenChange'
>;

type WithPickerProps = WithPickerRequiredProps & WithPickerNotRequiredProps;
type NoPickerProps = Never<WithPickerRequiredProps> & Never<WithPickerProps>;

export type UniversalDateInputConditionalProps =
    // date
    | ({ view: 'date'; picker: true } & WithPickerProps &
          Pick<InnerDateInputProps, 'onChange' | 'wrapperClassName' | 'value' | 'defaultValue'>)
    | ({ view: 'date'; picker?: false } & NoPickerProps &
          Pick<InnerDateInputProps, 'onChange' | 'wrapperClassName' | 'value' | 'defaultValue'>)

    // date-time
    | ({ view: 'date-time'; picker: true } & WithPickerProps &
          Pick<InnerDateInputProps, 'onChange' | 'wrapperClassName' | 'value' | 'defaultValue'>)
    | ({ view: 'date-time'; picker?: false } & NoPickerProps &
          Pick<InnerDateInputProps, 'onChange' | 'wrapperClassName' | 'value' | 'defaultValue'>)

    // date-range
    | ({
          view: 'date-range';
          picker: true;
      } & WithPickerProps &
          Pick<
              InnerDateRangeInputProps,
              'onChange' | 'wrapperClassName' | 'rangeBehavior' | 'value' | 'defaultValue'
          >)
    | ({ view: 'date-range'; picker?: false } & NoPickerProps &
          Pick<
              InnerDateRangeInputProps,
              'onChange' | 'wrapperClassName' | 'value' | 'defaultValue'
          >)

    // time
    | ({ view: 'time'; picker?: never; minDate?: never; maxDate?: never; Calendar?: never } & Pick<
          InnerTimeInputProps,
          'onChange' | 'value' | 'defaultValue'
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
