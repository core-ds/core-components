import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { IntlPhoneInputDesktop, IntlPhoneInputDesktopProps } from './Component.desktop';
import { IntlPhoneInputMobile, IntlPhoneInputMobileProps } from './Component.mobile';

export type IntlPhoneInputPropsResponsive = IntlPhoneInputDesktopProps &
    IntlPhoneInputMobileProps & {
        /**
         * Контрольная точка, с нее начинается desktop версия
         * @default 1024
         */
        breakpoint?: number;
    };

export const IntlPhoneInputResponsive = forwardRef<HTMLInputElement, IntlPhoneInputPropsResponsive>(
    ({ breakpoint = 1024, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query);

        const Component = isDesktop ? IntlPhoneInputDesktop : IntlPhoneInputMobile;

        return <Component ref={ref} {...restProps} />;
    },
);
