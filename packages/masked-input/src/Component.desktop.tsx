import React, { forwardRef } from 'react';

import { InputDesktop } from '@alfalab/core-components-input/desktop';

import { BaseMaskedInput, BaseMaskedInputProps } from './components/base-masked-input';

export type MaskedInputDesktopProps = Omit<BaseMaskedInputProps, 'Input'>;

export const MaskedInputDesktop = forwardRef<HTMLInputElement, MaskedInputDesktopProps>((restProps, ref) => (
    <BaseMaskedInput
        {...restProps}
        Input={InputDesktop}
        ref={ref}
    />
));
