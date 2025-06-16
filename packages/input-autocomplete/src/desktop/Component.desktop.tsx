import React, { forwardRef } from 'react';

import { Popover } from '@alfalab/core-components-popover';
import {
    AnyObject,
    BaseSelect,
    FieldProps,
    Optgroup as DefaultOptgroup,
    Option as DefaultOption,
    OptionsList as DefaultOptionsList,
} from '@alfalab/core-components-select/shared';

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
            multiline,
            textareaProps = {},
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
            Field={AutocompleteField as React.ComponentType<FieldProps>}
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
                multiline,
                textareaProps,
            }}
        />
    ),
);
