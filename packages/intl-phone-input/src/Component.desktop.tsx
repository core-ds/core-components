import React, { forwardRef } from 'react';

import {
    InputAutocompleteDesktop,
    InputAutocompleteDesktopProps,
} from '@alfalab/core-components-input-autocomplete/desktop';
import { SelectDesktop } from '@alfalab/core-components-select/desktop';

import { BaseIntlPhoneInputProps, IntlPhoneInput } from './components/base-intl-phone-input';

export type IntlPhoneInputDesktopProps = Omit<
    BaseIntlPhoneInputProps,
    'InputAutocompleteComponent' | 'CountriesSelectComponent' | 'mobile' | 'Input'
> &
    Partial<Omit<InputAutocompleteDesktopProps, 'onChange'>>

export const IntlPhoneInputDesktop = forwardRef<HTMLInputElement, IntlPhoneInputDesktopProps>(
    (restProps, ref) => (
        <IntlPhoneInput
            {...restProps}
            InputAutocompleteComponent={InputAutocompleteDesktop}
            CountriesSelectComponent={SelectDesktop}
            ref={ref}
        />
    ),
);
