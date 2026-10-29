import React, { type ComponentRef, forwardRef } from 'react';

import {
    type InputComponentCustomProps,
    type InputComponentProps,
} from './base-input/types/base-input-props';

export const InputComponent = forwardRef<
    ComponentRef<'input'>,
    InputComponentProps<InputComponentCustomProps>
>(({ customProps, ...inputProps }, ref) => <input {...inputProps} ref={ref} />);
