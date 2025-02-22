import React, { forwardRef } from 'react';

import { Popover } from '@alfalab/core-components-popover';
import {
    AnyObject,
    BaseSelect,
    NextOptionsList,
    Optgroup as DefaultOptgroup,
    Option as DefaultOption,
} from '@alfalab/core-components-select/shared';

import { AutocompleteField } from '../autocomplete-field';
import { InputAutocompleteCommonProps } from '../types';

export const InputAutocompleteDesktop = forwardRef<HTMLInputElement, InputAutocompleteCommonProps>(
    (
        {
            OptionsList = NextOptionsList,
            Optgroup = DefaultOptgroup,
            Option = DefaultOption,
            Input,
            inputProps = {},
            onInput,
            value,
            success,
            readOnly,
            closeOnSelect = false,
            options,
            ...restProps
        },
        ref,
    ) => (
        <BaseSelect
            view='desktop'
            Popover={Popover}
            ref={ref}
            autocomplete={true}
            options={options}
            closeOnSelect={closeOnSelect}
            Option={Option}
            Field={AutocompleteField}
            Optgroup={Optgroup}
            OptionsList={OptionsList}
            {...restProps}
            fieldProps={{
                ...(restProps.fieldProps as AnyObject),
                Input,
                onInput,
                value,
                inputProps,
                readOnly,
                success,
            }}
        />
    ),
);
