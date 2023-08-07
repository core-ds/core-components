import React, { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ButtonProps } from '@alfalab/core-components-button';
import type { AdditionalMobileProps } from '@alfalab/core-components-select/shared';
import { useMedia } from '@alfalab/hooks';

import { PickerButtonDesktop, PickerButtonDesktopProps } from './desktop';
import { PickerButtonMobile } from './mobile';

export type PickerButtonMatchMedia = 'desktop' | 'mobile';

export type PickerButtonResponsiveProps = PickerButtonDesktopProps &
    AdditionalMobileProps & {
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
