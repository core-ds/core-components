import React, { forwardRef } from 'react';

import { BottomSheet } from '@alfalab/core-components-bottom-sheet';
import { FormControlDesktop } from '@alfalab/core-components-form-control/desktop';
import { FormControlMobile } from '@alfalab/core-components-form-control/mobile';
import { useMatchMedia } from '@alfalab/core-components-mq';
import { Popover } from '@alfalab/core-components-popover';
import { getComponentBreakpoint } from '@alfalab/core-components-shared';

import { BaseSelectWithTags } from './components/base-select-with-tags';
import { SelectWithTagsProps } from './types';

export const SelectWithTags = forwardRef<HTMLInputElement, SelectWithTagsProps>(
    ({ breakpoint = getComponentBreakpoint(), defaultMatchMediaValue, ...restProps }, ref) => {
        const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`, defaultMatchMediaValue);

        return (
            <BaseSelectWithTags
                {...restProps}
                ref={ref}
                view={isDesktop ? 'desktop' : 'mobile'}
                Popover={Popover}
                BottomSheet={BottomSheet}
                FormControlComponent={isDesktop ? FormControlDesktop : FormControlMobile}
            />
        );
    },
);
