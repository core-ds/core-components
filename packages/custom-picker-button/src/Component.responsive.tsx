import React, { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CustomButtonProps } from '@alfalab/core-components-custom-button';
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

        /**
         * Значение по-умолчанию для хука useMatchMedia
         */
        defaultMatchMediaValue?: boolean | (() => boolean);
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
            defaultMatchMediaValue,
            ...restProps
        },
        ref,
    ) => {
        const query = `(min-width: ${breakpoint}px)`;
        const [isDesktop] = useMatchMedia(query, defaultMatchMediaValue);

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

CustomPickerButtonResponsive.displayName = 'CustomPickerButtonResponsive';
