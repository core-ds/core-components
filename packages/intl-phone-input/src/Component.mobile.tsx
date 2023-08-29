import React, { forwardRef } from 'react';

import { InputAutocompleteMobile } from '@alfalab/core-components-input-autocomplete/mobile';
import { SelectMobile } from '@alfalab/core-components-select/mobile';

import { BaseIntlPhoneInput, BaseIntlPhoneInputProps } from './components/base-intl-phone-input';

export type IntlPhoneInputMobileProps = Omit<
    BaseIntlPhoneInputProps,
    'InputAutocompleteComponent' | 'CountriesSelectComponent' | 'mobile'
>;

export const IntlPhoneInputMobile = forwardRef<HTMLInputElement, IntlPhoneInputMobileProps>(
    (restProps, ref) => (
        <BaseIntlPhoneInput
            {...restProps}
            InputAutocompleteComponent={InputAutocompleteMobile}
            CountriesSelectComponent={SelectMobile}
            ref={ref}
            mobile={true}
        />
    ),
);
