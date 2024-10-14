import React from 'react';

import {
    ensureArray,
    every,
    findLastIndex,
    hasOwnProperty,
    isObj,
    isStr,
} from '@alfalab/core-components-shared';

import { BaseGroupOption, BaseOption, BaseValueType, LabeledValue, SelectOption } from './types';

export function isGroupOption<ValueType>(
    option: SelectOption<ValueType>,
): option is BaseGroupOption<ValueType> {
    return Array.isArray((option as BaseGroupOption<ValueType>).options);
}

export function isBaseOption<ValueType>(
    option: SelectOption<ValueType>,
): option is BaseOption<ValueType> {
    return !isGroupOption(option);
}

export function optionValue<ValueType>({ value }: BaseOption<ValueType>): ValueType {
    return value;
}

export function optionTitle(option: {
    title?: string;
    label: React.ReactNode;
}): string | undefined {
    let titleValue: string | undefined;

    if (hasOwnProperty(option, 'title')) {
        titleValue = option.title;
    } else {
        const { label } = option;

        if (isStr(label)) {
            titleValue = label;
        }
    }

    return titleValue;
}

export function isOptionSelected<ValueType>(
    { getState }: { getState: () => { value: ValueType[] } },
    { value }: { value: ValueType },
) {
    const { value: selectedValues } = getState();

    return selectedValues.includes(value);
}

export function makeOptionsFlat<ValueType>(options: Array<SelectOption<ValueType>>) {
    return options.reduce<Array<SelectOption<ValueType>>>((flat, option) => {
        flat.push(option);
        if (isGroupOption(option)) {
            Array.prototype.push.apply(flat, option.options);
        }

        return flat;
    }, []);
}

export function unwrapLabeledValue<ValueType>({ value }: LabeledValue<ValueType>): ValueType {
    return value;
}

export function toArrayValue<ValueType extends BaseValueType>(
    value:
        | LabeledValue<ValueType>
        | Array<LabeledValue<ValueType>>
        | ValueType
        | ValueType[]
        | undefined,
): ValueType[] {
    if (Array.isArray(value)) {
        if (every<LabeledValue<ValueType> | ValueType, LabeledValue<ValueType>>(value, isObj)) {
            return value.map(unwrapLabeledValue);
        }
    } else if (isObj(value)) {
        return [unwrapLabeledValue(value)];
    }

    return value === undefined ? [] : ensureArray(value);
}

export function defaultFilterOptions<ValueType extends BaseValueType>(
    search: string | undefined = '',
    option: SelectOption<ValueType>,
): boolean {
    if (search === '') {
        return true;
    }

    const str = search.toLowerCase();

    return (
        (isStr(option.label) && option.label.toLowerCase().includes(str)) ||
        (isBaseOption(option) && (option.value?.toString().toLowerCase().includes(str) ?? false))
    );
}

export function prevHighlightedIndex<ValueType extends BaseValueType>(
    index: number,
    options: Array<SelectOption<ValueType>>,
): number {
    if (index === -1 || index === options.findIndex(isBaseOption)) {
        return findLastIndex(options, isBaseOption);
    }

    return findLastIndex(options.slice(0, index), isBaseOption);
}

export function nextHighlightedIndex<ValueType extends BaseValueType>(
    index: number,
    options: Array<SelectOption<ValueType>>,
): number {
    if (index >= findLastIndex(options, isBaseOption)) {
        return options.findIndex(isBaseOption);
    }

    const nextOptionIndex = options.slice(index + 1).findIndex(isBaseOption);

    return index + nextOptionIndex + 1;
}

export function indexScrollTo<ValueType extends BaseValueType>(
    index: number,
    prevIndex: number,
    options: Array<SelectOption<ValueType>>,
): number {
    if (options.length === 0) {
        return -1;
    }

    if (prevIndex > index && index > 0) {
        const prevOptionIndex = index - 1;

        if (isGroupOption(options[prevOptionIndex])) {
            return prevOptionIndex;
        }
    }

    return index;
}

export function nearestHighlightedIndex<ValueType extends BaseValueType>(
    index: number,
    options: Array<SelectOption<ValueType>>,
): number {
    if (index === -1) {
        return index;
    }

    const lastOptionIndex = findLastIndex(options, isBaseOption);

    if (lastOptionIndex === -1) {
        return lastOptionIndex;
    }

    const minIndex = Math.min(index, lastOptionIndex);

    if (isBaseOption(options[minIndex])) {
        return minIndex;
    }

    const prevIndex = prevHighlightedIndex(minIndex, options);
    const nextIndex = nextHighlightedIndex(minIndex, options);

    return index - prevIndex >= nextIndex - index ? prevIndex : nextIndex;
}

export function toLabeledValue<ValueType extends BaseValueType>(
    value: ValueType,
): LabeledValue<ValueType> {
    const label = value?.toString() ?? 'null';

    return {
        title: label,
        label,
        value,
    };
}
