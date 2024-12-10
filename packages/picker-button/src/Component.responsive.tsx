import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';
import type {
    AdditionalMobileProps,
    BottomSheetSelectMobileProps,
} from '@alfalab/core-components-select/shared';

import { PickerButtonDesktop, PickerButtonDesktopProps } from './desktop';
import { PickerButtonMobile } from './mobile';

export type PickerButtonResponsiveProps = PickerButtonDesktopProps &
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
    };

export const PickerButtonResponsive = forwardRef<HTMLInputElement, PickerButtonResponsiveProps>(
    (
        {
            OptionsList,
            onScroll,
            footer,
            swipeable,
            bottomSheetProps,
            breakpoint,
            client,
            ...restProps
        },
        ref,
    ) => {
        const isDesktop = useIsDesktop(breakpoint, client === 'desktop');

        return isDesktop ? (
            <PickerButtonDesktop
                ref={ref}
                OptionsList={OptionsList}
                onScroll={onScroll}
                {...restProps}
            />
        ) : (
            <PickerButtonMobile
                ref={ref}
                footer={footer}
                swipeable={swipeable}
                bottomSheetProps={bottomSheetProps}
                breakpoint={breakpoint}
                {...restProps}
            />
        );
    },
);

PickerButtonResponsive.displayName = 'PickerButtonResponsive';
