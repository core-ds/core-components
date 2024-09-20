import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { getComponentBreakpoint } from '@alfalab/core-components-shared';

import { BaseFormControlProps } from './components/base-form-control';
import { FormControlDesktop } from './desktop';
import { FormControlMobile } from './mobile';

export type FormControlProps = Omit<BaseFormControlProps, 'styles' | 'colorStyles'> & {
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
    ({ breakpoint = getComponentBreakpoint(), defaultMatchMediaValue, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query, defaultMatchMediaValue);

        const Component = isDesktop ? FormControlDesktop : FormControlMobile;

        return <Component ref={ref} {...restProps} />;
    },
);

FormControl.displayName = 'FormControl';
