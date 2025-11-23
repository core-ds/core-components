import React, { forwardRef } from 'react';

import { type CustomButtonProps } from '@alfalab/core-components-custom-button';
import {
    PickerButtonMobile,
    type PickerButtonMobileProps,
} from '@alfalab/core-components-picker-button/mobile';

import { Field as DefaultField } from '../field';
import { disableCheckmarks } from '../utils/disableCheckMarks';

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
            options = [],
            ...restProps
        },
        ref,
    ) => (
        <PickerButtonMobile
            {...restProps}
            options={disableCheckmarks(options)}
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
