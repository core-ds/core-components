import React, { forwardRef, ReactNode } from 'react';

import { BottomSheetProps } from '@alfalab/core-components-bottom-sheet';

import { useSelectWithApply, useSelectWithApplyProps } from '../../presets/useSelectWithApply/hook';
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
     * Дополнительные пропсы для хука useSelectWithApply
     */
    hookProps?: useSelectWithApplyProps;
};

export type SelectMobileProps = Omit<BaseSelectProps, 'Checkmark' | 'onScroll'> &
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
            selected,
            options,
            onChange,
            hookProps = {
                selected,
                options,
                onChange,
                showClear: true,
            },
            bottomSheetProps,
            ...restProps
        }: SelectMobileProps,
        ref,
    ) => {
        const applyProps = useSelectWithApply(hookProps);

        return (
            <BaseSelectMobile
                ref={ref}
                allowUnselect={allowUnselect}
                disabled={disabled}
                closeOnSelect={closeOnSelect}
                autocomplete={autocomplete}
                multiple={multiple}
                circularNavigation={circularNavigation}
                defaultOpen={defaultOpen}
                optionsListProps={{ showFooter: multiple }}
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
                options={options}
                selected={selected}
                onChange={onChange}
                {...restProps}
                {...(multiple && !bottomSheetProps?.actionButton && applyProps)}
                bottomSheetProps={bottomSheetProps}
            />
        );
    },
);
