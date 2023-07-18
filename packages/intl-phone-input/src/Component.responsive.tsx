import React, { forwardRef } from 'react';

import { useMedia } from '@alfalab/hooks';

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

export type InputAutocompleteMedia = 'desktop' | 'mobile';

export const IntlPhoneInputResponsive = forwardRef<
    HTMLInputElement | HTMLDivElement,
    IntlPhoneInputResponsiveProps
>(({ breakpoint = 1024, ...restProps }, ref) => {
    const [view] = useMedia<InputAutocompleteMedia>(
        [
            ['mobile', `(max-width: ${breakpoint - 1}px)`],
            ['desktop', `(min-width: ${breakpoint}px)`],
        ],
        'desktop',
    );

    return view === 'desktop' ? (
        <IntlPhoneInputDesktop {...restProps} ref={ref as React.Ref<HTMLInputElement>} />
    ) : (
        <IntlPhoneInputMobile {...restProps} ref={ref as React.Ref<HTMLInputElement>} />
    );
});
