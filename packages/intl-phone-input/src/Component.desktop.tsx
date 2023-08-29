import React, { forwardRef } from 'react';

import { InputAutocompleteDesktop } from '@alfalab/core-components-input-autocomplete/desktop';
import { SelectDesktop } from '@alfalab/core-components-select/desktop';

import { BaseIntlPhoneInput, BaseIntlPhoneInputProps } from './components/base-intl-phone-input';

export type IntlPhoneInputDesktopProps = Omit<
    BaseIntlPhoneInputProps,
    'InputAutocompleteComponent' | 'CountriesSelectComponent' | 'mobile'
>;

export const IntlPhoneInputDesktop = forwardRef<HTMLInputElement, IntlPhoneInputDesktopProps>(
    (restProps, ref) => (
        <BaseIntlPhoneInput
            {...restProps}
            InputAutocompleteComponent={InputAutocompleteDesktop}
            CountriesSelectComponent={SelectDesktop}
            ref={ref}
        />
    ),
);
