import React, { forwardRef } from 'react';

import { SelectMobile } from '@alfalab/core-components-select/mobile';
import {
    AdditionalMobileProps,
    BottomSheetSelectMobileProps,
    Optgroup as DefaultOptgroup,
} from '@alfalab/core-components-select/shared';

import type { PickerButtonDesktopProps } from '../desktop';
import { Field as DefaultField } from '../field';
import { Option as DefaultOption } from '../option';

export type PickerButtonMobileProps = Omit<
    PickerButtonDesktopProps,
    'OptionsList' | 'Checkmark' | 'onScroll'
> &
    AdditionalMobileProps &
    BottomSheetSelectMobileProps & {
        /**
         * Контрольная точка для кнопки, с нее начинается desktop версия
         * @default 1024
         */
        breakpoint?: number;
    };

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
            showArrow,
            Field = DefaultField,
            fieldProps = {},
            breakpoint = 1024,
            ...restProps
        },
        ref,
    ) => {
        const fieldDefaultProps = {
            view,
            loading,
            /** size у select, button несовместимы */
            buttonSize: size,
            buttonVariant: variant,
            leftAddons,
            rightAddons,
            showArrow,
            breakpoint,
        };

        return (
            <SelectMobile
                {...restProps}
                label={label}
                Option={Option}
                bottomSheetProps={{
                    title: label,
                    stickyHeader: true,
                    ...bottomSheetProps,
                }}
                Field={Field}
                Optgroup={Optgroup}
                size={size === 'm' ? 'm' : 's'}
                closeOnSelect={true}
                fieldProps={{
                    ...fieldDefaultProps,
                    ...(fieldProps as object),
                }}
                ref={ref}
                options={options}
                selected={[]}
            />
        );
    },
);
