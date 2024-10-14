import React, {
    forwardRef,
    ForwardRefExoticComponent,
    ForwardRefRenderFunction,
    RefAttributes,
    useMemo,
    useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';

import { FormControlDesktop } from '@alfalab/core-components-form-control/desktop';
import { Input } from '@alfalab/core-components-input';
import { PrivateListRefType } from '@alfalab/core-components-list';
import { Popover } from '@alfalab/core-components-popover';
import { Arrow } from '@alfalab/core-components-select/components/arrow';
import { Field as LegacyField } from '@alfalab/core-components-select/components/field';
import {
    hasOwnProperty,
    internalMergeRefs,
    isBool,
    isFn,
    isNullable,
    isObj,
    noop,
    preventDefault,
    shallowEqual,
    useElementWidth,
} from '@alfalab/core-components-shared';

import { FieldAdapter } from './components/field-adapter';
import { Option as BaseOptionComponent } from './components/option';
import { OptionsList } from './components/options-list';
import { useCombobox, useSelect } from './hooks';
import {
    BaseOption,
    BaseValueType,
    LabeledValue,
    RefType,
    SelectOption,
    SelectProps,
} from './types';
import {
    defaultFilterOptions,
    indexScrollTo,
    isBaseOption,
    isGroupOption,
    makeOptionsFlat,
    nextHighlightedIndex,
    optionTitle,
    optionValue as optionValueFn,
    prevHighlightedIndex,
    toLabeledValue,
} from './utils';

function SelectRenderFunction<ValueType extends BaseValueType>(
    ...[props, ref]: Parameters<ForwardRefRenderFunction<RefType, SelectProps<ValueType>>>
): ReturnType<ForwardRefRenderFunction<RefType, SelectProps<ValueType>>> {
    const {
        mode,
        options: optionsFromProps = [],
        optionsListWidth = 'field',
        size = 48,
        visibleOptions = 5,
        Option = BaseOptionComponent,
        optionSize = 48,
        search: searchFromProps = false,
        placeholder,
        disabled,
        label = null,
        clear: clearFromProps,
        onClear,
        onOpenChange,
        onBlur,
        open: openFromProps,
        defaultOpen = false,
        value: valueFromProps,
        defaultValue,
        onChange,
        onSelect,
        onDeselect,
        allowDeselect = false,
        autoFocus,
        onFocus,
    } = props;
    const fieldRef = useRef<HTMLElement>(null);
    const optionsListRef = useRef<PrivateListRefType>(null);
    const [rootElementWidth, rootElementRef] = useElementWidth<HTMLDivElement>();
    const optionsListRootRef =
        useRef<React.ComponentRef<typeof OptionsList<SelectOption<ValueType>>>>(null);
    const multiple = mode === 'multiple' || mode === 'tags';
    const flatOptions = useMemo(() => makeOptionsFlat(optionsFromProps), [optionsFromProps]);
    const filterOptions = useMemo(() => {
        const isDefaultFilter = isObj(searchFromProps)
            ? isBool(searchFromProps.filterOptions) && searchFromProps.filterOptions
            : searchFromProps;

        if (isDefaultFilter) {
            return defaultFilterOptions<ValueType>;
        }

        if (isObj(searchFromProps) && isFn(searchFromProps.filterOptions)) {
            return searchFromProps.filterOptions;
        }

        return undefined;
    }, [searchFromProps]);
    const {
        labeledValue,
        value,
        setValue,
        selectedOptions,
        filteredOptions,
        selectOption,
        deselectOption,
        clear,
        search,
        setSearch,
    } = useSelect<ValueType, SelectOption<ValueType>, BaseOption<ValueType>>({
        optionValue: optionValueFn,
        selectable: isBaseOption,
        multiple,
        options: flatOptions,
        value: valueFromProps,
        defaultValue,
        filterOptions,
        onSelect,
        onDeselect,
        onClear,
        allowDeselect: multiple || allowDeselect,
        search: isObj(searchFromProps) ? searchFromProps.value : undefined,
        controlled: () => ({
            value: hasOwnProperty(props, 'value'),
            search: isObj(searchFromProps) && hasOwnProperty(searchFromProps, 'value'),
        }),
        didUpdate(prevState, state) {
            if (!shallowEqual(prevState.value, state.value)) {
                if (multiple) {
                    onChange?.(value, selectedOptions);
                } else {
                    const [selectedValue] = value;
                    const [selectedOption = null] = selectedOptions;

                    onChange?.(selectedValue, selectedOption);
                }
            }

            if (!(prevState.search === state.search) && isObj(searchFromProps)) {
                searchFromProps.onSearch?.(state.search);
            }
        },
    });

    const {
        highlightedIndex,
        open = false,
        toggleMenu,
        getInputProps,
        getOptionProps,
        getGroupOptionProps,
        getMenuProps,
        getSearchProps,
        getToggleButtonProps,
        getClearButtonProps,
    } = useCombobox({
        autoFocus,
        options: filteredOptions,
        selectedOptions,
        open: openFromProps,
        defaultOpen,
        multiple,
        onSelect: selectOption,
        onDeselect: deselectOption,
        onClear: clear,
        search,
        onSearch: setSearch,
        controlled: () => hasOwnProperty(props, 'open'),
        prevHighlightedIndex,
        nextHighlightedIndex,
        didUpdate(prevState, state) {
            if (!(prevState.open === state.open)) {
                onOpenChange?.(state.open);
            }
        },
        getOptionsElement: () => optionsListRef.current?.scrollElement ?? null,
        scrollToIndex: (index, prevIndex, options) => {
            const optionsList = optionsListRef.current;

            if (isNullable(optionsList)) {
                return;
            }
            const scrollTo = indexScrollTo(index, prevIndex, options);

            optionsList.scrollToIndex(scrollTo);
        },
    });

    const fieldProps =
        mode === 'autocomplete'
            ? getInputProps({ ref: internalMergeRefs([fieldRef]), onFocus, onBlur })
            : getToggleButtonProps({ ref: fieldRef, onFocus, onBlur });
    const menuProps = getMenuProps();
    const renderOption = (option: SelectOption<ValueType>, index: number) => {
        const { label: optionLabel } = option;

        if (isGroupOption(option)) {
            const optionGroupProps = getGroupOptionProps<HTMLDivElement>(index);

            return (
                <div {...optionGroupProps} style={{ minHeight: optionSize }}>
                    {optionLabel}
                </div>
            );
        }

        const selected = selectedOptions.includes(option);
        const { disabled: disabledOption } = option;
        const optionProps = getOptionProps<HTMLDivElement>(index, {
            disabled: disabledOption,
            onClick: preventDefault,
            title: optionTitle(option),
        });

        return (
            <Option
                selected={selected}
                option={option}
                multiple={multiple}
                size={optionSize}
                disabled={disabledOption}
                highlighted={highlightedIndex === index}
                innerProps={optionProps}
            />
        );
    };

    const searchProps = getSearchProps<HTMLInputElement>({ value: search });

    const selectedValue = useMemo(
        () =>
            value.map<LabeledValue<ValueType>>(
                (val) =>
                    selectedOptions.find((option) => option.value === val) ??
                    labeledValue.find((labeled) => labeled.value === val) ??
                    toLabeledValue(val),
            ),
        [labeledValue, selectedOptions, value],
    );

    return (
        <div
            ref={rootElementRef}
            onKeyDown={disabled ? undefined : fieldProps.onKeyDown}
            onBlur={fieldProps.onBlur}
        >
            <FieldAdapter
                // required in LegacyField but didn't used in FieldAdapter
                setSelectedItems={noop}
                toggleMenu={toggleMenu}
                value={selectedValue}
                onValueChange={setValue}
                multiple={multiple}
                open={open}
                disabled={disabled}
                size={size}
                placeholder={placeholder}
                // TODO label props
                label={label === null ? null : <span>{label}</span>}
                // labelView={labelView}
                ArrowComponent={Arrow}
                // error={error}
                // hint={hint}
                // valueRenderer={valueRenderer}
                // className={fieldClassName}
                innerProps={{
                    onFocus: disabled ? undefined : fieldProps.onFocus,
                    onMouseDown: disabled ? undefined : fieldProps.onMouseDown,
                    onClick: disabled ? undefined : fieldProps.onClick,
                    ref: mergeRefs([fieldRef, fieldProps.ref ?? null]),
                    id: 'TODO',
                    tabIndex: disabled ? undefined : 0,
                }}
                LegacyField={LegacyField}
                FormControlComponent={FormControlDesktop}
                clear={clearFromProps}
                clearProps={clearFromProps ? getClearButtonProps() : undefined}
            />
            <Popover
                open={!disabled && open}
                anchorElement={fieldRef.current}
                position='bottom-start'
                preventFlip={true}
                // needs for correct virtual list work
                withTransition={false}
            >
                <OptionsList
                    ref={optionsListRootRef}
                    header={
                        (isObj(searchFromProps) || searchFromProps) && (
                            <Input
                                ref={searchProps.ref}
                                value={searchProps.value}
                                onChange={searchProps.onChange}
                            />
                        )
                    }
                    listRef={optionsListRef}
                    innerProps={menuProps}
                    options={filteredOptions}
                    visibleOptions={visibleOptions}
                    width={optionsListWidth}
                    minWidth={rootElementWidth}
                    renderOption={renderOption}
                    size={optionSize}
                />
            </Popover>
        </div>
    );
}

export const NextSelect = forwardRef(SelectRenderFunction) as ForwardRefExoticComponent<
    React.PropsWithoutRef<SelectProps> & RefAttributes<RefType>
> &
    (<ValueType extends BaseValueType>(
        ...params: Parameters<
            ForwardRefExoticComponent<
                React.PropsWithoutRef<SelectProps<ValueType>> & RefAttributes<RefType>
            >
        >
    ) => ReturnType<
        ForwardRefExoticComponent<
            React.PropsWithoutRef<SelectProps<ValueType>> & RefAttributes<RefType>
        >
    >);
