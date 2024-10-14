import {
    HTMLProps,
    PropsWithoutRef,
    Reducer,
    RefCallback,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    useSyncExternalStore,
} from 'react';
import mergeRefs from 'react-merge-refs';
import memoizeOne from 'memoize-one';

import {
    equalOrContains,
    isClient,
    isNonNullable,
    isNullable,
    noop,
    returnFalse,
    returnTrue,
    shallowEqual,
    useDidUpdate,
} from '@alfalab/core-components-shared';

import { Action, createStore } from './nano-redux';
import { BaseValueType, LabeledValue } from './types';
import { optionTitle, toArrayValue } from './utils';

export type SelectAction<T> =
    | Action<'value', T[]>
    | Action<'select', T>
    | Action<'deselect', T>
    | Action<'search', string | undefined>;

export interface SelectState<T> {
    value: T[];
    search: string | undefined;
}

function selectReducer<T>(state: SelectState<T>, action: SelectAction<T>): SelectState<T> {
    switch (action.type) {
        case 'value':
            return { ...state, value: action.payload };
        case 'select': {
            const value = state.value.concat(action.payload);

            return { ...state, value };
        }
        case 'deselect': {
            const value = state.value.filter((selectedValue) => selectedValue !== action.payload);

            return { ...state, value };
        }
        case 'search':
            return { ...state, search: action.payload };
        default:
            return state;
    }
}

interface LifeCycleHooks<State> {
    didUpdate?: (prevState: State, state: State) => void;
}

interface UseSelectProps<
    ValueType extends BaseValueType,
    OptionType,
    SelectableOptionType extends OptionType,
> extends LifeCycleHooks<SelectState<ValueType>> {
    multiple?: boolean;
    value?: LabeledValue<ValueType> | Array<LabeledValue<ValueType>> | ValueType | ValueType[];
    defaultValue?:
        | LabeledValue<ValueType>
        | Array<LabeledValue<ValueType>>
        | ValueType
        | ValueType[];
    search?: string;
    options?: OptionType[];
    controlled?: () => { value?: boolean; search?: boolean };
    filterOptions?: (searchValue: string | undefined, option: OptionType) => boolean;
    selectable: (option: OptionType) => option is SelectableOptionType;
    optionValue: (option: SelectableOptionType) => ValueType;
    onSelect?: (value: ValueType, option: OptionType) => void;
    onDeselect?: (value: ValueType, option: OptionType) => void;
    allowDeselect?: boolean;
}

export function useSelect<
    ValueType extends BaseValueType,
    OptionType,
    SelectableOptionType extends OptionType,
