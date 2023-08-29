import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { BaseIntlPhoneInputProps } from './components/base-intl-phone-input';
import { IntlPhoneInputDesktop } from './Component.desktop';
import { IntlPhoneInputMobile } from './Component.mobile';

export type IntlPhoneInputProps = Omit<
    BaseIntlPhoneInputProps,
    'InputAutocompleteComponent' | 'CountriesSelectComponent' | 'mobile'
> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

export const IntlPhoneInput = forwardRef<HTMLInputElement, IntlPhoneInputProps>(
    ({ breakpoint = 1024, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query);

        const Component = isDesktop ? IntlPhoneInputDesktop : IntlPhoneInputMobile;

        return <Component ref={ref} {...restProps} />;
    },
);
