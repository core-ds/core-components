import React, { forwardRef } from 'react';

import { BaseSelectProps } from '../../typings';
import { Arrow as DefaultArrow } from '../arrow';
import { BaseSelectMobile } from '../base-select-mobile';
import { Field as DefaultField } from '../field';
import { Optgroup as DefaultOptgroup } from '../optgroup';
import { Option as DefaultOption } from '../option';

export type SelectModalMobileProps = Omit<
    BaseSelectProps,
    'OptionsList' | 'Checkmark' | 'onScroll'
>;

export const SelectModalMobile = forwardRef(
    (
        {
            autocomplete = false,
            multiple = false,
            allowUnselect = false,
            disabled = false,
            closeOnSelect = !multiple,
            circularNavigation = false,
            defaultOpen = false,
            open: openProp,
            size = 'm',
            optionsSize = 'm',
            fieldProps = {},
            optionProps = {},
            Arrow = DefaultArrow,
            Field = DefaultField,
            Optgroup = DefaultOptgroup,
            Option = DefaultOption,
            ...restProps
        }: SelectModalMobileProps,
        ref,
    ) => (
        <BaseSelectMobile
            ref={ref}
            autocomplete={autocomplete}
            multiple={multiple}
            allowUnselect={allowUnselect}
            disabled={disabled}
            closeOnSelect={closeOnSelect}
            circularNavigation={circularNavigation}
            defaultOpen={defaultOpen}
            open={openProp}
            size={size}
            optionsSize={optionsSize}
            fieldProps={fieldProps}
            optionProps={optionProps}
            Arrow={Arrow}
            Field={Field}
            Optgroup={Optgroup}
            Option={Option}
            isBottomSheet={false}
            {...restProps}
        />
    ),
);
