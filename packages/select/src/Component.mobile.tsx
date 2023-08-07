import React, { forwardRef, ReactNode } from 'react';

import { BottomSheetProps } from '@alfalab/core-components-bottom-sheet';
import { FormControlMobile } from '@alfalab/core-components-form-control/mobile';

import { Arrow as DefaultArrow } from './components/arrow';
import { BaseSelectMobile } from './components/base-select-mobile';
import { Footer } from './components/base-select-mobile/footer';
import { Field as DefaultField } from './components/field';
import { Optgroup as DefaultOptgroup } from './components/optgroup';
import { Option as DefaultOption } from './components/option';
import { OptionsList as DefaultOptionsList } from './components/options-list';
import { VirtualOptionsList as DefaultVirtualOptionsList } from './components/virtual-options-list';
import { useSelectWithApply, UseSelectWithApplyProps } from './presets/useSelectWithApply/hook';
import { Header } from './presets/useSelectWithApply/options-list-with-apply/header/Component';
import { AnyObject, BaseSelectProps } from './typings';

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
     * Показывать кнопку очистки
     */
    showClear?: UseSelectWithApplyProps['showClear'];

    /**
     * Показывать пункт "Выбрать все"
     */
    showSelectAll?: UseSelectWithApplyProps['showSelectAll'];

    /**
     * Показывать пункт "Выбрать все" в заголовке списка
     */
    showHeaderWithSelectAll?: UseSelectWithApplyProps['showHeaderWithSelectAll'];

    /**
     * Использовать ли хук useSelectWithApply
     */
    useWithApplyHook?: boolean;
};

export type SelectMobileProps = Omit<BaseSelectProps, 'Checkmark' | 'onScroll'> &
    AdditionalMobileProps;

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
            selected,
            options,
            OptionsList = options.length > VIRTUAL_OPTIONS_LIST_THRESHOLD
                ? DefaultVirtualOptionsList
                : DefaultOptionsList,
            onChange,
            bottomSheetProps,
            showClear = true,
            showSelectAll,
            showHeaderWithSelectAll,
            useWithApplyHook = multiple,
            ...restProps
        }: SelectMobileProps,
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
                fieldProps={{
                    FormControlComponent: FormControlMobile,
                    ...(fieldProps as object),
                }}
                optionProps={optionProps}
                Arrow={Arrow}
                Field={Field}
                Optgroup={Optgroup}
                Option={Option}
                isBottomSheet={true}
                options={options}
                selected={selected}
                onChange={onChange}
                OptionsList={OptionsList}
                bottomSheetProps={{
                    bottomAddons: useWithApplyHook && showHeaderWithSelectAll && (
                        <Header {...applyProps.optionsListProps.headerProps} mobile={true} />
                    ),
                    ...bottomSheetProps,
                }}
                optionsListProps={optionsListProps}
                {...restProps}
                {...(useWithApplyHook && applyProps)}
            />
        );
    },
);
