import React from 'react';

import { PrivateListProps, PrivateListRefType } from '@alfalab/core-components-list';

import { OptionProps } from './components/option';

export interface BaseOption<ValueType> {
    key?: React.Key;
    disabled?: boolean;
    title?: string;
    value: ValueType;
    label: React.ReactNode;
}

export interface BaseGroupOption<ValueType> {
    key: React.Key;
    title?: string;
    label: React.ReactNode;
    options: Array<BaseOption<ValueType>>;
}

export type SelectOption<ValueType> = BaseOption<ValueType> | BaseGroupOption<ValueType>;

export interface LabeledValue<ValueType> {
    title?: string;
    label: React.ReactNode;
    value: ValueType;
}

export type Size = 48 | 56 | 64 | 72;

// TODO specify the html element
export type RefType = HTMLElement;

export type BaseValueType = number | string | null;

export interface AstractSelectProps<ValueType extends BaseValueType, OptionType> {
    defaultValue?:
        | LabeledValue<ValueType>
        | Array<LabeledValue<ValueType>>
        | ValueType
        | ValueType[];
    value?: LabeledValue<ValueType> | Array<LabeledValue<ValueType>> | ValueType | ValueType[];
    onChange?: (
        value: undefined | ValueType | ValueType[],
        option: null | OptionType | OptionType[],
    ) => void;
    options?: OptionType[];
    onSelect?: (value: ValueType, option: OptionType) => void;
    // works with tags and multiple mods
    onDeselect?: (value: ValueType, option: OptionType) => void;
    /**
     * @default false
     */
    allowDeselect?: boolean;

    clear?: boolean;
    onClear?: () => void;

    /**
     * @default false
     */
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean | undefined) => void;

    // wtf??
    userInput?: boolean;

    /**
     * @default false
     */
    search?:
        | boolean
        | {
              value?: string;
              onSearch?: (searchValue: string | undefined) => void;
              loading?: boolean;
              filterOptions?:
                  | ((searchValue: string | undefined, option: OptionType) => boolean)
                  | boolean;
          };

    loading?: boolean;

    label?: React.ReactNode;
    placeholder?: string;
    // TODO does it needed?
    notFoundPlaceholder?: React.ReactNode;

    autoFocus?: boolean;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;

    disabled?: boolean;

    /**
     * @default false
     */
    confirm?:
        | boolean
        // TODO specify passed button props
        | {
              applyButtonProps: boolean | unknown;
              resetButtonProps: boolean | unknown;
          };
    /**
     * @default 5
     */
    visibleOptions?: number;

    /**
     * @default content
     */
    optionsListWidth?: PrivateListProps<never>['width'];
    /**
     * @default 48
     */
    size?: Size;
    /**
     * @default 48
     */
    optionSize?: Size;
}

export interface SelectProps<ValueType extends BaseValueType = BaseValueType>
    extends AstractSelectProps<ValueType, SelectOption<ValueType>> {
    /**
     * @default combobox
     */
    mode?: 'combobox' | 'multiple' | 'tags' | 'autocomplete';

    Option?: React.ComponentType<OptionProps<ValueType>>;
}

export interface OptionListProps<OptionType>
    extends Pick<
        PrivateListProps<OptionType>,
        'width' | 'minWidth' | 'nativeScrollbar' | 'onScroll'
    > {
    listRef?: React.Ref<PrivateListRefType>;
    innerProps?: React.HTMLProps<HTMLElement>;
    size: Size;
    options?: OptionType[];
    visibleOptions: number;
    /**
     * @description Pass `null` to hide header
     * @default null
     */
    header?: React.ReactNode;
    /**
     * @description Pass `null` to hide footer
     * @default null
     */
    footer?: React.ReactNode;
    /**
     * @description Pass `null` to hide empty placeholder
     * @default null
     */
    emptyPlaceholder?: React.ReactNode;

    renderOption: (option: OptionType, index: number) => React.ReactNode;
}

export interface ArrowProps {
    open?: boolean;
    className?: string;
}

export interface ClearButtonProps {
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
}
