import type {
    AriaAttributes,
    ComponentType,
    FC,
    FocusEvent,
    MouseEvent,
    ReactElement,
    ReactNode,
    RefAttributes,
    SVGProps,
} from 'react';

import type { BottomSheetProps } from '@alfalab/core-components-bottom-sheet';
import type { FormControlProps } from '@alfalab/core-components-form-control';
import type { InputProps } from '@alfalab/core-components-input';
import type { ModalProps } from '@alfalab/core-components-modal';
import type { ModalFooterProps, ModalHeaderProps } from '@alfalab/core-components-modal/shared';
import type { PopoverProps } from '@alfalab/core-components-popover';

import type { UseSelectWithApplyProps } from './presets/useSelectWithApply/hook';

// eslint-disable-next-line
export type AnyObject = Record<string, any>;

export type OptionShape = {
    /**
     * Текстовое представление пункта
     */
    key: string;

    /**
     * Контент, который будет отрисован в выпадающем списке и в поле при выборе
     */
    content?: ReactNode;

    /**
     * Блокирует данный пункт для выбора
     */
    disabled?: boolean;

    /**
     * Разрешает показ компонента Checkmark, иногда нужно его убирать для показа контента ошибки или пустого состояния
     */
    showCheckMark?: boolean;

    /**
     * Дополнительные данные
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any;
};

export type GroupShape = {
    /**
     * Заголовок группы
     */
    label?: string;

    /**
     * Дочерние элементы
     */
    options: OptionShape[];
};

export type BaseSelectChangePayload = {
    selected: OptionShape | null;
    selectedMultiple: OptionShape[];
    initiator: OptionShape | null;
    name?: string;
};

