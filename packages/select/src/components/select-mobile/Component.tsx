import React, { forwardRef, ReactNode } from 'react';

import { BottomSheetProps } from '@alfalab/core-components-bottom-sheet';

import { BaseSelectProps } from '../../typings';
import { Arrow as DefaultArrow } from '../arrow';
import { BaseSelectMobile } from '../base-select-mobile';
import { Field as DefaultField } from '../field';
import { Optgroup as DefaultOptgroup } from '../optgroup';
import { Option as DefaultOption } from '../option';

export type AdditionalMobileProps = {
    /**
     * Футер
     * @deprecated Используйте bottomSheetProps.actionButton
     */
    footer?: ReactNode;

    /**
     * Будет ли свайпаться шторка
     * @deprecated Используйте bottomSheetProps.swipeable
     */
    swipeable?: boolean;

    /**
     * Дополнительные пропсы шторки
     */
    bottomSheetProps?: Partial<BottomSheetProps>;

    /**
     * Отображать footer в OptionsList
     */
    showFooter?: boolean | null;
};

export type SelectMobileProps = Omit<BaseSelectProps, 'OptionsList' | 'Checkmark' | 'onScroll'> &
    AdditionalMobileProps;

export const SelectMobile = forwardRef(
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
            showFooter,
            ...restProps
        }: SelectMobileProps,
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
            isBottomSheet={true}
            showFooter={showFooter}
            {...restProps}
        />
    ),
);
