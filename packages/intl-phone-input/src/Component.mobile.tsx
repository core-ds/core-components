import React, { forwardRef } from 'react';

import {
    InputAutocompleteMobile,
    InputAutocompleteMobileProps,
} from '@alfalab/core-components-input-autocomplete/mobile';
import { SelectMobile } from '@alfalab/core-components-select/mobile';

import { BaseIntlPhoneInputProps, IntlPhoneInput } from './components/base-intl-phone-input';

export type IntlPhoneInputMobileProps = Omit<
    BaseIntlPhoneInputProps,
    'InputAutocompleteComponent' | 'CountriesSelectComponent' | 'mobile' | 'Input'
> &
    Partial<Omit<InputAutocompleteMobileProps, 'onChange'>>


export const IntlPhoneInputMobile = forwardRef<HTMLInputElement, IntlPhoneInputMobileProps>(
    (restProps, ref) => (
        <IntlPhoneInput
            {...restProps}
            InputAutocompleteComponent={InputAutocompleteMobile}
            CountriesSelectComponent={SelectMobile}
            ref={ref}
            mobile={true}
        />
    ),
);
