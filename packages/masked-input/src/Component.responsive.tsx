import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { BaseMaskedInputProps } from './components/base-masked-input';
import { MaskedInputDesktop } from './Component.desktop';
import { MaskedInputMobile } from './Component.mobile';

export type MaskedInputProps = Omit<BaseMaskedInputProps, 'Input'> & {
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

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
    ({ breakpoint = 1024, defaultMatchMediaValue, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query);

        const Component = isDesktop ? MaskedInputDesktop : MaskedInputMobile;

        return <Component ref={ref} {...restProps} />;
    },
);
