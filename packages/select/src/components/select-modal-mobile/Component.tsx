import React, { forwardRef } from 'react';

import { useSelectWithApply, useSelectWithApplyProps } from '../../presets/useSelectWithApply/hook';
import { AnyObject, BaseSelectProps } from '../../typings';
import { Arrow as DefaultArrow } from '../arrow';
import { BaseSelectMobile } from '../base-select-mobile';
import { Field as DefaultField } from '../field';
import { Optgroup as DefaultOptgroup } from '../optgroup';
import { Option as DefaultOption } from '../option';

export type SelectModalMobileProps = Omit<BaseSelectProps, 'Checkmark' | 'onScroll'> & {
    /**
     * Дополнительные пропсы для хука useSelectWithApply
     */
    propsForApplyHook?: useSelectWithApplyProps;
};

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
            optionsListProps = {},
            Arrow = DefaultArrow,
            Field = DefaultField,
            Optgroup = DefaultOptgroup,
            Option = DefaultOption,
            OptionsList,
            selected,
            options,
            onChange,
            propsForApplyHook,
            ...restProps
        }: SelectModalMobileProps,
        ref,
    ) => {
        const applyProps = useSelectWithApply({
            OptionsList,
            selected,
            options,
            onChange,
            showClear: true,
            ...propsForApplyHook,
        });

        return (
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
                options={options}
                selected={selected}
                onChange={onChange}
                {...restProps}
                {...(multiple && applyProps)}
                OptionsList={OptionsList}
                optionsListProps={{
                    ...(optionsListProps as AnyObject),
                    ...(multiple && applyProps.optionsListProps),
                    showFooter: multiple,
                }}
            />
        );
    },
);
