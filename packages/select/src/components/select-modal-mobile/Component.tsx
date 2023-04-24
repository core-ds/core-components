import React, { forwardRef } from 'react';

import { useSelectWithApply, UseSelectWithApplyProps } from '../../presets/useSelectWithApply/hook';
import { AnyObject, BaseSelectProps } from '../../typings';
import { Arrow as DefaultArrow } from '../arrow';
import { BaseSelectMobile } from '../base-select-mobile';
import { Footer } from '../base-select-mobile/footer';
import { Field as DefaultField } from '../field';
import { Optgroup as DefaultOptgroup } from '../optgroup';
import { Option as DefaultOption } from '../option';
import { OptionsList as DefaultOptionsList } from '../options-list';
import { VirtualOptionsList as DefaultVirtualOptionsList } from '../virtual-options-list';

export type SelectModalMobileProps = Omit<BaseSelectProps, 'Checkmark' | 'onScroll'> & {
    /**
     * Показывать кнопку очистки
     */
    showClear?: UseSelectWithApplyProps['showClear'];

    /**
     * Показывать пункт "Выбрать все"
     */
    showSelectAll?: UseSelectWithApplyProps['showSelectAll'];
};

const VIRTUAL_OPTIONS_LIST_THRESHOLD = 30;

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
            selected,
            options,
            OptionsList = options.length > VIRTUAL_OPTIONS_LIST_THRESHOLD
                ? DefaultVirtualOptionsList
                : DefaultOptionsList,
            onChange,
            showClear = true,
            showSelectAll,
            ...restProps
        }: SelectModalMobileProps,
        ref,
    ) => {
        const applyProps = useSelectWithApply({
            optionsListProps: {
                ...(optionsListProps as AnyObject),
                Footer,
            },
            OptionsList,
            selected,
            options,
            onChange,
            showClear,
            showSelectAll,
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
                OptionsList={OptionsList}
                optionsListProps={optionsListProps}
                {...restProps}
                {...(multiple && applyProps)}
            />
        );
    },
);
