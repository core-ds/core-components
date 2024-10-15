import { useState, useSyncExternalStore } from 'react';

import { hasOwnProperty, isObject, shallowEqual } from '@alfalab/core-components-shared';

import { Action, createStore } from './nano-redux';
import { AstractSelectProps, BaseValueType } from './types';
import { toArrayValue } from './utils';

export type SelectAction<T> =
    | Action<'setValue', T[]>
    | Action<'select', T>
    | Action<'deselect', T>
    | Action<'setOpen', boolean | undefined>
    | Action<'setSearch', string | undefined>;

export interface SelectState<T> {
    value: T[];
    open: boolean | undefined;
    search: string | undefined;
}

function selectReducer<T>(state: SelectState<T>, action: SelectAction<T>): SelectState<T> {
    switch (action.type) {
        case 'setValue':
            return { ...state, value: action.payload };
        case 'select': {
            const nextValue = state.value.concat(action.payload);

            return { ...state, value: nextValue };
        }
        case 'deselect': {
            const nextValue = state.value.filter((value) => value !== action.payload);

            return { ...state, value: nextValue };
        }
        case 'setOpen':
            return { ...state, open: action.payload };
        case 'setSearch':
            return { ...state, search: action.payload };
        default:
            return state;
    }
}

export function useSelect<OptionType, ValueType extends BaseValueType>(
    props: Pick<
        AstractSelectProps<OptionType, ValueType>,
        'value' | 'defaultValue' | 'open' | 'defaultOpen' | 'search'
    >,
) {
    const {
        value: valueFromProps,
        defaultValue,
        open: openFromProps,
        defaultOpen = false,
        search: searchFromProps = false,
    } = props;
    // may be useRef?
    const [store] = useState(() => {
        const value = toArrayValue(valueFromProps ?? defaultValue);
        const open = openFromProps ?? defaultOpen;
        const search = isObject(searchFromProps) ? searchFromProps.value : undefined;

        return createStore<SelectState<ValueType>, SelectAction<ValueType>>(selectReducer, {
            value,
            open,
            search,
        });
    });
    const state = useSyncExternalStore(store.subscribe, store.getState);

    if (hasOwnProperty(props, 'value')) {
        // TODO might be optimized
        const nextValue = toArrayValue(valueFromProps);

        if (!shallowEqual(state.value, nextValue)) {
            store.dispatch({ type: 'setValue', payload: nextValue });
        }
    }

    if (hasOwnProperty(props, 'open') && state.open !== openFromProps) {
        store.dispatch({ type: 'setOpen', payload: openFromProps });
    }

    if (
        isObject(searchFromProps) &&
        hasOwnProperty(searchFromProps, 'value') &&
        searchFromProps.value !== state.search
    ) {
        store.dispatch({ type: 'setSearch', payload: searchFromProps.value });
    }

    return [state, store.dispatch, store] as const;
}
