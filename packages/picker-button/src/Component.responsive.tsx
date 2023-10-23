import React, { forwardRef } from 'react';

import type {
    AdditionalMobileProps,
    BottomSheetSelectMobileProps,
} from '@alfalab/core-components-select/shared';
import { useMedia } from '@alfalab/hooks';

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
    };

export const PickerButtonResponsive = forwardRef<HTMLInputElement, PickerButtonResponsiveProps>(
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
