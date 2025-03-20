import React, { forwardRef } from 'react';

import { FormControlDesktop } from '@alfalab/core-components-form-control/desktop';
import { Popover } from '@alfalab/core-components-popover';

import { Arrow as DefaultArrow } from '../components/arrow';
import { BaseSelect } from '../components/base-select';
import { Field as DefaultField } from '../components/field';
import { NextOptionsList } from '../components/next-options-list';
import { Optgroup as DefaultOptgroup } from '../components/optgroup';
import { Option as DefaultOption } from '../components/option';
import { Search as DefaultSearch } from '../components/search';
import { SelectDesktopProps } from '../typings';

export const SelectDesktop = forwardRef<HTMLDivElement, SelectDesktopProps>(
    (
        {
            Arrow = DefaultArrow,
            Field = DefaultField,
            OptionsList = NextOptionsList,
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
            view='desktop'
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
            Popover={Popover}
            {...restProps}
        />
    ),
);
