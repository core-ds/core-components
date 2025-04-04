import React, { forwardRef } from 'react';
import { BottomSheet } from '@balafla/core-components-bottom-sheet';
import { FormControlDesktop } from '@balafla/core-components-form-control/desktop';
import { FormControlMobile } from '@balafla/core-components-form-control/mobile';
import { useIsDesktop } from '@balafla/core-components-mq';
import { Popover } from '@balafla/core-components-popover';

import { BaseSelectWithTags } from './components/base-select-with-tags';
import { SelectWithTagsProps } from './types';

export const SelectWithTags = forwardRef<HTMLInputElement, SelectWithTagsProps>(
    (
        {
            breakpoint,
            client,
            defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
            ...restProps
        },
        ref,
    ) => {
        const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

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

SelectWithTags.displayName = 'SelectWithTags';
