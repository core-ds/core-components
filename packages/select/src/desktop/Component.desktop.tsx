import React, { forwardRef } from 'react';

import {
    FormControlDesktop,
    FormControlDesktopProps,
} from '@alfalab/core-components-form-control/desktop';

import { Arrow as DefaultArrow } from '../components/arrow';
import { BaseSelect } from '../components/base-select';
import { Field as DefaultField } from '../components/field';
import { Optgroup as DefaultOptgroup } from '../components/optgroup';
import { Option as DefaultOption } from '../components/option';
import { OptionsList as DefaultOptionsList } from '../components/options-list';
import { Search as DefaultSearch } from '../components/search';
import { BaseSelectProps } from '../typings';

export type SelectFieldProps = Omit<FormControlDesktopProps, 'size'> & Record<string, unknown>;

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
            Search = DefaultSearch,
            fieldProps = {},
            ...restProps
        },
        ref,
    ) => (
        <BaseSelect
            ref={ref}
            Option={Option}
            Field={Field}
            fieldProps={{
                FormControlComponent: FormControlDesktop,
                ...(fieldProps as object),
            }}
            Search={Search}
            Optgroup={Optgroup}
            OptionsList={OptionsList}
            Arrow={Arrow}
            {...restProps}
        />
    ),
);
