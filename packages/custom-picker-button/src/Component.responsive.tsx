import React, { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CustomButtonProps } from '@alfalab/core-components-custom-button';
import { useMatchMedia } from '@alfalab/core-components-mq';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PickerButtonDesktopProps } from '@alfalab/core-components-picker-button/desktop';
import type { AdditionalMobileProps } from '@alfalab/core-components-select/shared';

import { CustomPickerButtonDesktop, CustomPickerButtonDesktopProps } from './Component.desktop';
import { CustomPickerButtonMobile } from './Component.mobile';

export type PickerButtonMatchMedia = 'desktop' | 'mobile';

export type CustomPickerButtonResponsiveProps = CustomPickerButtonDesktopProps &
    AdditionalMobileProps & {
        /**
         * Контрольная точка, с нее начинается desktop версия
         * @default 1024
         */
        breakpoint?: number;
    };

export const CustomPickerButtonResponsive = forwardRef<
    HTMLInputElement,
    CustomPickerButtonResponsiveProps
>(
    (
        {
            OptionsList,
            onScroll,
            footer,
            swipeable,
            bottomSheetProps,
            breakpoint = 1024,
            ...restProps
        },
        ref,
    ) => {
        const query = `(min-width: ${breakpoint}px)`;
        const [isDesktop] = useMatchMedia(query);

        return isDesktop ? (
            <CustomPickerButtonDesktop
                ref={ref}
                OptionsList={OptionsList}
                onScroll={onScroll}
                {...restProps}
            />
        ) : (
            <CustomPickerButtonMobile
                ref={ref}
                footer={footer}
                swipeable={swipeable}
                bottomSheetProps={bottomSheetProps}
                {...restProps}
            />
        );
    },
);
