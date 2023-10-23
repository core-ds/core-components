import React, { forwardRef } from 'react';

import { BottomSheet } from '@alfalab/core-components-bottom-sheet';
import { FormControlMobile } from '@alfalab/core-components-form-control/mobile';
import { ModalMobile } from '@alfalab/core-components-modal/Component.mobile';

import { Arrow as DefaultArrow } from './components/arrow';
import { BaseSelect } from './components/base-select';
import { Field as DefaultField } from './components/field';
import { Footer } from './components/footer';
import { Optgroup as DefaultOptgroup } from './components/optgroup';
import { Option as DefaultOption } from './components/option';
import { OptionsList as DefaultOptionsList } from './components/options-list';
import { Search as DefaultSearch } from './components/search';
import { VirtualOptionsList as DefaultVirtualOptionsList } from './components/virtual-options-list';
import { useSelectWithApply } from './presets/useSelectWithApply/hook';
import { Header } from './presets/useSelectWithApply/options-list-with-apply/header/Component';
import {
    AnyObject,
    BottomSheetSelectMobileProps,
    ModalSelectMobileProps,
    SelectMobileProps,
} from './typings';

const VIRTUAL_OPTIONS_LIST_THRESHOLD = 30;

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
            optionsListProps = {},
            Arrow = DefaultArrow,
            Field = DefaultField,
            Optgroup = DefaultOptgroup,
            Option = DefaultOption,
            Search = DefaultSearch,
            selected,
            isBottomSheet = true,
            options,
            OptionsList = options.length > VIRTUAL_OPTIONS_LIST_THRESHOLD
                ? DefaultVirtualOptionsList
                : DefaultOptionsList,
            onChange,
            showClear = true,
            showSelectAll,
            showHeaderWithSelectAll,
            useWithApplyHook = multiple,
            showSearch,
            searchProps,
            ...restProps
        }: SelectMobileProps,
        ref,
    ) => {
        const typedRestBottomSheetProps = restProps as BottomSheetSelectMobileProps;
        const typedRestModalProps = restProps as ModalSelectMobileProps;

        const applyProps = useSelectWithApply({
            optionsListProps: {
                ...(optionsListProps as AnyObject),
                Footer,
            },
            OptionsList,
            showSearch,
            searchProps,
            selected,
            options,
            onChange,
            showClear,
            showSelectAll,
        });

        const bottomAddons = useWithApplyHook && showHeaderWithSelectAll && (
            <Header {...applyProps.optionsListProps.headerProps} mobile={true} />
        );

        return (
            <BaseSelect
                ref={ref}
                view='mobile'
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
                fieldProps={{
                    FormControlComponent: FormControlMobile,
                    ...(fieldProps as object),
                }}
                optionProps={optionProps}
                Arrow={Arrow}
                Field={Field}
                Optgroup={Optgroup}
                Option={Option}
                Search={Search}
                isBottomSheet={isBottomSheet}
                options={options}
                selected={selected}
                onChange={onChange}
                OptionsList={OptionsList}
                showSearch={showSearch}
                searchProps={searchProps}
                BottomSheet={BottomSheet}
                ModalMobile={ModalMobile}
                {...(isBottomSheet
                    ? {
                          bottomSheetProps: {
                              bottomAddons,
                              ...typedRestBottomSheetProps.bottomSheetProps,
                          },
                      }
                    : {
                          modalHeaderProps: {
                              bottomAddons,
                              ...typedRestModalProps.modalHeaderProps,
                          },
                      })}
                optionsListProps={optionsListProps}
                {...restProps}
                {...(useWithApplyHook && applyProps)}
            />
        );
    },
);
