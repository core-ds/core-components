import React, {
    ComponentRef,
    FC,
    forwardRef,
    ForwardRefRenderFunction,
    HTMLProps,
    PropsWithoutRef,
    ReactNode,
    RefAttributes,
    useMemo,
    useRef,
    useState,
} from 'react';

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
        optionsSize = 48,
    } = props;
    const [{ open, search, value }, dispatch, store] = useSelect<
        SelectOption<ValueType>,
        ValueType
    >(props);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const resetHighlightedIndex = () => setHighlightedIndex(-1);
    const multiple = mode === 'multiple' || mode === 'tags';
    const flatOptions = useMemo(() => makeOptionsFlat(options), [options]);
    const listRef = useRef<ComponentRef<typeof OptionsList>>(null);
    const renderOption = (option: SelectOption<ValueType>, index: number): ReactNode => {
        const { label } = option;

        if (isGroup(option)) {
            return <div>{label}</div>;
        }

        const innerProps: PropsWithoutRef<HTMLProps<HTMLElement>> = {
            style: {
                cursor: 'pointer',
                minWidth: 150,
                minHeight: size,
            },
            'aria-disabled': option.disabled,
            'aria-selected': multiple ? undefined : isOptionSelected(store, option),
            role: 'option',
            title: getTitle(option),
            onClick: (event) => {
                event.preventDefault();

                const { value: optionValue } = option;

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
                size={optionsSize}
                disabled={option.disabled}
                highlighted={highlightedIndex === index}
                innerProps={innerProps}
            />
        );
    };

    return (
        <SelectStoreContext.Provider value={store}>
            <pre>{JSON.stringify(value, null, 2)}</pre>
            <button
                type='button'
                onClick={() => {
                    listRef.current?.scrollToIndex(2, { align: 'start' });
                }}
            >
                Scroll
            </button>
            <OptionsList
                ref={listRef}
                options={flatOptions}
                visibleOptions={visibleOptions}
                width={optionsListWidth}
                renderOption={renderOption}
                size={optionsSize}
            />
        </SelectStoreContext.Provider>
    );
}

export const NextSelect = forwardRef(RenderFunc) as <ValueType extends BaseValueType>(
    ...params: Parameters<FC<PropsWithoutRef<SelectProps<ValueType>> & RefAttributes<RefType>>>
) => ReturnType<FC<PropsWithoutRef<SelectProps<ValueType>> & RefAttributes<RefType>>>;
