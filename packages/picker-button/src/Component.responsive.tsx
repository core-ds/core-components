import React, { forwardRef } from 'react';

import { AdditionalMobileProps } from '@alfalab/core-components-select';
import { useMedia } from '@alfalab/hooks';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ButtonProps } from '@alfalab/core-components-button';

import { PickerButtonDesktop, PickerButtonProps as PickerButtonDesktopProps } from './Component';
import { PickerButtonMobile } from './Component.mobile';

export type PickerButtonMatchMedia = 'desktop' | 'mobile';

export type PickerButtonProps = PickerButtonDesktopProps &
    AdditionalMobileProps & {
        /**
         * Контрольная точка, с нее начинается desktop версия
         * @default 1024
         */
        breakpoint?: number;
    };

export const PickerButton = forwardRef<HTMLInputElement, PickerButtonProps>(
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
                {...restProps}
            />
        );
    },
);
