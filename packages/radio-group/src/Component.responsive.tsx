import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { type BaseRadioGroupProps } from './components/base-radio-group';
import { RadioGroupDesktop } from './desktop';
import { RadioGroupMobile } from './mobile';

export type RadioGroupProps = Omit<BaseRadioGroupProps, 'styles'> & {
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

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
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

        const Component = isDesktop ? RadioGroupDesktop : RadioGroupMobile;

        return <Component ref={ref} {...restProps} />;
    },
);

RadioGroup.displayName = 'RadioGroup';
