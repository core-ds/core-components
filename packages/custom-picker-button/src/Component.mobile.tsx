import React, { forwardRef } from 'react';

import type { CustomButtonProps } from '@alfalab/core-components-custom-button';
import {
    PickerButtonMobile,
    PickerButtonMobileProps,
} from '@alfalab/core-components-picker-button/mobile';

import { Field as DefaultField } from './field';

const DEFAULT_BUTTON_COLOR = '#FF45C3';
const DEFAULT_CONTENT_COLOR = 'white';

export type CustomPickerButtonMobileProps = Omit<PickerButtonMobileProps, 'view' | 'colors'> &
    Pick<CustomButtonProps, 'backgroundColor' | 'contentColor' | 'stateType'>;

export const CustomPickerButtonMobile = forwardRef<HTMLInputElement, CustomPickerButtonMobileProps>(
    (
        {
            backgroundColor = DEFAULT_BUTTON_COLOR,
            contentColor = DEFAULT_CONTENT_COLOR,
            stateType = 'darkening',
            ...restProps
        },
        ref,
    ) => (
        <PickerButtonMobile
            {...restProps}
            fieldProps={{
                backgroundColor,
                contentColor,
                stateType,
            }}
            Field={DefaultField}
            ref={ref}
        />
    ),
);
