import React, {
    ComponentRef,
    forwardRef,
    ForwardRefExoticComponent,
    ForwardRefRenderFunction,
    RefAttributes,
    useImperativeHandle,
    useMemo,
    useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';

import { FormControlDesktop } from '@alfalab/core-components-form-control/desktop';
import { Popover } from '@alfalab/core-components-popover';
import { Arrow } from '@alfalab/core-components-select/components/arrow';
import { Field as LegacyField } from '@alfalab/core-components-select/components/field';
import {
    createUseMeasure,
    equalOrContains,
    hasOwnProperty,
    isBool,
    isFunc,
    isNonNullable,
    isObject,
    noop,
    shallowEqual,
} from '@alfalab/core-components-shared';

import { FieldAdapter } from './components/field-adapter';
import { RenderItemExtraProps } from './components/list';
import { Option as BaseOptionComponent } from './components/option';
import { OptionsList } from './components/options-list';
import { SelectStoreContext } from './context';
import { useCombobox, useSelect } from './hooks';
import { BaseOption, BaseValueType, RefType, SelectOption, SelectProps } from './types';
import {
    defaultFilterOptions,
    indexScrollTo,
    isBaseOption,
    isGroupOption,
    makeOptionsFlat,
    nearestHighlightedIndex,
    nextHighlightedIndex,
    optionValue as optionValueFn,
    prevHighlightedIndex,
} from './utils';

const useRootElementWidth = createUseMeasure((element: HTMLDivElement) => {
    const { width } = element.getBoundingClientRect();

    return width;
}, 0);

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
        clear,
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
    } = props;
    const fieldRef = useRef<HTMLDivElement | HTMLInputElement | null>(null);
    const [rootElementWidth, rootElementRef] = useRootElementWidth();
    const optionsListRef = useRef<ComponentRef<typeof OptionsList<SelectOption<ValueType>>>>(null);
    const multiple = mode === 'multiple' || mode === 'tags';
    const flatOptions = useMemo(() => makeOptionsFlat(optionsFromProps), [optionsFromProps]);
    const filterOptions = useMemo(() => {
        const isDefaultFilter = isObject(searchFromProps)
            ? isBool(searchFromProps.filterOptions) && searchFromProps.filterOptions
            : searchFromProps;

        if (isDefaultFilter) {
            return defaultFilterOptions<ValueType>;
        }

        if (isObject(searchFromProps) && isFunc(searchFromProps.filterOptions)) {
            return searchFromProps.filterOptions;
        }

        return undefined;
    }, [searchFromProps]);
    const { value, search, selectedOptions, deselectOption, selectOption, setValue } = useSelect<
        ValueType,
        SelectOption<ValueType>,
        BaseOption<ValueType>
    >({
        optionValue: optionValueFn,
        selectable: isBaseOption,
        multiple,
        options: flatOptions,
        value: valueFromProps,
        defaultValue,
        filterOptions,
        onSelect,
        onDeselect,
        allowDeselect: multiple || allowDeselect,
        search: isObject(searchFromProps) ? searchFromProps.value : undefined,
        controlled: () => ({
            value: hasOwnProperty(props, 'value'),
            search: isObject(searchFromProps) && hasOwnProperty(searchFromProps, 'value'),
        }),
        didUpdate(prevState, state) {
            if (!shallowEqual(prevState.value, state.value)) {
                if (multiple) {
                    onChange?.(value, selectedOptions);
                } else {
                    const [onlyValue] = value;
                    const [onlyOption] = selectedOptions;

                    onChange?.(onlyValue, onlyOption);
                }
            }

            if (prevState.search !== state.search) {
                if (isObject(searchFromProps)) {
                    searchFromProps.onSearch?.(state.search);
                }
            }
        },
    });

    const {
        highlightedIndex,
        open = false,
        closeMenu,
        openMenu,
        toggleMenu,
        getInputProps,
        getOptionProps,
        getGroupOptionProps,
        getMenuProps,
        optionsListRef: comboboxOptionsListRef,
    } = useCombobox({
        options: flatOptions,
        selectedOptions,
        open: openFromProps,
        defaultOpen,
        onSelect: selectOption,
        onDeselect: deselectOption,
        controlled: () => hasOwnProperty(props, 'open'),
        prevHighlightedIndex,
        nextHighlightedIndex,
        nearestHighlightedIndex,
        indexScrollTo,
        didUpdate(prevState, state) {
            if (prevState.open !== state.open) {
                onOpenChange?.(state.open);
            }
        },
    });

    useImperativeHandle(
        comboboxOptionsListRef,
        () => ({
            scrollToIndex(index) {
                optionsListRef.current?.scrollToIndex(index);
            },
        }),
        [],
    );

    const inputProps = getInputProps({ ref: fieldRef, onBlur });
    const menuProps = getMenuProps();
    const renderOption = (
        option: SelectOption<ValueType>,
        index: number,
        extraProps: RenderItemExtraProps,
    ) => {
        const { label: optionLabel } = option;

        if (isGroupOption(option)) {
            const optionGroupProps = getGroupOptionProps(index, extraProps);

            return (
                <div {...optionGroupProps} key={optionGroupProps.key}>
                    {optionLabel}
                </div>
            );
        }

        const selected = selectedOptions.includes(option);

        return (
            <Option
                selected={selected}
                option={option}
                multiple={multiple}
                size={optionSize}
                disabled={option.disabled}
                highlighted={highlightedIndex === index}
                innerProps={getOptionProps(index, {
                    ...extraProps,
                    onClick: (event) => {
                        event.preventDefault();
                    },
                })}
            />
        );
    };

    const handleFieldClick = (event: React.MouseEvent<HTMLElement>) => {
        if (!(mode === 'autocomplete') || event.currentTarget.tagName !== 'INPUT') {
            toggleMenu();
        } else {
            openMenu();
        }
    };

    const handleFieldBlur = (event: React.FocusEvent<HTMLElement>) => {
        const fieldElement = fieldRef.current;
        const listElement = optionsListRef.current?.getRootElement();
        const nextFocusedElement = event.relatedTarget;
        const isNextFocusInsideField =
            isNonNullable(fieldElement) && equalOrContains(fieldElement, nextFocusedElement);
        const isNextFocusInsideList =
            isNonNullable(listElement) && equalOrContains(listElement, nextFocusedElement);

        if (!isNextFocusInsideField && !isNextFocusInsideList) {
            inputProps.onBlur?.(event);
            closeMenu();
        }
    };

    return (
        <SelectStoreContext.Provider value={null}>
            <div ref={rootElementRef}>
                <FieldAdapter
                    // required in LegacyField but didn't used in FieldAdapter
                    setSelectedItems={noop}
                    toggleMenu={toggleMenu}
                    value={selectedOptions}
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
                    /*
                     * error={error}
                     * hint={hint}
                     * valueRenderer={valueRenderer}
                     * className={fieldClassName}
                     */
                    clear={clear}
                    // onClear={handleFieldClear}
                    innerProps={{
                        onBlur: handleFieldBlur,
                        onClick: disabled ? undefined : handleFieldClick,
                        ref: mergeRefs([fieldRef, inputProps.ref ?? null]),
                        id: 'TODO',
                        tabIndex: disabled ? undefined : 0,
                        onKeyDown: inputProps.onKeyDown,
                    }}
                    LegacyField={LegacyField}
                    FormControlComponent={FormControlDesktop}
                />
                <Popover open={open} anchorElement={fieldRef.current} position='bottom-start'>
                    <OptionsList
                        ref={optionsListRef}
                        innerProps={menuProps}
                        options={flatOptions}
                        visibleOptions={visibleOptions}
                        width={optionsListWidth === 'field' ? rootElementWidth : optionsListWidth}
                        minWidth={rootElementWidth}
                        renderOption={renderOption}
                        size={optionSize}
                    />
                </Popover>
            </div>
        </SelectStoreContext.Provider>
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
