import React, { forwardRef } from 'react';
import { InputDesktop } from '@balafla/core-components-input/desktop';
import { InputAutocompleteDesktop } from '@balafla/core-components-input-autocomplete/desktop';
import { SelectDesktop } from '@balafla/core-components-select/desktop';

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
