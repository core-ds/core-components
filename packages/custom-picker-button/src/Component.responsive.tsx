import React, { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CustomButtonProps } from '@alfalab/core-components-custom-button';
import { useIsDesktop } from '@alfalab/core-components-mq';
import {
    type AdditionalMobileProps,
    type BottomSheetSelectMobileProps,
} from '@alfalab/core-components-select/shared';

import { CustomPickerButtonDesktop, type CustomPickerButtonDesktopProps } from './desktop';
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
         * Версия, которая будет использоваться при серверном рендеринге
         */
        client?: 'desktop' | 'mobile';

        /**
         * Значение по-умолчанию для хука useMatchMedia
         * @deprecated Используйте client
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
            breakpoint,
            client,
            defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
            ...restProps
        },
        ref,
    ) => {
        const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

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
