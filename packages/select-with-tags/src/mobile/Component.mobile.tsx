import React from 'react';

import { BottomSheet } from '@alfalab/core-components-bottom-sheet';
import { FormControlMobile } from '@alfalab/core-components-form-control/mobile';

import { BaseSelectWithTags } from '../components/base-select-with-tags';
import { type SelectWithTagsMobileProps } from '../types';

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
