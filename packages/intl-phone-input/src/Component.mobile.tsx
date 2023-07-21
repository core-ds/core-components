import React, { forwardRef } from 'react';

import { InputAutocompleteMobile } from '@alfalab/core-components-input-autocomplete/mobile';

import { BaseIntlPhoneInput, BaseIntlPhoneInputProps } from './components/base-intl-phone-input';

export type IntlPhoneInputMobileProps = Omit<
    BaseIntlPhoneInputProps,
    'view' | 'InputAutocomplete' | 'readOnly'
>;

export const IntlPhoneInputMobile = forwardRef<HTMLInputElement, IntlPhoneInputMobileProps>(
    (restProps, ref) => (
        <BaseIntlPhoneInput
            {...restProps}
            ref={ref}
            view='mobile'
            InputAutocomplete={InputAutocompleteMobile}
        />
    ),
);
