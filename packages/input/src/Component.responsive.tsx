import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { BaseInputProps } from './components/base-input';
import { InputDesktop } from './Component.desktop';
import { InputMobile } from './Component.mobile';

export type InputProps = Omit<BaseInputProps, 'FormControlComponent'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Значение по-умолчанию для хука useMatchMedia
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ breakpoint = 1024, defaultMatchMediaValue, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query, defaultMatchMediaValue);

        const Component = isDesktop ? InputDesktop : InputMobile;

        return <Component ref={ref} {...restProps} />;
    },
);
