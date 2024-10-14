import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    useSyncExternalStore,
} from 'react';
import memoizeOne from 'memoize-one';

import {
    ensureArray,
    equalOrContains,
    internalMergeRefs,
    isClient,
    isNonNullable,
    isNullable,
    isObj,
    noop,
    returnFalse,
    returnNull,
    returnTrue,
    shallowEqual,
    useDidUpdate,
} from '@alfalab/core-components-shared';

import { Action, createStore, Reducer } from './nano-redux';
import { BaseValueType, LabeledValue } from './types';
import { toArrayValue } from './utils';

export type SelectAction<T> =
    | Action<'value', T[]>
    | Action<'select', T>
    | Action<'deselect', T>
    | Action<'search', string | undefined>;

export interface SelectState<T> {
    value: T[];
    search: string | undefined;
}

function selectStateReducer<T>(state: SelectState<T>, action: SelectAction<T>): SelectState<T> {
    switch (action.type) {
        case 'value':
            return { ...state, value: action.payload };
        case 'select': {
            const value = state.value.concat(action.payload);

            return { ...state, value };
        }
        case 'deselect': {
            const value = state.value.filter(
                (selectedValue) => !(selectedValue === action.payload),
            );

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
    onClear?: () => void;
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
    controlled,
    didUpdate,
    options = [],
    filterOptions = returnTrue,
    optionValue,
    selectable,
    multiple = false,
    allowDeselect = multiple,
    onSelect,
    onDeselect,
    onClear,
}: UseSelectProps<ValueType, OptionType, SelectableOptionType>) {
    const [{ dispatch, getState, subscribe }] = useState(() => {
        const initialState: SelectState<ValueType> = {
            value: toArrayValue(valueFromProps ?? defaultValue),
            search: searchFromProps,
        };

        return createStore<SelectState<ValueType>, SelectAction<ValueType>>(
            selectStateReducer,
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
        () => options.filter(selectable).filter((option) => value.includes(optionValue(option))),
        [optionValue, options, selectable, value],
    );
    const labeledValue = useMemo<Array<LabeledValue<ValueType>>>(() => {
        const labeledValues = ensureArray(valueFromProps ?? defaultValue).filter<
            LabeledValue<ValueType>
        >(isObj);

        return value
            .map((val) => labeledValues.find((labeled) => labeled.value === val))
            .filter(isNonNullable);
    }, [defaultValue, value, valueFromProps]);
    const filteredOptions = useMemo(
        () => options.filter((option: OptionType) => filterOptions(search, option)),
        [filterOptions, options, search],
    );
    const setValue = useCallback(
        (nextValue: ValueType[]) => {
            dispatch({ type: 'value', payload: nextValue });
        },
        [dispatch],
    );
    const clear = useCallback(() => {
        setValue([]);
        onClear?.();
    }, [onClear, setValue]);
    const selectOption = useCallback(
        (option: OptionType): boolean => {
            if (!selectable(option)) {
                return false;
            }

            const optValue = optionValue(option);

            onSelect?.(optValue, option);

            if (multiple) {
                dispatch({ type: 'select', payload: optValue });
            } else {
                setValue([optValue]);
            }

            return true;
        },
        [dispatch, multiple, onSelect, optionValue, selectable, setValue],
    );
    const deselectOption = useCallback(
        (option: OptionType): boolean => {
            if (!selectable(option) || !allowDeselect) {
                return false;
            }

            const optValue = optionValue(option);

            onDeselect?.(optValue, option);
            dispatch({ type: 'deselect', payload: optValue });

            return true;
        },
        [allowDeselect, dispatch, onDeselect, optionValue, selectable],
    );
    const setSearch = useCallback(
        (nextSearch: string | undefined) => {
            dispatch({ type: 'search', payload: nextSearch });
        },
        [dispatch],
    );
    const { value: isControlledValue = false, search: isControlledSearch = false } =
        controlled?.() ?? { value: false, search: false };
    const didUpdateRef = useDidUpdate(state, didUpdate);

    useEffect(
        () =>
            subscribe(() => {
                didUpdateRef.current = false;
            }),
        [didUpdateRef, subscribe],
    );

    if (didUpdateRef.current) {
        if (isControlledValue) {
            const nextValue = memoized.toArrayValue(valueFromProps);

            if (!memoized.shallowEqual(value, nextValue)) {
                setValue(nextValue);
            }
        }

        if (isControlledSearch && !(searchFromProps === search)) {
            setSearch(searchFromProps);
        }
    }

    return {
        labeledValue,
        value,
        setValue,
        search,
        setSearch,
        options,
        filteredOptions,
        selectedOptions,
        selectOption,
        deselectOption,
        clear,
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

const comboboxStateReducer: Reducer<ComboboxState, ComboboxAction> = (state, action) => {
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
    autoFocus?: boolean;
    open?: boolean;
    defaultOpen?: boolean;
    controlled?: () => boolean;
    nextHighlightedIndex: (index: number, options: OptionType[]) => number;
    prevHighlightedIndex: (index: number, options: OptionType[]) => number;
    options?: OptionType[];
    selectedOptions?: OptionType[];
    multiple?: boolean;
    onSelect: (option: OptionType) => boolean;
    onDeselect: (option: OptionType) => boolean;
    search?: string | undefined;
    onSearch?: (search: string | undefined) => void;
    closeOnSelect?: boolean;
    onClear?: () => void;
    getOptionsElement?: () => HTMLElement | null;
    scrollToIndex?: (index: number, prevIndex: number, options: OptionType[]) => void;
}

interface ComboboxInputProps<T extends Element> extends ComboboxButtonProps<T> {
    onChange?: React.ChangeEventHandler<T> | undefined;
    value?: string | undefined;
}

interface ComboboxButtonProps<T extends Element> extends ComboboxElementProps<T> {
    onBlur?: React.FocusEventHandler<T> | undefined;
    onFocus?: React.FocusEventHandler<T> | undefined;
}

type ComboboxElementProps<T extends Element> = React.AriaAttributes &
    React.RefAttributes<T> &
    Pick<
        React.AllHTMLAttributes<T>,
        'disabled' | 'role' | 'onMouseDown' | 'onMouseMove' | 'onKeyDown' | 'onClick' | 'title'
    >;

export function useCombobox<OptionType>({
    environment = isClient() ? window : undefined,
    autoFocus = false,
    open: openFromProps,
    defaultOpen,
    didUpdate,
    controlled = returnFalse,
    nextHighlightedIndex,
    prevHighlightedIndex,
    multiple = false,
    options = [],
    selectedOptions = [],
    onSelect,
    onDeselect,
    onClear,
    search,
    onSearch,
    closeOnSelect = !multiple,
    getOptionsElement = returnNull,
    scrollToIndex,
}: UseComboboxProps<OptionType>) {
    const optionsElement = getOptionsElement();
    const optionsElementRef = useRef(optionsElement);

    if (!(optionsElementRef.current === optionsElement)) {
        optionsElementRef.current = optionsElement;
    }
    const toggleButtonRef = useRef<HTMLElement>(null);
    const inputRef = useRef<HTMLElement>(null);
    const searchRef = useRef<HTMLElement>(null);
    const menuRef = useRef<HTMLElement>(null);
    const clearButtonRef = useRef<HTMLElement>(null);
    const lastHighlightedIndexRef = useRef(-1);
    const lastSearchRef = useRef(search);
    const shouldScrollRef = useRef(true);
    const shouldHighlightOnOpenRef = useRef(true);
    const focusedRef = useRef(false);
    const [{ subscribe, dispatch, getState }] = useState(() => {
        const initialState: ComboboxState = {
            open: openFromProps ?? defaultOpen,
            highlightedIndex: -1,
        };

        return createStore(comboboxStateReducer, initialState);
    });
    const state = useSyncExternalStore(subscribe, getState);
    const latestStateRef = useRef(state);
    const { open = false, highlightedIndex } = state;
    const setOpen = useCallback(
        (nextOpen: boolean | undefined) => {
            dispatch({ type: 'open', payload: nextOpen });
        },
        [dispatch],
    );
    const openMenu = useCallback(() => {
        setOpen(true);
    }, [setOpen]);
    const closeMenu = useCallback(() => {
        setOpen(false);
    }, [setOpen]);
    const toggleMenu = useCallback(() => {
        dispatch({ type: 'toggleOpen', payload: null });
    }, [dispatch]);
    const setHighlightedIndex = useCallback(
        (index: number) => {
            if (latestStateRef.current.highlightedIndex === index) {
                return;
            }
            dispatch({ type: 'highlight', payload: index });
        },
        [dispatch],
    );
    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLElement>) => {
            const { code } = event;

            if (latestStateRef.current.open) {
                switch (code) {
                    case 'ArrowDown':
                    case 'ArrowUp': {
                        event.preventDefault();
                        const { highlightedIndex: highlightedIndexFromLatestState } =
                            latestStateRef.current;
                        const lastHighlightedIndex = lastHighlightedIndexRef.current;

                        let index: number;

                        if (
                            highlightedIndexFromLatestState === -1 &&
                            !(lastHighlightedIndex === -1)
                        ) {
                            index = lastHighlightedIndex;
                        } else if (code === 'ArrowUp') {
                            index = prevHighlightedIndex(lastHighlightedIndex, options);
                        } else {
                            index = nextHighlightedIndex(lastHighlightedIndex, options);
                        }

                        setHighlightedIndex(index);
                        break;
                    }
                    case 'Enter':
                    case 'Space': {
                        event.preventDefault();
                        const { highlightedIndex: highlightedIndexFromLatestState } =
                            latestStateRef.current;

                        if (highlightedIndexFromLatestState === -1) {
                            return;
                        }

                        const option = options[highlightedIndexFromLatestState];

                        if (isNullable(option)) {
                            return;
                        }

                        let done: boolean;

                        if (selectedOptions.includes(option)) {
                            done = onDeselect(option);
                        } else {
                            done = onSelect(option);
                        }
                        if (!done || multiple || !closeOnSelect) {
                            return;
                        }

                        closeMenu();
                        break;
                    }
                    case 'Escape': {
                        event.preventDefault();
                        closeMenu();
                        break;
                    }
                }
            } else if (
                code === 'ArrowDown' ||
                code === 'ArrowUp' ||
                code === 'Enter' ||
                code === 'Space'
            ) {
                event.preventDefault();
                openMenu();
            }
        },
        [
            closeMenu,
            closeOnSelect,
            multiple,
            nextHighlightedIndex,
            onDeselect,
            onSelect,
            openMenu,
            options,
            prevHighlightedIndex,
            selectedOptions,
            setHighlightedIndex,
        ],
    );
    const getInputProps = useCallback(
        <T extends HTMLInputElement | HTMLTextAreaElement>(
            inputProps: Partial<ComboboxInputProps<T>> = {},
        ): ComboboxInputProps<T> => ({
            ...inputProps,
            ref: internalMergeRefs([inputRef, inputProps?.ref]),
            onBlur: (event) => {
                const elements = [inputRef, toggleButtonRef, menuRef]
                    .map(({ current }) => current)
                    .filter(isNonNullable);

                const { relatedTarget: nextFocusedElement } = event;

                if (
                    isNonNullable(nextFocusedElement) &&
                    elements.some((element) => equalOrContains(element, nextFocusedElement))
                ) {
                    return;
                }

                focusedRef.current = false;
                inputProps.onBlur?.(event);
            },
            onKeyDown: (event) => {
                inputProps.onKeyDown?.(event);

                if (event.code === 'Space') {
                    return;
                }

                handleKeyDown(event);
            },
            onClick: (event) => {
                inputProps.onClick?.(event);
                openMenu();
            },
            onMouseDown: (event) => {
                inputProps.onMouseDown?.(event);
                const clearButton = clearButtonRef.current;
                const input = event.currentTarget;

                if (
                    latestStateRef.current.open ||
                    isNullable(clearButton) ||
                    !(event.target instanceof Node) ||
                    !equalOrContains(clearButton, event.target)
                ) {
                    return;
                }

                input.focus();
            },
            onFocus: (event) => {
                if (focusedRef.current) {
                    return;
                }
                focusedRef.current = true;
                inputProps.onFocus?.(event);
            },
        }),
        [handleKeyDown, openMenu],
    );
    const getToggleButtonProps = useCallback(
        <T extends HTMLElement>(
            toggleButtonProps: Partial<ComboboxButtonProps<T>> = {},
        ): ComboboxButtonProps<T> => ({
            ...toggleButtonProps,
            ref: internalMergeRefs([toggleButtonRef, toggleButtonProps?.ref]),
            onBlur: (event) => {
                const elements = [inputRef, toggleButtonRef, menuRef, clearButtonRef]
                    .map(({ current }) => current)
                    .filter(isNonNullable);

                const { relatedTarget: nextFocusedElement } = event;

                if (
                    isNonNullable(nextFocusedElement) &&
                    elements.some((element) => equalOrContains(element, nextFocusedElement))
                ) {
                    return;
                }

                toggleButtonProps.onBlur?.(event);
                focusedRef.current = false;
            },
            onKeyDown: (event) => {
                toggleButtonProps.onKeyDown?.(event);

                if (event.code === 'Space' && event.target === searchRef.current) {
                    return;
                }

                handleKeyDown(event);
            },
            onClick: (event) => {
                toggleButtonProps.onClick?.(event);
                toggleMenu();
            },
            onMouseDown: (event) => {
                toggleButtonProps.onMouseDown?.(event);
                const clearButton = clearButtonRef.current;
                const toggleButton = event.currentTarget;

                if (
                    latestStateRef.current.open ||
                    isNullable(clearButton) ||
                    !(event.target instanceof Node) ||
                    !equalOrContains(clearButton, event.target)
                ) {
                    return;
                }

                toggleButton.focus();
            },
            onFocus: (event) => {
                if (focusedRef.current) {
                    return;
                }
                focusedRef.current = true;
                toggleButtonProps.onFocus?.(event);
            },
        }),
        [handleKeyDown, toggleMenu],
    );
    const getOptionProps = useCallback(
        <T extends HTMLElement>(
            index: number,
            { disabled = false, ...restOptionProps }: Partial<ComboboxElementProps<T>> = {},
        ): ComboboxElementProps<T> => {
            const option = options[index];
            const selected = selectedOptions.includes(option);

            return {
                ...restOptionProps,
                role: 'option',
                'aria-selected': selected,
                'aria-disabled': disabled,
                onClick: (event) => {
                    restOptionProps.onClick?.(event);

                    if (disabled) {
                        return;
                    }

                    if (selected) {
                        onDeselect(option);
                    } else {
                        onSelect(option);
                    }

                    if (multiple || !closeOnSelect) {
                        return;
                    }

                    closeMenu();
                },
                onMouseDown: (event) => {
                    restOptionProps?.onMouseDown?.(event);
                    // keep focus on the input after item click select
                    event.preventDefault();
                },
                onMouseMove: (event) => {
                    restOptionProps?.onMouseMove?.(event);

                    if (
                        !latestStateRef.current.open ||
                        latestStateRef.current.highlightedIndex === index
                    ) {
                        return;
                    }
                    shouldScrollRef.current = false;
                    setHighlightedIndex(index);
                },
            };
        },
        [
            closeMenu,
            closeOnSelect,
            multiple,
            onDeselect,
            onSelect,
            options,
            selectedOptions,
            setHighlightedIndex,
        ],
    );
    const getGroupOptionProps = useCallback(
        <T extends HTMLElement>(
            index: number,
            groupOptionProps: Partial<ComboboxElementProps<T>> = {},
        ): ComboboxElementProps<T> => ({
            ...groupOptionProps,
            role: 'group',
            onMouseDown: (event) => {
                groupOptionProps?.onMouseDown?.(event);
                // keep focus on the input after item click select.
                event.preventDefault();
            },
            onMouseMove: (event) => {
                groupOptionProps?.onMouseMove?.(event);

                if (!latestStateRef.current.open) {
                    return;
                }
                setHighlightedIndex(-1);
            },
        }),
        [setHighlightedIndex],
    );
    const getMenuProps = useCallback(
        <T extends HTMLElement>(
            menuProps: Partial<ComboboxElementProps<T>> = {},
        ): ComboboxElementProps<T> => ({
            ...menuProps,
            ref: internalMergeRefs([menuRef, menuProps?.ref]),
            role: 'listbox',
        }),
        [],
    );
    const getSearchProps = useCallback(
        <T extends HTMLInputElement | HTMLTextAreaElement>(
            searchProps: Partial<ComboboxInputProps<T>> = {},
        ): ComboboxInputProps<T> => ({
            ...searchProps,
            ref: internalMergeRefs([searchRef, searchProps.ref]),
            onChange: (event) => {
                searchProps.onChange?.(event);
                onSearch?.(event.target.value);
            },
        }),
        [onSearch],
    );
    const getClearButtonProps = useCallback(
        <T extends HTMLElement>(
            clearButtonProps: Partial<ComboboxButtonProps<T>> = {},
        ): ComboboxButtonProps<T> => ({
            ...clearButtonProps,
            ref: internalMergeRefs([clearButtonRef, clearButtonProps?.ref]),
            onClick: (event) => {
                clearButtonProps.onClick?.(event);

                if (
                    [inputRef, toggleButtonRef]
                        .map(({ current }) => current)
                        .filter(isNonNullable)
                        .some((element) => equalOrContains(element, event.currentTarget))
                ) {
                    event.stopPropagation();

                    if (latestStateRef.current.open) {
                        closeMenu();
                    }
                }

                onClear?.();
            },
            onMouseDown: (event) => {
                clearButtonProps.onMouseDown?.(event);
                // keep focus on the input after item click select
                event.preventDefault();
            },
        }),
        [closeMenu, onClear],
    );
    const focus = useCallback(() => {
        (inputRef.current ?? toggleButtonRef.current)?.focus();
    }, []);

    useEffect(() => {
        if (isNullable(environment)) {
            return noop;
        }

        const refs = [inputRef, toggleButtonRef, menuRef];

        const handleMouseUp = ({ target: nextFocusedElement }: MouseEvent) => {
            const elements = refs.map(({ current }) => current).filter(isNonNullable);

            if (
                !(nextFocusedElement instanceof Node) ||
                elements.some((element) => equalOrContains(element, nextFocusedElement))
            ) {
                return;
            }

            closeMenu();
        };

        const handleMouseMove = ({ target: hoveredElement }: MouseEvent) => {
            // used options list element directly because menu element may include many different elements such as search input, confirm/cancel buttons, etc
            const optionsList = optionsElementRef.current;

            if (
                !latestStateRef.current.open ||
                latestStateRef.current.highlightedIndex === -1 ||
                !(hoveredElement instanceof Node) ||
                (isNonNullable(optionsList) && equalOrContains(optionsList, hoveredElement))
            ) {
                return;
            }

            setHighlightedIndex(-1);
        };

        environment.addEventListener('mouseup', handleMouseUp);
        environment.addEventListener('mousemove', handleMouseMove);

        return () => {
            environment.removeEventListener('mouseup', handleMouseUp);
            environment.removeEventListener('mousemove', handleMouseMove);
        };
    }, [closeMenu, environment, setHighlightedIndex]);

    useEffect(() => {
        if (!autoFocus) {
            return;
        }
        focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const didUpdateRef = useDidUpdate(state, (prevState, currentState) => {
        const prevOpen = Boolean(prevState.open);
        const currentOpen = Boolean(currentState.open);

        if (!(prevOpen === currentOpen)) {
            if (prevOpen) {
                shouldHighlightOnOpenRef.current = true;
                onSearch?.(undefined);
                if (
                    isNonNullable(environment) &&
                    isNonNullable(searchRef.current) &&
                    environment.document.activeElement === searchRef.current
                ) {
                    focus();
                }
            } else if (isNonNullable(searchRef.current)) {
                // FIXME check if requestAnimationFrame is needed with floating-ui
                requestAnimationFrame(() => {
                    searchRef.current?.focus();
                });
            } else {
                focus();
            }
        }

        if (
            currentOpen &&
            !(currentState.highlightedIndex === -1) &&
            !(prevState.highlightedIndex === currentState.highlightedIndex)
        ) {
            if (shouldScrollRef.current) {
                scrollToIndex?.(currentState.highlightedIndex, prevState.highlightedIndex, options);
            } else {
                shouldScrollRef.current = true;
            }
        }

        didUpdate?.(prevState, currentState);
    });

    useEffect(
        () =>
            subscribe(() => {
                didUpdateRef.current = false;
                latestStateRef.current = getState();
            }),
        [didUpdateRef, getState, subscribe],
    );

    useEffect(() => {
        const searching = !(search === lastSearchRef.current);
        const noOptions = options.length === 0;

        if (!open || noOptions || searching) {
            if (searching) {
                lastSearchRef.current = search;
            }

            lastHighlightedIndexRef.current = -1;
            setHighlightedIndex(-1);
        } else if (open) {
            let nextIndex: number;

            if (shouldHighlightOnOpenRef.current && selectedOptions.length > 0) {
                shouldHighlightOnOpenRef.current = false;
                const [selectedOption] = selectedOptions;

                nextIndex = options.indexOf(selectedOption);

                setHighlightedIndex(nextIndex);
            } else {
                nextIndex = highlightedIndex;
            }

            if (nextIndex === -1) {
                return;
            }

            lastHighlightedIndexRef.current = nextIndex;
        }
    }, [highlightedIndex, open, options, search, selectedOptions, setHighlightedIndex]);

    if (didUpdateRef.current && controlled() && !(state.open === openFromProps)) {
        setOpen(openFromProps);
    }

    return {
        focus,
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
        getSearchProps,
        getToggleButtonProps,
        getClearButtonProps,
    } as const;
}
