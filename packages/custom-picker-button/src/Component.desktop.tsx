import React, { forwardRef } from 'react';

import { CustomButtonProps } from '@alfalab/core-components-custom-button';
import {
    PickerButtonDesktop,
    PickerButtonDesktopProps,
} from '@alfalab/core-components-picker-button/desktop';

import { Field as DefaultField } from './field';

const DEFAULT_BUTTON_COLOR = '#FF45C3';
const DEFAULT_CONTENT_COLOR = 'white';

export type CustomPickerButtonDesktopProps = Omit<PickerButtonDesktopProps, 'view' | 'colors'> &
    Pick<CustomButtonProps, 'backgroundColor' | 'contentColor' | 'stateType'>;

export const CustomPickerButtonDesktop = forwardRef<
    HTMLInputElement,
    CustomPickerButtonDesktopProps
>(
    (
        {
            backgroundColor = DEFAULT_BUTTON_COLOR,
            contentColor = DEFAULT_CONTENT_COLOR,
            stateType = 'darkening',
            ...restProps
        },
        ref,
    ) => (
        <PickerButtonDesktop
            {...restProps}
            fieldProps={{
                backgroundColor,
                contentColor,
                stateType,
                breakpoint: 1,
            }}
            Field={DefaultField}
            ref={ref}
        />
    ),
);
