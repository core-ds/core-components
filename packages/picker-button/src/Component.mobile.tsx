import React, { forwardRef } from 'react';

import {
    AdditionalMobileProps,
    SelectMobile,
    Optgroup as DefaultOptgroup,
} from '@alfalab/core-components-select';

import { Field as DefaultField } from './field';
import { PickerButtonProps } from './Component';
import { Option as DefaultOption } from './option';

export type PickerButtonMobileProps = Omit<
    PickerButtonProps,
    'OptionsList' | 'Checkmark' | 'onScroll'
> &
    AdditionalMobileProps;

export const PickerButtonMobile = forwardRef<HTMLDivElement, PickerButtonMobileProps>(
    (
        {
            options,
            Option = DefaultOption,
            Optgroup = DefaultOptgroup,
            view,
            loading,
            variant = 'default',
            leftAddons,
            rightAddons,
            size,
            ...restProps
        },
        ref,
    ) => {
        return (
            <SelectMobile
                {...restProps}
                Option={Option}
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
        );
    },
);
