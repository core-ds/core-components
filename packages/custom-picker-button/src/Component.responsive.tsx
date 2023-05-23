import React, { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CustomButtonProps } from '@alfalab/core-components-custom-button';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PickerButtonProps } from '@alfalab/core-components-picker-button';
import { AdditionalMobileProps } from '@alfalab/core-components-select';
import { useMedia } from '@alfalab/hooks';

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
        const [view] = useMedia(
            [
                ['mobile', `(max-width: ${breakpoint - 1}px)`],
                ['desktop', `(min-width: ${breakpoint}px)`],
            ],
            'desktop',
        );

        return view === 'desktop' ? (
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
