import React, { forwardRef } from 'react';

import { InputMobile } from '@alfalab/core-components-input/mobile';
import { InputAutocompleteMobile } from '@alfalab/core-components-input-autocomplete/mobile';
import { SelectMobile } from '@alfalab/core-components-select/mobile';

import { BaseInternationalPhoneInput } from '../components/base-international-phone-input';
import type {
    BaseInternationalPhoneInputProps,
    InternationalPhoneInputMobileProps,
} from '../types';

export const InternationalPhoneInputMobile = forwardRef<
    HTMLInputElement,
    InternationalPhoneInputMobileProps
>(({ value, clearableCountryCode = true, ...restProps }, ref) => (
    <BaseInternationalPhoneInput
        selected={value}
        {...restProps}
        clearableCountryCode={clearableCountryCode}
        value={value}
        view='mobile'
        ref={ref}
        SelectComponent={SelectMobile}
        Input={InputMobile}
        InputAutocomplete={
            InputAutocompleteMobile as BaseInternationalPhoneInputProps['InputAutocomplete']
        }
    />
));
