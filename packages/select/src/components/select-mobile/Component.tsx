import React, { forwardRef, ReactNode } from 'react';

import { BottomSheetProps } from '@alfalab/core-components-bottom-sheet';

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
                OptionsList={OptionsList}
                bottomSheetProps={bottomSheetProps}
                optionsListProps={optionsListProps}
                {...restProps}
                {...(multiple && !bottomSheetProps?.actionButton && applyProps)}
            />
        );
    },
);
