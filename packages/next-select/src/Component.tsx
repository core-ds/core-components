import React, {
    forwardRef,
    ForwardRefExoticComponent,
    ForwardRefRenderFunction,
    HTMLProps,
    PropsWithoutRef,
    RefAttributes,
    RefCallback,
    useMemo,
    useState,
} from 'react';

import { isObject } from '@alfalab/core-components-shared';

import { RenderItemExtraProps } from './components/list';
import { Option as BaseOptionComponent } from './components/option';
import { OptionsList } from './components/options-list';
import { SelectStoreContext } from './context';
import { useSelect } from './hooks';
import { BaseValueType, RefType, SelectOption, SelectProps } from './types';
import { getTitle, getValue, isGroup, isOptionSelected, makeOptionsFlat } from './utils';

function RenderFunc<ValueType extends BaseValueType>(
    ...[props, ref]: Parameters<ForwardRefRenderFunction<RefType, SelectProps<ValueType>>>
): ReturnType<ForwardRefRenderFunction<RefType, SelectProps<ValueType>>> {
    const {
        mode,
        options,
        optionsListWidth = 'content',
        size = 48,
        visibleOptions = 5,
        Option = BaseOptionComponent,
        optionSize = 48,
        search: searchFromProps = false,
    } = props;
    const [{ open, search, value }, dispatch, store] = useSelect<
        SelectOption<ValueType>,
        ValueType
    >(props);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const resetHighlightedIndex = () => setHighlightedIndex(-1);
    const multiple = mode === 'multiple' || mode === 'tags';
    const flatOptions = useMemo(() => makeOptionsFlat(options), [options]);
    const renderOption = (
        option: SelectOption<ValueType>,
        index: number,
        extraProps: RenderItemExtraProps,
    ) => {
        const { label } = option;

        if (isGroup(option)) {
            return <div {...extraProps}>{label}</div>;
        }

        const innerProps: PropsWithoutRef<HTMLProps<HTMLElement>> & {
            ref?: RefCallback<HTMLElement>;
        } = {
            ...extraProps,
            style: {
                cursor: 'pointer',
                minWidth: 150,
                minHeight: optionSize,
            },
            'aria-disabled': option.disabled,
            'aria-selected': multiple ? undefined : isOptionSelected(store, option),
            role: 'option',
            title: getTitle(option),
            onClick: (event) => {
                event.preventDefault();
                const optionValue = option.value;

                if (!isOptionSelected(store, option)) {
                    props.onSelect?.(optionValue, option);
                    dispatch({ type: 'select', payload: optionValue });
                } else if (multiple) {
                    props.onDeselect?.(optionValue, option);
                    dispatch({ type: 'deselect', payload: optionValue });
                }

                props.onChange?.(getValue(store, multiple), option);

                if (multiple) {
                    return;
                }

                const nextOpen = false;

                props.onOpenChange?.(nextOpen);
                dispatch({ type: 'setOpen', payload: nextOpen });
            },
            onMouseEnter: () => setHighlightedIndex(index),
            onMouseLeave: resetHighlightedIndex,
        };

        return (
            <Option
                option={option}
                multiple={multiple}
                size={optionSize}
                disabled={option.disabled}
                highlighted={highlightedIndex === index}
                innerProps={innerProps}
            />
        );
    };

    return (
        <SelectStoreContext.Provider value={store}>
            <OptionsList
                options={flatOptions}
                visibleOptions={visibleOptions}
                width={optionsListWidth}
                renderOption={renderOption}
                size={optionSize}
            />
        </SelectStoreContext.Provider>
    );
}

export const NextSelect = forwardRef(RenderFunc) as ForwardRefExoticComponent<
    PropsWithoutRef<SelectProps> & RefAttributes<RefType>
> &
    (<ValueType extends BaseValueType>(
        ...params: Parameters<
            ForwardRefExoticComponent<
                PropsWithoutRef<SelectProps<ValueType>> & RefAttributes<RefType>
            >
        >
    ) => ReturnType<
        ForwardRefExoticComponent<PropsWithoutRef<SelectProps<ValueType>> & RefAttributes<RefType>>
    >);