>({
    value: valueFromProps,
    defaultValue,
    search: searchFromProps,
    controlled = () => ({ search: false, value: false }),
    didUpdate,
    options = [],
    filterOptions = returnTrue,
    optionValue,
    selectable,
    multiple = false,
    allowDeselect = multiple,
    onSelect,
    onDeselect,
}: UseSelectProps<ValueType, OptionType, SelectableOptionType>) {
    const [{ dispatch, getState, subscribe }] = useState(() => {
        const initialState: SelectState<ValueType> = {
            value: toArrayValue(valueFromProps ?? defaultValue),
            search: searchFromProps,
        };

        return createStore<SelectState<ValueType>, SelectAction<ValueType>>(
            selectReducer,
            initialState,
        );
    });
    const state = useSyncExternalStore(subscribe, getState);
    const { search, value } = state;
    const memoized = useMemo(
        () => ({
            toArrayValue: memoizeOne(toArrayValue<ValueType>),
            shallowEqual: memoizeOne(shallowEqual<ValueType[]>),
        }),
        [],
    );
    const selectedOptions = useMemo(
        () =>
            options.filter(
                (option): option is SelectableOptionType =>
                    selectable(option) && value.includes(optionValue(option)),
            ),
        [optionValue, options, selectable, value],
    );
    const filteredOptions = useMemo(() => {
        const predicate = (option: OptionType) => filterOptions(search, option);

        return options.filter(predicate);
    }, [filterOptions, options, search]);
    const setValue = useCallback(
        (nextValue: ValueType[]) => {
            dispatch({ type: 'value', payload: nextValue });
        },
        [dispatch],
    );
    const selectOption = useCallback(
        (option: OptionType) => {
            if (!selectable(option)) {
                return;
            }

            const optValue = optionValue(option);

            onSelect?.(optValue, option);

            if (multiple) {
                dispatch({ type: 'select', payload: optValue });
            } else {
                setValue([optValue]);
            }
        },
        [dispatch, multiple, onSelect, optionValue, selectable, setValue],
    );
    const deselectOption = useCallback(
        (option: OptionType) => {
            if (!selectable(option) || !allowDeselect) {
                return;
            }

            const optValue = optionValue(option);

            onDeselect?.(optValue, option);
            dispatch({ type: 'deselect', payload: optValue });
        },
        [allowDeselect, dispatch, onDeselect, optionValue, selectable],
    );
    const { value: isControlledValue = false, search: isControlledSearch = false } = controlled();

    if (isControlledValue) {
        const nextValue = memoized.toArrayValue(valueFromProps);

        if (!memoized.shallowEqual(value, nextValue)) {
            dispatch({ type: 'value', payload: nextValue });
        }
    }

    if (isControlledSearch && searchFromProps !== search) {
        dispatch({ type: 'search', payload: searchFromProps });
    }

    useDidUpdate(state, didUpdate);

    return {
        value,
        setValue,
        search,
        options,
        filteredOptions,
        selectedOptions,
        dispatch,
        selectOption,
        deselectOption,
    } as const;
}

type ComboboxAction =
    | Action<'open', boolean | undefined>
    | Action<'toggleOpen'>
    | Action<'highlight', number>;

interface ComboboxState {
    open?: boolean;
    highlightedIndex: number;
}

const comboboxReducer: Reducer<ComboboxState, ComboboxAction> = (state, action) => {
    switch (action.type) {
        case 'toggleOpen':
            return { ...state, open: !state.open };
        case 'open':
            return { ...state, open: action.payload };
        case 'highlight':
            return state.highlightedIndex === action.payload
                ? state
                : { ...state, highlightedIndex: action.payload };
        default:
            return state;
    }
};

export interface UseComboboxProps<OptionType> extends LifeCycleHooks<ComboboxState> {
    environment?: typeof window;
    open?: boolean;
    defaultOpen?: boolean;
    controlled?: () => boolean;
    nextHighlightedIndex: (index: number, options: OptionType[]) => number;
    prevHighlightedIndex: (index: number, options: OptionType[]) => number;
    nearestHighlightedIndex: (index: number, options: OptionType[]) => number;
    indexScrollTo: (index: number, options: OptionType[]) => number;
    options?: OptionType[];
    selectedOptions?: OptionType[];
    multiple?: boolean;
    onSelect?: (option: OptionType) => void;
    onDeselect?: (option: OptionType) => void;
}

export function useCombobox<
    OptionType extends { disabled?: boolean; title?: string; label: React.ReactNode },
