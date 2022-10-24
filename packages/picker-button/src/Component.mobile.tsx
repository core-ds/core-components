import React, { forwardRef } from 'react';

import {
    AdditionalMobileProps,
    Optgroup as DefaultOptgroup,
    SelectMobile,
} from '@alfalab/core-components-select';

import { PickerButtonDesktopProps } from './Component';
import { Field as DefaultField } from './field';
import { Option as DefaultOption } from './option';

export type PickerButtonMobileProps = Omit<
    PickerButtonDesktopProps,
    'OptionsList' | 'Checkmark' | 'onScroll'
> &
    AdditionalMobileProps;

export const PickerButtonMobile = forwardRef<HTMLInputElement, PickerButtonMobileProps>(
    (
        {
            options,
            label,
            Option = DefaultOption,
            Optgroup = DefaultOptgroup,
            view,
            loading,
            variant = 'default',
            leftAddons,
            rightAddons,
            size,
            bottomSheetProps,
            ...restProps
        },
        ref,
    ) => (
        <SelectMobile
            {...restProps}
            label={label}
            Option={Option}
            bottomSheetProps={{
                title: label,
                stickyHeader: true,
                ...bottomSheetProps,
            }}
            Field={DefaultField}
            Optgroup={Optgroup}
            size={size === 'm' ? 'm' : 's'}
            closeOnSelect={true}
            fieldProps={{
                view,
                loading,
                /** size у select, button несовместимы */
                buttonSize: size,
                buttonVariant: variant,
                leftAddons,
                rightAddons,
            }}
            ref={ref}
            options={options}
            selected={[]}
        />
    ),
);
