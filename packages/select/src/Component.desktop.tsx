import React, { forwardRef } from 'react';

import { FormControlProps } from '@alfalab/core-components-form-control/src/Component';

import { Arrow as DefaultArrow } from './components/arrow';
import { BaseSelect } from './components/base-select';
import { Field as DefaultField } from './components/field';
import { Optgroup as DefaultOptgroup } from './components/optgroup';
import { Option as DefaultOption } from './components/option';
import { OptionsList as DefaultOptionsList } from './components/options-list';
import { BaseSelectProps } from './typings';

export type SelectFieldProps = Omit<FormControlProps, 'size'> & Record<string, unknown>;

export type SelectDesktopProps = Omit<BaseSelectProps, 'fieldProps'> & {
    /**
     * Пропсы, которые будут прокинуты в компонент поля
     */
    fieldProps?: SelectFieldProps;
};

export const SelectDesktop = forwardRef<HTMLDivElement, SelectDesktopProps>(
    (
        {
            Arrow = DefaultArrow,
            Field = DefaultField,
            OptionsList = DefaultOptionsList,
            Optgroup = DefaultOptgroup,
            Option = DefaultOption,
            ...restProps
        },
        ref,
    ) => (
        <BaseSelect
            ref={ref}
            Option={Option}
            Field={Field}
            Optgroup={Optgroup}
            OptionsList={OptionsList}
            Arrow={Arrow}
            {...restProps}
        />
    ),
);
