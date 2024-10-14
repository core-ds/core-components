import { ComponentType, FocusEvent, Key, ReactNode, UIEvent } from 'react';

import { ListProps, RenderItemExtraProps } from './components/list';
import { OptionProps } from './components/option';

export interface BaseOption<ValueType> {
    key?: Key;
    disabled?: boolean;
    title?: string;
    value: ValueType;
    label: ReactNode;
}

export interface BaseGroupOption<ValueType> {
    key: Key;
    title?: string;
    label: ReactNode;
    options: Array<BaseOption<ValueType>>;
}

export type SelectOption<ValueType> = BaseOption<ValueType> | BaseGroupOption<ValueType>;

export interface LabeledValue<ValueType> {
    title?: string;
    label: ReactNode;
    value: ValueType;
}

export type Size = 48 | 56 | 64 | 72;

// TODO specify the html element
export type RefType = HTMLElement;

export type BaseValueType = number | string | null;

export interface AstractSelectProps<OptionType, ValueType extends BaseValueType = BaseValueType> {
    defaultValue?:
        | LabeledValue<ValueType>
        | Array<LabeledValue<ValueType>>
        | ValueType
        | ValueType[];
    value?: LabeledValue<ValueType> | Array<LabeledValue<ValueType>> | ValueType | ValueType[];
    onChange?: (
        value: undefined | ValueType | ValueType[],
        option: OptionType | OptionType[],
    ) => void;
    options?: OptionType[];
    onSelect?: (value: ValueType, option: OptionType) => void;
    // works with tags and multiple mods
    onDeselect?: (value: ValueType, option: OptionType) => void;

    clear?: boolean;
    onClear?: () => void;

    /**
     * @default false
     */
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;

    // wtf??
    userInput?: boolean;

    /**
     * @default false
     */
    search?:
        | boolean
        | {
              value?: string;
              onSearch?: (searchValue: string) => void;
              loading?: boolean;
              filterOptions?: ((searchValue: string, option: OptionType) => boolean) | boolean;
          };

    loading?: boolean;

    label?: ReactNode;
    placeholder?: ReactNode;
    // TODO does it need?
    notFoundPlaceholder?: ReactNode;

    autoFocus?: boolean;
    onFocus?: (event: FocusEvent) => void;
    onBlur?: () => void;

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
    optionsListWidth?: ListProps<never>['width'];
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
    extends AstractSelectProps<SelectOption<ValueType>, ValueType> {
    /**
     * @default combobox
     */
    mode?: 'combobox' | 'multiple' | 'tags' | 'autocomplete';

    Option?: ComponentType<OptionProps<ValueType>>;
}

export interface OptionListProps<OptionType> {
    size: Size;
    options?: OptionType[];
    width: ListProps<never>['width'];
    visibleOptions: number;
    /**
     * @description Pass `null` to hide header
     * @default null
     */
    header?: ReactNode;
    /**
     * @description Pass `null` to hide footer
     * @default null
     */
    footer?: ReactNode;
    /**
     * @description Pass `null` to hide empty placeholder
     * @default null
     */
    emptyPlaceholder?: ReactNode;
    nativeScrollbar?: boolean;
    onScroll?: (event: UIEvent<HTMLElement>) => void;

    renderOption: (
        option: OptionType,
        index: number,
        extraProps: RenderItemExtraProps,
    ) => ReactNode;
}
