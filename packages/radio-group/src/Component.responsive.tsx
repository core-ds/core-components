import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { BaseRadioGroupProps } from './components/base-radio-group';
import { RadioGroupDesktop } from './Component.desktop';
import { RadioGroupMobile } from './Component.mobile';

export type RadioGroupProps = Omit<BaseRadioGroupProps, 'styles'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
    ({ breakpoint = 1024, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query);

        const Component = isDesktop ? RadioGroupDesktop : RadioGroupMobile;

        return <Component ref={ref} {...restProps} />;
    },
);
