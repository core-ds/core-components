import React, { forwardRef } from 'react';

import { InputDesktop } from '@alfalab/core-components-input/desktop';

import { NumberInput, NumberInputProps } from '../components/number-input';

export type NumberInputDesktopProps = Omit<NumberInputProps, 'Input' | 'breakpoint' | 'view'>;

export const NumberInputDesktop = forwardRef<
    HTMLInputElement,
    Omit<NumberInputDesktopProps, 'size'> & { size: Exclude<NumberInputDesktopProps['size'], 40> }
>((props, ref) => <NumberInput {...props} Input={InputDesktop} ref={ref} view='desktop' />);
