import { ReactNode } from 'react';

import {
    assert,
    ensureArray,
    hasOwnProperty,
    isObject,
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

export function optionTitle(option: { title?: string; label: ReactNode }): string | undefined {
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

export function getValue<ValueType>(
    { getState }: { getState: () => { value: ValueType[] } },
    multiple: boolean,
): ValueType | ValueType[] | undefined {
    const { value: selectedValues } = getState();

    if (multiple) {
        return selectedValues;
    }

    assert(
        selectedValues.length <= 1,
        "'getValue': in non-multiple mode must be contain either 0 either 1 value",
    );

    const [onlyValue] = selectedValues;

    return onlyValue;
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
        if (value.every(isObject)) {
            return value.map(unwrapLabeledValue);
        }
    } else if (isObject(value)) {
        return [unwrapLabeledValue(value)];
    }

    return value === undefined ? [] : ensureArray(value);
}

export function defaultFilterOptions<ValueType extends BaseValueType>(
    search: string | undefined = '',
    option: SelectOption<ValueType>,
): boolean {
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
        return options.findLastIndex(isBaseOption);
    }

    return options.slice(0, index).findLastIndex(isBaseOption);
}

export function nextHighlightedIndex<ValueType extends BaseValueType>(
    index: number,
    options: Array<SelectOption<ValueType>>,
): number {
    if (index === options.findLastIndex(isBaseOption)) {
        return options.findIndex(isBaseOption);
    }

    const nextOptionIndex = options.slice(index + 1).findIndex(isBaseOption);

    return index + nextOptionIndex + 1;
}

export function indexScrollTo<ValueType extends BaseValueType>(
    index: number,
    options: Array<SelectOption<ValueType>>,
): number {
    const prevIndex = index - 1;

    return isGroupOption(options[prevIndex]) ? prevIndex : index;
}

export function nearestHighlightedIndex<ValueType extends BaseValueType>(
    index: number,
    options: Array<SelectOption<ValueType>>,
): number {
    if (index === -1) {
        return index;
    }

    const lastOptionIndex = options.findLastIndex(isBaseOption);

    if (lastOptionIndex === -1) {
        return lastOptionIndex;
    }

    const minIndex = Math.min(index, lastOptionIndex);

    if (isBaseOption(options[minIndex])) {
        return minIndex;
    }

    const prevIndex = prevHighlightedIndex(Math.min(index, lastOptionIndex), options);
    const nextIndex = nextHighlightedIndex(Math.min(index, lastOptionIndex), options);

    return index - prevIndex >= nextIndex - index ? prevIndex : nextIndex;
}
