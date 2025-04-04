import React, { forwardRef } from 'react';
import { InputMobile } from '@balafla/core-components-input/mobile';
import { InputAutocompleteMobile } from '@balafla/core-components-input-autocomplete/mobile';
import { SelectMobile } from '@balafla/core-components-select/mobile';

import { BaseInternationalPhoneInput } from '../components/base-international-phone-input';
import type {
    BaseInternationalPhoneInputProps,
    InternationalPhoneInputMobileProps,
} from '../types';

export const InternationalPhoneInputMobile = forwardRef<
    HTMLInputElement,
    InternationalPhoneInputMobileProps
>((props, ref) => (
    <BaseInternationalPhoneInput
        selected={props.value}
        {...props}
        view='mobile'
        ref={ref}
        SelectComponent={SelectMobile}
        Input={InputMobile}
        InputAutocomplete={
            InputAutocompleteMobile as BaseInternationalPhoneInputProps['InputAutocomplete']
        }
    />
));
