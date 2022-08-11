import React, { forwardRef } from 'react';

import { AdditionalMobileProps } from '@alfalab/core-components-select';
import { useMedia } from '@alfalab/hooks';

import { PickerButton, PickerButtonProps } from './Component';
import { PickerButtonMobile } from './Component.mobile';

export type PickerButtonMatchMedia = 'desktop' | 'mobile';

export const PickerButtonResponsive = forwardRef<
    HTMLDivElement,
    PickerButtonProps & AdditionalMobileProps
>(({ OptionsList, onScroll, footer, swipeable, bottomSheetProps, ...restProps }) => {
    const [view] = useMedia(
        [
            ['mobile', '(max-width: 767px)'],
            ['desktop', '(min-width: 768px)'],
        ],
        'desktop',
    );

    return view === 'desktop' ? (
        <PickerButton OptionsList={OptionsList} onScroll={onScroll} {...restProps} />
    ) : (
        <PickerButtonMobile
            footer={footer}
            swipeable={swipeable}
            bottomSheetProps={bottomSheetProps}
            {...restProps}
        />
    );
});
