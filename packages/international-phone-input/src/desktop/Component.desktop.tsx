import React, { forwardRef } from 'react';

import { InputDesktop } from '@alfalab/core-components-input/desktop';
import { InputAutocompleteDesktop } from '@alfalab/core-components-input-autocomplete/desktop';
import { SelectDesktop } from '@alfalab/core-components-select/desktop';

import { BaseInternationalPhoneInput } from '../components/base-international-phone-input';
import type {
    BaseInternationalPhoneInputProps,
    InternationalPhoneInputDesktopProps,
} from '../types';

export const InternationalPhoneInputDesktop = forwardRef<
    HTMLInputElement,
    InternationalPhoneInputDesktopProps
>((props, ref) => (
    <BaseInternationalPhoneInput
        selected={props.value}
        {...props}
        view='desktop'
        ref={ref}
        SelectComponent={SelectDesktop}
        Input={InputDesktop}
        InputAutocomplete={
            InputAutocompleteDesktop as BaseInternationalPhoneInputProps['InputAutocomplete']
        }
    />
));
