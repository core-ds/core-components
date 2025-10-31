import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { type BaseFormControlProps } from './components/base-form-control';
import { FormControlDesktop } from './desktop';
import { FormControlMobile } from './mobile';

export type FormControlProps = Omit<BaseFormControlProps, 'styles' | 'colorStyles'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Версия, которая будет использоваться при серверном рендеринге
     */
    client?: 'desktop' | 'mobile';

    /**
     * Значение по-умолчанию для хука useMatchMedia
     * @deprecated Используйте client
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
};

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
    (
        {
            breakpoint,
            client,
            defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
            ...restProps
        },
        ref,
    ) => {
        const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

        const Component = isDesktop ? FormControlDesktop : FormControlMobile;

        return <Component ref={ref} {...restProps} />;
    },
);

FormControl.displayName = 'FormControl';
