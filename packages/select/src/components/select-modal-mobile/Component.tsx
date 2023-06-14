import React, { forwardRef } from 'react';

import { FormControlMobile } from '@alfalab/core-components-form-control/mobile';
import { ModalMobile } from '@alfalab/core-components-modal/Component.mobile';

import { useSelectWithApply, UseSelectWithApplyProps } from '../../presets/useSelectWithApply/hook';
import { Header } from '../../presets/useSelectWithApply/options-list-with-apply/header/Component';
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

    /**
     *  Дополнительные пропсы шапки модалки
     */
    modalHeaderProps?: Partial<React.ComponentProps<typeof ModalMobile.Header>>;

    /**
     *  Дополнительные пропсы модалки
     */
    modalProps?: Partial<React.ComponentProps<typeof ModalMobile>>;

    /**
     *  Дополнительные пропсы футера модалки
     */
    modalFooterProps?: Partial<React.ComponentProps<typeof ModalMobile.Footer>>;

    /*
     * Показывать пункт "Выбрать все" в заголовке списка
     */
    showHeaderWithSelectAll?: UseSelectWithApplyProps['showHeaderWithSelectAll'];

    /**
     * Использовать ли хук useSelectWithApply
     */
    useWithApplyHook?: boolean;
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
            useWithApplyHook = multiple,
            modalHeaderProps,
            showHeaderWithSelectAll,
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
                fieldProps={{
                    FormControlComponent: FormControlMobile,
                    ...(fieldProps as object),
                }}
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
                modalHeaderProps={{
                    bottomAddons: useWithApplyHook && showHeaderWithSelectAll && (
                        <Header {...applyProps.optionsListProps.headerProps} mobile={true} />
                    ),
                    ...modalHeaderProps,
                }}
                {...restProps}
                {...(useWithApplyHook && applyProps)}
            />
        );
    },
);
