import { ReactNode } from 'react';

import { assert, ensureArray, isObject } from '@alfalab/core-components-shared';

import { BaseGroupOption, BaseValueType, LabeledValue, SelectOption } from './types';

export function isGroup<ValueType>(
    option: SelectOption<ValueType>,
): option is BaseGroupOption<ValueType> {
    return Array.isArray((option as BaseGroupOption<ValueType>).options);
}

export function getTitle(option: { title?: string; label: ReactNode }) {
    let titleValue: string | undefined;

    if ('title' in option) {
        titleValue = option.title;
    } else {
        const { label } = option;

        if (typeof label === 'string') {
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

export function makeOptionsFlat<ValueType>(options: Array<SelectOption<ValueType>> | undefined) {
    return options?.reduce<Array<SelectOption<ValueType>>>((flat, option) => {
        flat.push(option);
        if (isGroup(option)) {
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
