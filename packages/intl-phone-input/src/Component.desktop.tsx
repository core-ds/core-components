import React, { forwardRef } from 'react';

import { BaseIntlPhoneInput, BaseIntlPhoneInputProps } from './components/base-intl-phone-input';

export type IntlPhoneInputDesktopProps = Omit<
    BaseIntlPhoneInputProps,
    'view' | 'Component' | 'showActionButtons'
>;

export const IntlPhoneInputDesktop = forwardRef<HTMLInputElement, IntlPhoneInputDesktopProps>(
    (restProps, ref) => <BaseIntlPhoneInput {...restProps} ref={ref} />,
);