export type BaseSelectProps = {
    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Для пункта меню используется модификатор -option, компонента поиска -search,
     * компонента выпадающего меню -options-list, компонента BottomSheet -bottom-sheet,
     * компонента поля -field, компонета FormControl -field-form-control
     */
    dataTestId?: string;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для поля
     */
    fieldClassName?: string;

    /**
     * Дополнительный класс выпадающего меню
     */
    optionsListClassName?: string;

    /**
     * Дополнительный класс для пункта меню
     */
    optionClassName?: string;

    /**
     * Дополнительный класс для компонента группы пунктов
     */
    optionGroupClassName?: string;

    /**
     * Дополнительный класс для поповера
     */
    popperClassName?: PopoverProps['className'];

    /**
     * Список вариантов выбора
     */
    options: Array<OptionShape | GroupShape>;

    /**
     * Атрибут id
     */
    id?: string;

    /**
     * Атрибут name
     */
    name?: string;

    /**
     * Управление возможностью выбора значения
     */
    disabled?: boolean;

    /**
     * Начальное состояние селекта
     */
    defaultOpen?: boolean;

    /**
     * Управление открытием
     */
    open?: boolean;

    /**
     * Возможность выбрать несколько значений
     */
    multiple?: boolean;

    /**
     * Размер компонента
     * @description s, m, l, xl deprecated, используйте вместо них 48, 56, 64, 72 соответственно
     */
    size?: 's' | 'm' | 'l' | 'xl' | 48 | 56 | 64 | 72;

    /**
     * Размер пунктов меню
     * @description s, m, l, xl deprecated, используйте вместо них 48, 56, 64, 72 соответственно
     */
    optionsSize?: 's' | 'm' | 'l' | 'xl' | 48 | 56 | 64 | 72;

    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;

    /**
     * Управляет шириной выпадающего меню.
     * Ширину определяет контент, либо ширина равна ширине поля
     */
    optionsListWidth?: 'content' | 'field';

    /**
     * Лейбл поля
     */
    label?: ReactNode;

    /**
     * Вид лейбла внутри / снаружи
     */
    labelView?: 'inner' | 'outer';

    /**
     * Плейсхолдер поля
     */
    placeholder?: string;

    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;

    /**
     * Подсказка под полем
     */
    hint?: ReactNode;

    /**
     * Возможность использовать селект как input-autocomplete
     */
    autocomplete?: boolean;

    /**
     * Позволяет снять выбранное значение
     */
    allowUnselect?: boolean;

    /**
     * Закрывать меню после выбора?
     */
    closeOnSelect?: boolean;

    /**
     * При навигации с клавиатуры переходить от последнего пункта меню к первому и наоборот.
     */
    circularNavigation?: boolean;

    /**
     * Запрещает поповеру менять свою позицию.
     * Например, если места снизу недостаточно,то он все равно будет показан снизу
     */
    preventFlip?: boolean;

    /**
     * Список value выбранных пунктов (controlled-селект)
     */
    selected?: Array<string | OptionShape> | string | OptionShape | null;

    /**
     * Рендерит нативный селект вместо выпадающего меню. (на десктопе использовать только с multiple=false)
     */
    nativeSelect?: boolean;

    /**
     * Позиционирование выпадающего списка
     */
    popoverPosition?: PopoverProps['position'];

    /**
     * Количество видимых пунктов меню (5 = 5.5)
     */
    visibleOptions?: number;

    /**
     * Кастомный рендер выбранного пункта
     */
    valueRenderer?: ({
        selected,
        selectedMultiple,
    }: {
        selected?: OptionShape;
        selectedMultiple: OptionShape[];
    }) => ReactNode;

    /**
     * Компонент стрелки
     */
    Arrow?: ComponentType<ArrowProps> | null | false;

    /**
     * Компонент поля
     */
    Field?: ComponentType<FieldProps>;

    /**
     * Пропсы, которые будут прокинуты в компонент поля
     */
    fieldProps?: unknown;

    /**
     * Пропсы, которые будут прокинуты в компонент списка
     */
    optionsListProps?: unknown;

    /**
     * Пропсы, которые будут прокинуты в компонент пункта меню
     */
    optionProps?: unknown;

    /**
     * Пропсы, которые будут прокинуты в компонент группового пункта меню
     */
    groupOptionProps?: AnyObject;

    /**
     * Компонент выпадающего меню
     */
    OptionsList?: ComponentType<OptionsListProps & RefAttributes<HTMLDivElement>>;

    /**
     * Компонент группы
     */
    Optgroup?: ComponentType<OptgroupProps>;

    /**
     * Компонент пункта меню
     */
    Option?: ComponentType<OptionProps>;

    /**
     * Включает отображение поиска
     */
    showSearch?: boolean;

    /**
     * Компонент поиска
     */
    Search?: ComponentType<SearchProps>;

    /**
     * Настройки поиска
     */
    searchProps?: {
        componentProps?: SearchProps;
        accessor?: (option: OptionShape) => string;
        filterFn?: (optionText: string, search: string) => boolean;
        value?: string;
        onChange?: (value: string) => void;
        filterGroup?: boolean;
        groupAccessor?: (group: GroupShape) => string | undefined;
    };

    /**
     * Обработчик выбора
     */
    onChange?: (payload: BaseSelectChangePayload) => void;

    /**
     * Обработчик открытия\закрытия селекта
     */
    onOpen?: (payload: { open?: boolean; name?: string }) => void;

    /**
     * Обработчик блюра поля
     */
    onBlur?: (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => void;

    /**
     * Обработчик фокуса поля
     */
    onFocus?: (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => void;

    /**
     * Обработчик скрола
     */
    onScroll?: (event: MouseEvent<HTMLDivElement>) => void;

    /**
     * Обработчик нажатия на крестик для очистки поля
     */
    onClear?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Флаг, показать крестик для очистки поля
     */
    clear?: boolean;

    /**
     * Хранит функцию, с помощью которой можно обновить положение поповера
     */
    updatePopover?: PopoverProps['update'];

    /**
     * z-index поповера
     */
    zIndexPopover?: PopoverProps['zIndex'];

    /**
     * Показывать OptionsList, если он пустой
     */
    showEmptyOptionsList?: boolean;

    /**
     * Дополнительные пропсы для Popover
     */
    popoverProps?: Omit<
        PopoverProps,
        | 'update'
        | 'zIndex'
        | 'position'
        | 'className'
        | 'open'
        | 'anchorElement'
        | 'preventFlip'
        | 'dataTestId'
    >;

    /**
     * Ограничение динамического размера группы вариантов выбора
     */
    limitDynamicOptionGroupSize?: boolean;
};

// TODO: использовать InputProps
export type FieldProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Выбранный пункт
     */
    selected?: OptionShape;

    /**
     * Список выбранных пунктов
     */
    selectedMultiple?: OptionShape[];

    /**
     * Метод для ручной установки выбранных пунктов
     */
    setSelectedItems: (selected: OptionShape[]) => void;

    /**
     * Метод переключающий видимость выпадающего списка
     */
    toggleMenu: () => void;

    /**
     * Флаг, можно ли выбрать несколько значений
     */
    multiple?: boolean;

    /**
     * Флаг, открыто ли меню
     */
    open?: boolean;

    /**
     * Флаг, поле заблокировано
     */
    disabled?: boolean;

    /**
     * Лейбл поля
     */
    label?: ReactNode;

    /**
     * Вид лейбла внутри / снаружи
     */
    labelView?: 'inner' | 'outer';

    /**
     * Плейсхолдер поля
     */
    placeholder?: string;

    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;

    /**
     * Отображение иконки успеха
     */
    success?: boolean;

    /**
     * Подсказка под полем
     */
    hint?: ReactNode;

    /**
     * Компонент стрелки
     */
    Arrow?: ReactElement | false | null;

    /**
     * Кастомный рендер выбранного пункта
     */
    valueRenderer?: BaseSelectProps['valueRenderer'];

    /**
     * Внутренние свойства, которые должны быть установлены компоненту.
     */
    innerProps: {
        onBlur?: (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => void;
        onFocus?: (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => void;
        onClick?: (event: MouseEvent<HTMLDivElement | HTMLInputElement>) => void;
        tabIndex?: number;
        id: string;
    } & RefAttributes<HTMLDivElement | HTMLInputElement> &
        AriaAttributes;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
} & AnyObject;

export type ArrowProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Флаг, открыто ли меню
     */
    open?: boolean;

    /**
     * Флаг блокировки select'а
     */
    disabled?: boolean;
};

export type OptionsListProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для компонента группы пунктов
     */
    optionGroupClassName?: string;

    /**
     * Дополнительный класс для скроллбара
     */
    scrollbarClassName?: string;

    /**
     * Дополнительный класс для футера
     */
    footerClassName?: string;

    /**
     * Размер компонента
     * @description s, m, l, xl deprecated, используйте вместо них 48, 56, 64, 72 соответственно
     */
    size?: 's' | 'm' | 'l' | 'xl' | 48 | 56 | 64 | 72;

    /**
     * Компонент пункта меню
     */
    Option: ComponentType<OptionProps>;

    /**
     * Функция для получения пропсов для ячейки
     */
    getOptionProps: (option: OptionShape, index: number) => OptionProps;

    /**
     * Пропсы, которые будут прокинуты в компонент группового пункта меню
     */
    groupOptionProps?: AnyObject;

    /**
     * Список выбранных пунктов
     */
    selectedItems?: OptionShape[];

    /**
     * Метод для ручной установки выбранных пунктов
     */
    setSelectedItems: (selected: OptionShape[]) => void;

    /**
     * Метод переключающий видимость выпадающего списка
     */
    toggleMenu: () => void;

    /**
     * Контент шапки
     */
    header?: ReactNode;

    /**
     * Контент футера
     */
    footer?: ReactNode;

    /**
     * Список вариантов выбора
     */
    options?: Array<OptionShape | GroupShape>;

    /**
     * Плоский список пунктов меню (например, нужно для виртуализации)
     */
    flatOptions?: OptionShape[];

    /**
     * Индекс выделенного пункта
     */
    highlightedIndex?: number;

    /**
     * Флаг, открыто ли меню
     */
    open?: boolean;

    /**
     * Компонент группы
     */
    Optgroup?: BaseSelectProps['Optgroup'];

    /**
     * Будет отображаться, если компонент пустой
     */
    emptyPlaceholder?: ReactNode;

    /**
     * Количество видимых пунктов меню (5 = 5.5)
     */
    visibleOptions?: number;

    /**
     * Обработчик скрола
     */
    onScroll?: (event: MouseEvent<HTMLDivElement>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Дополнительные пропсы для Input'a, находящегося внутри кастомного OptionsList
     */
    inputProps?: InputProps;

    /**
     * Нужно ли показывать футер
     */
    showFooter?: boolean;

    /**
     * Нужно ли использовать нативный скроллбар
     */
    nativeScrollbar?: boolean;

    /**
     * Управляет шириной выпадающего меню.
     * Ширину определяет контент, либо ширина равна ширине поля
     */
    optionsListWidth?: BaseSelectProps['optionsListWidth'];

    /**
     * Обработчик подтверждения изменений
     */
    onApply?: () => void;

    /**
     * Обработчик отмены изменений
     */
    onClear?: () => void;

    /**
     * Указать индекс пункта для hover состояния
     */
    setHighlightedIndex?: (index: number) => void;

    /**
     * Значение поиска
     */
    search?: string;

    /**
     * Возможность выбрать несколько значений
     */
    multiple?: boolean;

    /**
     * Ограничение динамического размера группы вариантов выбора
     */
    limitDynamicOptionGroupSize?: BaseSelectProps['limitDynamicOptionGroupSize'];
};

export type OptgroupProps = {
    /**
     * Дополнительный класс для компонента группы пунктов
     */
    className?: string;

    /**
     * Размер компонента
     * @description s, m, l, xl deprecated, используйте вместо них 48, 56, 64, 72 соответственно
     */
    size?: 's' | 'm' | 'l' | 'xl' | 48 | 56 | 64 | 72;

    /**
     * Заголовок группы
     */
    label?: string;

    /**
     * Дочерние элементы
     */
    children?: ReactNode;

    /**
     * Список вариантов выбора в группе
     */
    options?: OptionShape[];

    /**
     * Список выбранных вариантов в группе
     */
    selectedItems?: OptionShape[];

    /**
     * Обработчик выбранных вариантов
     */

    setSelectedItems?: (items: OptionShape[]) => void;

    /**
     * Значение поиска
     */
    search?: string;

    /**
     * Возможность выбрать несколько значений
     */
    multiple?: boolean;
};

export type OptionProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Размер компонента
     * @description s, m, l, xl deprecated, используйте вместо них 48, 56, 64, 72 соответственно
     */
    size?: 's' | 'm' | 'l' | 'xl' | 48 | 56 | 64 | 72;

    /**
     * Контент пункта меню
     */
    children?: ReactNode;

    /**
     * Данные пункта меню
     */
    option: OptionShape;

    /**
     * Индекс пункта
     */
    index: number;

    /**
     * Флаг, выбран ли данный пункт
     */
    selected?: boolean;

    /**
     * Флаг, подсвечен ли данный пункт
     */
    highlighted?: boolean;

    /**
     * Флаг, заблокирован ли данный пункт
     */
    disabled?: boolean;

    /**
     * Флаг множественного выбора
     */
    multiple?: boolean;

    /**
     * Компонент пункта меню
     */
    Checkmark?: FC<CheckmarkProps> | null;

    /**
     * Внутренние свойства, которые должны быть установлены компоненту.
     */
    innerProps: {
        id: string;
        onClick?: (event: MouseEvent<HTMLDivElement>) => void;
        onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
        onMouseMove?: (event: MouseEvent<HTMLDivElement>) => void;
        role?: string;
    } & RefAttributes<HTMLDivElement> &
        AriaAttributes;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Позиция иконки "галочки"
     */
    checkmarkPosition?: 'before' | 'after';

    /**
     * Выравнивание чекбокса или иконки "галочки"
     */
    align?: 'start' | 'center';

    /**
     * Мобильная верcия option.
     */
    mobile?: boolean;
};

export type CheckmarkProps = {
    /**
     * Флаг, данный пункт выбран
     */
    selected?: boolean;

    /**
     * Флаг, данный пункт задизейблен
     */
    disabled?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Флаг множественного выбора
     */
    multiple?: boolean;

    /**
     * Расположение отметки
     */
    position?: 'before' | 'after';

    /**
     * Иконка выбранного пункта
     */
    icon?: FC<SVGProps<SVGSVGElement>>;

    /**
     * Выравнивание чекбокса или иконки "галочки"
     */
    align?: 'start' | 'center';
};

export type SearchProps = InputProps & RefAttributes<HTMLInputElement>;

export type SelectFieldProps = Omit<FormControlProps, 'size'> & Record<string, unknown>;

export type AdditionalMobileProps = {
    /**
     * Показывать кнопку 'Сбросить' в футере мобильного компонента
     */
    showClear?: UseSelectWithApplyProps['showClear'];

    /**
     * Показывать пункт "Выбрать все"
     */
    showSelectAll?: UseSelectWithApplyProps['showSelectAll'];

    /**
     * Показывать пункт "Выбрать все" в заголовке списка у мобильного компонента
     */
    showHeaderWithSelectAll?: UseSelectWithApplyProps['showHeaderWithSelectAll'];

    /**
     * Использовать ли хук useSelectWithApply в мобильном компоненте
     */
    useWithApplyHook?: boolean;
};

export type BottomSheetSelectMobileProps = {
    /**
     * Футер
     * @deprecated Используйте bottomSheetProps.actionButton
     */
    footer?: ReactNode;

    /**
     * Будет ли свайпаться шторка
     * @deprecated Используйте bottomSheetProps.swipeable
     */
    swipeable?: boolean;

    /**
     * Дополнительные пропсы шторки
     */
    bottomSheetProps?: Omit<Partial<BottomSheetProps>, 'bottomAddons'> & {
        bottomAddons?: ((flatOptions: OptionShape[]) => ReactNode) | ReactNode;
    };
};

export type ModalSelectMobileProps = {
    /**
     *  Дополнительные пропсы шапки модалки
     */
    modalHeaderProps?: Omit<Partial<ModalHeaderProps>, 'bottomAddons'> & {
        bottomAddons?: ((flatOptions: OptionShape[]) => ReactNode) | ReactNode;
    };

    /**
     *  Дополнительные пропсы модалки
     */
    modalProps?: Partial<ModalProps & RefAttributes<HTMLDivElement>>;

    /**
     *  Дополнительные пропсы футера модалки
     */
    modalFooterProps?: Partial<ModalFooterProps>;
};

type ConditionalMobileProps =
    | ({ isBottomSheet?: true } & BottomSheetSelectMobileProps)
    | ({ isBottomSheet: false } & ModalSelectMobileProps);

export type SelectModalMobileProps = Omit<BaseSelectProps, 'Checkmark'> &
    AdditionalMobileProps &
    ModalSelectMobileProps;

export type SelectMobileProps = Omit<BaseSelectProps, 'Checkmark'> &
    AdditionalMobileProps &
    ConditionalMobileProps;

export type SelectDesktopProps = Omit<BaseSelectProps, 'fieldProps'> & {
    /**
     * Пропсы, которые будут прокинуты в компонент поля
     */
    fieldProps?: SelectFieldProps;
};

export type SelectProps = BaseSelectProps &
    AdditionalMobileProps &
    ConditionalMobileProps & {
        /**
         * Контрольная точка, с нее начинается desktop версия
         * @default 1024
         */
        breakpoint?: number;

        /**
         * Версия, которая будет использоваться при серверном рендеринге
         */
        client?: 'desktop' | 'mobile';

        /**
         * Значение по-умолчанию для хука useMatchMedia
         * @deprecated Используйте client
         */
        defaultMatchMediaValue?: boolean | (() => boolean);
    };

export type ClearButtonProps = {
    /**
     * Обработчик нажатия на крестик для очистки поля
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

    /**
     * Флаг, поле заблокировано
     */
    disabled?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
