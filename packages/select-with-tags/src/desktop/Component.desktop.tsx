import React from 'react';
import { FormControlDesktop } from '@balafla/core-components-form-control/desktop';
import { Popover } from '@balafla/core-components-popover';

import { BaseSelectWithTags } from '../components/base-select-with-tags';
import { SelectWithTagsDesktopProps } from '../types';

export const SelectWithTagsDesktop = React.forwardRef<HTMLInputElement, SelectWithTagsDesktopProps>(
    (props, ref) => (
        <BaseSelectWithTags
            {...props}
            FormControlComponent={FormControlDesktop}
            Popover={Popover}
            ref={ref}
            view='desktop'
        />
    ),
);
