import React from 'react';

import { BaseSelectMobile } from '../base-select-mobile';

import { Field as DefaultField } from '../field';
import { Arrow as DefaultArrow } from '../arrow';
import { Option as DefaultOption } from '../option';
import { Optgroup as DefaultOptgroup } from '../optgroup';

import { BaseSelectProps } from '../../typings';

export type SelectModalMobileProps = Omit<
    BaseSelectProps,
    'OptionsList' | 'Checkmark' | 'onScroll'
>;

export const SelectModalMobile = ({
    dataTestId,
    className,
    fieldClassName,
    optionsListClassName,
    optionClassName,
    optionGroupClassName,
    optionsListProps,
    options,
    autocomplete = false,
    multiple = false,
    allowUnselect = false,
    disabled = false,
    closeOnSelect = !multiple,
    circularNavigation = false,
    defaultOpen = false,
    open: openProp,
    name,
    id,
    selected,
    size = 'm',
    optionsSize = 'm',
    error,
    hint,
    block,
    label,
    placeholder,
    fieldProps = {},
    optionProps = {},
    valueRenderer,
    onChange,
    onOpen,
    onFocus,
    Arrow = DefaultArrow,
    Field = DefaultField,
    Optgroup = DefaultOptgroup,
    Option = DefaultOption,
}: SelectModalMobileProps) => {
    return (
        <BaseSelectMobile
            dataTestId={dataTestId}
            className={className}
            fieldClassName={fieldClassName}
            optionsListClassName={optionsListClassName}
            optionClassName={optionClassName}
            optionGroupClassName={optionGroupClassName}
            optionsListProps={optionsListProps}
            options={options}
            autocomplete={autocomplete}
            multiple={multiple}
            allowUnselect={allowUnselect}
            disabled={disabled}
            closeOnSelect={closeOnSelect}
            circularNavigation={circularNavigation}
            defaultOpen={defaultOpen}
            open={openProp}
            name={name}
            id={id}
            selected={selected}
            size={size}
            optionsSize={optionsSize}
            error={error}
            hint={hint}
            block={block}
            label={label}
            placeholder={placeholder}
            fieldProps={fieldProps}
            optionProps={optionProps}
            valueRenderer={valueRenderer}
            onChange={onChange}
            onOpen={onOpen}
            onFocus={onFocus}
            Arrow={Arrow}
            Field={Field}
            Optgroup={Optgroup}
            Option={Option}
            isBottomSheet={false}
        />
    );
};
