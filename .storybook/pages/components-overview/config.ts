type TConfig = Record<string, string[]>;

export const CONFIG: TConfig = {
    Кнопки: [
        'Button',
        'CustomButton',
        'PickerButton',
        'CustomPickerButton',
        'IconButton',
        'ActionButton',
        'Link',
    ],
    'Ввод данных': [
        'Input',
        'AmountInput',
        'NumberInput',
        'PhoneInput',
        'InternationalPhoneInput',
        'MaskedInput',
        'Select',
        'InputAutocomplete',
        'SliderInput',
        'PasswordInput',
        'Textarea',
        'CodeInput',
        'Switch',
        'Checkbox',
        'CheckboxGroup',
        'Radio',
        'RadioGroup',
        'Tag',
        'FilterTag',
        'Slider',
    ],
    'Ввод даты и времени': ['UniversalDateInput', 'Calendar', 'CalendarRange'],
    'Загрузка файлов': ['Dropzone', 'FileUploadItem', 'Attach'],
    'Модальные сущности': ['Modal', 'SidePanel', 'BottomSheet', 'PopupSheet', 'Popover', 'Tooltip'],
    'Индикаторы прогресса': [
        'ProgressBar',
        'SteppedProgressBar',
        'HatchingProgressBar',
        'CircularProgressBar',
        'Spinner',
        'Skeleton',
    ],
    Уведомления: ['Notification', 'Toast', 'Plate', 'SystemMessage'],
    Аутентификация: ['PassCode', 'PatternLock', 'Confirmation'],
    Ячейки: ['GenericWrapper', 'PureCell', 'Underlay', 'SortableList'],
    Навигация: ['Tabs', 'Pagination', 'TabBar', 'NavigationBar', 'Steps'],
    Индикаторы: ['StatusBadge', 'Indicator', 'Status'],
    Текст: ['Typography', 'List', 'Markdown'],
    'Отображение данных': [
        'Amount',
        'IconView',
        'Table',
        'SystemMessage',
        'Comment',
        'Chart',
        'Gallery',
        'Collapse',
        'Accordion',
    ],
    Лейаут: ['Gap', 'Space', 'Grid'],
};
