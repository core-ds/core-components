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
    Omit<InternationalPhoneInputMobileProps, 'size'> & {
        size: Exclude<InternationalPhoneInputMobileProps['size'], 40>;
    }
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
