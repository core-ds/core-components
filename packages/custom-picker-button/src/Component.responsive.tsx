import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';
import type {
    AdditionalMobileProps,
    BottomSheetSelectMobileProps,
} from '@alfalab/core-components-select/shared';
import { getComponentBreakpoint } from '@alfalab/core-components-shared';

import { CustomPickerButtonDesktop, CustomPickerButtonDesktopProps } from './desktop';
import { CustomPickerButtonMobile } from './mobile';

export type CustomPickerButtonResponsiveProps = CustomPickerButtonDesktopProps &
    AdditionalMobileProps &
    BottomSheetSelectMobileProps & {
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
            breakpoint = getComponentBreakpoint(),
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