>({
    environment = isClient() ? window : undefined,
    open: openFromProps,
    defaultOpen = false,
    didUpdate,
    controlled = returnFalse,
    nextHighlightedIndex,
    prevHighlightedIndex,
    nearestHighlightedIndex,
    multiple = false,
    options = [],
    selectedOptions = [],
    onSelect,
    onDeselect,
    indexScrollTo,
}: UseComboboxProps<OptionType>) {
    const optionsListRef = useRef<{ scrollToIndex(index: number): void } | null>(null);
    const inputRef = useRef<HTMLElement>(null);
    const menuRef = useRef<HTMLElement>(null);
    const lastHighlightedIndexRef = useRef(-1);
    const shouldScroll = useRef(true);

    const [{ subscribe, dispatch, getState }] = useState(() =>
        createStore(comboboxReducer, {
            open: openFromProps ?? defaultOpen,
            highlightedIndex: -1,
        }),
    );
    const state = useSyncExternalStore(subscribe, getState);
    const { open = false, highlightedIndex } = state;

    if (controlled() && state.open !== openFromProps) {
        dispatch({ type: 'open', payload: openFromProps });
    }

    const nearestIndex = nearestHighlightedIndex(highlightedIndex, options);

    if (highlightedIndex !== nearestIndex) {
        dispatch({ type: 'highlight', payload: nearestIndex });
    }

    const openMenu = useCallback(() => {
        dispatch({ type: 'open', payload: true });
    }, [dispatch]);
    const closeMenu = useCallback(() => {
        dispatch({ type: 'open', payload: false });
    }, [dispatch]);
    const toggleMenu = useCallback(() => {
        dispatch({ type: 'toggleOpen', payload: null });
    }, [dispatch]);
    const setHighlightedIndex = useCallback(
        (index: number) => {
            dispatch({ type: 'highlight', payload: index });
        },
        [dispatch],
    );
    const getInputProps = useCallback(
        (inputProps?: Partial<HTMLProps<HTMLElement>>): HTMLProps<HTMLElement> => ({
            ref: mergeRefs([inputRef, inputProps?.ref ?? null]),
            onBlur: (event) => {
                inputProps?.onBlur?.(event);
            },
            onKeyDown: (event) => {
                const { key, code } = event;
                const lastHighlightedIndex = lastHighlightedIndexRef.current;

                if (key === 'ArrowDown') {
                    event.preventDefault();

                    if (open) {
                        shouldScroll.current = true;
                        setHighlightedIndex(
                            highlightedIndex === -1 && lastHighlightedIndex !== -1
                                ? lastHighlightedIndex
                                : nextHighlightedIndex(lastHighlightedIndex, options),
                        );
                    } else {
                        openMenu();
                    }
                } else if (key === 'ArrowUp') {
                    event.preventDefault();

                    if (open) {
                        shouldScroll.current = true;
                        setHighlightedIndex(
                            highlightedIndex === -1 && lastHighlightedIndex !== -1
                                ? lastHighlightedIndex
                                : prevHighlightedIndex(lastHighlightedIndex, options),
                        );
                    } else {
                        openMenu();
                    }
                } else if (key === 'Enter' || code === 'Space') {
                    event.preventDefault();
                    if (open) {
                        if (highlightedIndex < 0 || highlightedIndex >= options.length) {
                            return;
                        }

                        const option = options[highlightedIndex];

                        if (selectedOptions.includes(option)) {
                            onDeselect?.(option);
                        } else {
                            onSelect?.(option);
                        }
                        if (multiple) {
                            return;
                        }

                        closeMenu();
                    } else {
                        openMenu();
                    }
                } else if (open && key === 'Escape') {
                    event.preventDefault();
                    closeMenu();
                }
            },
        }),
        [
            closeMenu,
            highlightedIndex,
            multiple,
            nextHighlightedIndex,
            onDeselect,
            onSelect,
            open,
            openMenu,
            options,
            prevHighlightedIndex,
            selectedOptions,
            setHighlightedIndex,
        ],
    );

    const getOptionProps = useCallback(
        (
            index: number,
            optionProps: Partial<HTMLProps<HTMLElement>> = {},
        ): PropsWithoutRef<HTMLProps<HTMLElement>> => {
            const option = options[index];
            const selected = selectedOptions.includes(option);
            const { disabled = false } = option;
            const title = optionTitle(option);

            return {
                ...optionProps,
                role: 'option',
                'aria-selected': selected,
                'aria-disabled': disabled,
                title,
                onClick: (event) => {
                    if (disabled) {
                        return;
                    }

                    optionProps.onClick?.(event);

                    if (selected) {
                        onDeselect?.(option);
                    } else {
                        onSelect?.(option);
                    }

                    if (multiple) {
                        return;
                    }

                    closeMenu();
                },
                onMouseDown: (event) => {
                    optionProps?.onMouseDown?.(event);
                    // keep focus on the input after item click select.
                    event.preventDefault();
                },
                onMouseMove: () => {
                    if (!getState().open) {
                        return;
                    }
                    shouldScroll.current = false;
                    setHighlightedIndex(index);
                },
            };
        },
        [
            closeMenu,
            getState,
            multiple,
            onDeselect,
            onSelect,
            options,
            selectedOptions,
            setHighlightedIndex,
        ],
    );

    const getGroupOptionProps = useCallback(
        (
            index: number,
            groupOptionProps: Partial<HTMLProps<HTMLElement>> = {},
        ): PropsWithoutRef<HTMLProps<HTMLElement>> => ({
            ...groupOptionProps,
            role: 'group',
            onClick: (event) => {
                groupOptionProps?.onClick?.(event);
            },
            onMouseDown: (event) => {
                groupOptionProps?.onMouseDown?.(event);
                // keep focus on the input after item click select.
                event.preventDefault();
            },
            onMouseMove: () => {
                if (!getState().open) {
                    return;
                }

                shouldScroll.current = false;
                setHighlightedIndex(-1);
            },
        }),
        [getState, setHighlightedIndex],
    );

    const getMenuProps = useCallback(
        (
            menuProps?: Partial<HTMLProps<HTMLElement>>,
        ): PropsWithoutRef<HTMLProps<HTMLElement>> & { ref?: RefCallback<HTMLElement> } => ({
            ref: mergeRefs([menuRef, menuProps?.ref ?? null]),
            onMouseLeave: () => {
                shouldScroll.current = false;
                setHighlightedIndex(-1);
            },
            role: 'listbox',
        }),
        [setHighlightedIndex],
    );

    useEffect(() => {
        const input = inputRef.current;

        if (!open || isNullable(environment) || isNullable(input)) {
            return;
        }

        if (environment.document.activeElement === input) {
            return;
        }

        input.focus();
    }, [environment, open]);

    useEffect(() => {
        if (highlightedIndex === -1) {
            return;
        }

        lastHighlightedIndexRef.current = highlightedIndex;
    }, [highlightedIndex]);

    useEffect(() => {
        let index = -1;

        if (open) {
            if (highlightedIndex < 0 && selectedOptions.length > 0) {
                const [selectedOption] = selectedOptions;

                index = options.indexOf(selectedOption);
            } else {
                return;
            }
        }

        setHighlightedIndex(index);
        lastHighlightedIndexRef.current = index;
    }, [highlightedIndex, open, options, selectedOptions, setHighlightedIndex]);

    useEffect(() => {
        if (isNullable(environment)) {
            return noop;
        }

        const refs = [inputRef, menuRef];

        const handleMouseUp = ({ target: nextFocusedElement }: MouseEvent) => {
            const elements = refs.map(({ current }) => current).filter(isNonNullable);

            if (
                !(nextFocusedElement instanceof Node) ||
                elements.some((element) => equalOrContains(element, nextFocusedElement))
            ) {
                return;
            }

            dispatch({ type: 'open', payload: false });
        };

        environment.addEventListener('mouseup', handleMouseUp);

        return () => {
            environment.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dispatch, environment]);

    const indexToScroll = useMemo(
        () => (!open || highlightedIndex < 0 ? -1 : indexScrollTo(highlightedIndex, options)),
        [highlightedIndex, indexScrollTo, open, options],
    );

    useEffect(() => {
        if (indexToScroll === -1) {
            return;
        }

        if (shouldScroll.current) {
            optionsListRef.current?.scrollToIndex(indexToScroll);
        } else {
            shouldScroll.current = true;
        }
    }, [indexToScroll]);

    useDidUpdate(state, didUpdate);

    return {
        open,
        highlightedIndex,
        openMenu,
        closeMenu,
        toggleMenu,
        setHighlightedIndex,
        getInputProps,
        getOptionProps,
        getGroupOptionProps,
        getMenuProps,
        optionsListRef,
    } as const;
}
