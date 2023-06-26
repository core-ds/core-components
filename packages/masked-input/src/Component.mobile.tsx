import React, { forwardRef } from 'react';

import { InputMobile } from '@alfalab/core-components-input/mobile';

import { BaseMaskedInput, BaseMaskedInputProps } from './components/base-masked-input';

export type MaskedInputMobileProps = Omit<BaseMaskedInputProps, 'Input'>;

export const MaskedInputMobile = forwardRef<HTMLInputElement, MaskedInputMobileProps>((restProps, ref) => (
    <BaseMaskedInput
        {...restProps}
        Input={InputMobile}
        ref={ref}
    />
));
