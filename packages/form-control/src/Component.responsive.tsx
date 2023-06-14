import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { isClient } from '../../utils';

import { BaseFormControlProps } from './components/base-form-control';
import { FormControlDesktop } from './Component.desktop';
import { FormControlMobile } from './Component.mobile';

export type FormControlProps = Omit<BaseFormControlProps, 'styles'> & {
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

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
    ({ breakpoint = 1024, defaultMatchMediaValue, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;
        const getDefaultValue = () => (isClient() ? window.matchMedia(query).matches : false);

        const [isDesktop] = useMatchMedia(query, defaultMatchMediaValue ?? getDefaultValue);

        const Component = isDesktop ? FormControlDesktop : FormControlMobile;

        return <Component ref={ref} {...restProps} />;
    },
);
