import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { IntlPhoneInputDesktop, IntlPhoneInputDesktopProps } from './Component.desktop';
import { IntlPhoneInputMobile, IntlPhoneInputMobileProps } from './Component.mobile';

export type IntlPhoneInputResponsiveProps = IntlPhoneInputDesktopProps &
    IntlPhoneInputMobileProps & {
        /**
         * Контрольная точка, с нее начинается desktop версия
         * @default 1024
         */
        breakpoint?: number;
    };

export const IntlPhoneInput = forwardRef<
    HTMLInputElement | HTMLDivElement,
    IntlPhoneInputResponsiveProps
>(({ breakpoint = 1024, ...restProps }, ref) => {
    const query = `(min-width: ${breakpoint}px)`;
    const [isDesktop] = useMatchMedia(query);

    return isDesktop ? (
        <IntlPhoneInputDesktop {...restProps} ref={ref as React.Ref<HTMLInputElement>} />
    ) : (
        <IntlPhoneInputMobile {...restProps} ref={ref as React.Ref<HTMLInputElement>} />
    );
});
