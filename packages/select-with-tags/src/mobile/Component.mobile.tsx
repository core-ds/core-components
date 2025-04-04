import React from 'react';
import { BottomSheet } from '@balafla/core-components-bottom-sheet';
import { FormControlMobile } from '@balafla/core-components-form-control/mobile';

import { BaseSelectWithTags } from '../components/base-select-with-tags';
import { SelectWithTagsMobileProps } from '../types';

export const SelectWithTagsMobile = React.forwardRef<HTMLInputElement, SelectWithTagsMobileProps>(
    (props, ref) => (
        <BaseSelectWithTags
            {...props}
            ref={ref}
            FormControlComponent={FormControlMobile}
            view='mobile'
            BottomSheet={BottomSheet}
        />
    ),
);
