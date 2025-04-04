import React, { forwardRef } from 'react';
import { Popover } from '@balafla/core-components-popover';
import {
    AnyObject,
    BaseSelect,
    Optgroup as DefaultOptgroup,
    Option as DefaultOption,
    OptionsList as DefaultOptionsList,
} from '@balafla/core-components-select/shared';

import { AutocompleteField } from '../autocomplete-field';
import { InputAutocompleteCommonProps } from '../types';

export const InputAutocompleteDesktop = forwardRef<HTMLInputElement, InputAutocompleteCommonProps>(
    (
        {
            OptionsList = DefaultOptionsList,
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
